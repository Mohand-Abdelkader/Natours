const express = require('express');
const viewControllers = require('../controllers/viewControllers');
const authControllers = require('../controllers/authControllers');
const bookingControllers = require('../controllers/bookingControllers');

const router = express.Router();

router.get('/me', authControllers.protect, viewControllers.getAccount);
router.use(authControllers.isLoggedIn);

router.get(
  '/',
  bookingControllers.createBookingCheckout,
  authControllers.isLoggedIn,
  viewControllers.getOverView,
);
router.get('/tour/:slug', viewControllers.getTour);
router.get('/login', viewControllers.getLoginForm);
router.post(
  '/submit-user-data',
  authControllers.protect,
  viewControllers.updateUserData,
);
module.exports = router;
