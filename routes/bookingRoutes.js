const express = require('express');
const bookingControllers = require('../controllers/bookingControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router.use(authControllers.protect);
router.get(
  '/checkout-session/:tourID',

  bookingControllers.getCheckoutSession,
);

router.use(authControllers.restrictTo('admin', 'lead=guide'));
router
  .route('/')
  .get(bookingControllers.getAllBookings)
  .post(bookingControllers.createBooking);

router
  .route('/:id')
  .get(bookingControllers.getOneBooking)
  .patch(bookingControllers.updateBooking)
  .delete(bookingControllers.deleteBooking);
module.exports = router;
