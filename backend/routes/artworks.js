const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { protect, authorize } = require('../middleware/auth');
const {
  getArtworks,
  getArtwork,
  createArtwork,
  updateArtwork,
  deleteArtwork,
  likeArtwork,
  unlikeArtwork,
  saveArtwork,
  unsaveArtwork,
  getArtworkLikes,
  getArtworkSaves,
  getArtworkComments,
  uploadArtworkImage,
  searchArtworks
} = require('../controllers/artworks');

const { upload } = require('../middleware/upload');

// Public routes
router.get('/', getArtworks);
router.get('/search', searchArtworks);
router.get('/:id', getArtwork);
router.get('/:id/likes', getArtworkLikes);
router.get('/:id/saves', getArtworkSaves);
router.get('/:id/comments', getArtworkComments);

// Protected routes (require authentication)
router.use(protect);

// Image upload route (must come before other routes that might conflict)
router.post(
  '/:id/image',
  authorize('artist', 'admin'),
  upload.single('image'),
  uploadArtworkImage
);

// Artwork CRUD routes
router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('medium', 'At least one medium is required').isArray({ min: 1 }),
    check('description', 'Description is required').not().isEmpty()
  ],
  authorize('artist', 'admin'),
  createArtwork
);

router.put(
  '/:id',
  authorize('artist', 'admin'),
  updateArtwork
);

router.delete(
  '/:id',
  authorize('artist', 'admin'),
  deleteArtwork
);

// Like/Unlike routes
router.post('/:id/like', likeArtwork);
router.delete('/:id/like', unlikeArtwork);

// Save/Unsave routes
router.post('/:id/save', saveArtwork);
router.delete('/:id/save', unsaveArtwork);

module.exports = router;
