const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { protect, authorize } = require('../middleware/auth');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  logout
} = require('../controllers/auth');

// Public routes
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);

router.post(
  '/forgotpassword',
  [
    check('email', 'Please include a valid email').isEmail()
  ],
  forgotPassword
);

router.put(
  '/resetpassword/:resettoken',
  [
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  resetPassword
);

// Protected routes (require authentication)
router.use(protect);

router.get('/me', getMe);
router.put('/updatedetails', updateDetails);
router.put('/updatepassword', updatePassword);
router.get('/logout', logout);

module.exports = router;
