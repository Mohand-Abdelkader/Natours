const express = require('express');
const reviewControllers = require('../controllers/reviewControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router.get('/', reviewControllers.getAllReviews);
router.post('/');

router
  .route('/')
  .get(reviewControllers.getAllReviews)
  .post(
    authControllers.protect,
    authControllers.restrictTo('user'),
    reviewControllers.createReview,
  );

module.exports = router;
