const express = require('express');
const reviewControllers = require('../controllers/reviewControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.use(authControllers.protect);
router.get('/', reviewControllers.getAllReviews);
router.post('/');

router
  .route('/')
  .get(reviewControllers.getAllReviews)
  .post(
    authControllers.restrictTo('user'),
    reviewControllers.setTourUserIds,
    reviewControllers.createReview,
  );
router
  .route('/:id')
  .get(reviewControllers.getAllReview)
  .delete(
    authControllers.restrictTo('admin', 'user'),
    reviewControllers.deleteReview,
  )
  .patch(
    authControllers.restrictTo('admin', 'user'),
    reviewControllers.updateReview,
  );
module.exports = router;
