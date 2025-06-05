const express = require('express');
const reviewControllers = require('../controllers/reviewControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.get('/', reviewControllers.getAllReviews);
router.post('/');

router
  .route('/')
  .get(reviewControllers.getAllReviews)
  .post(
    authControllers.protect,
    authControllers.restrictTo('user'),
    reviewControllers.setTourUserIds,
    reviewControllers.createReview,
  );
router
  .route('/:id')
  .delete(reviewControllers.deleteReview)
  .patch(reviewControllers.updateReview);
module.exports = router;
