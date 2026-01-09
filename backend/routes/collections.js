const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  getCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
  addArtworkToCollection,
  removeArtworkFromCollection,
  getCollectionArtworks
} = require('../controllers/collections');

// Public routes
router.get('/', getCollections);
router.get('/:id', getCollection);
router.get('/:id/artworks', getCollectionArtworks);

// Protected routes (require authentication)
router.use(protect);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
  ],
  createCollection
);

router.put(
  '/:id',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
  ],
  updateCollection
);

router.delete('/:id', deleteCollection);
router.post('/:collectionId/artworks/:artworkId', addArtworkToCollection);
delete('/:collectionId/artworks/:artworkId', removeArtworkFromCollection);

module.exports = router;
