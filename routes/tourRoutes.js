const express = require('express');
const tourControllers = require('../controllers/tourControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

// router.param('id', tourControllers.checkID);

router.route('/tour-stats').get(tourControllers.getTourStats);
router.route('/monthly-plan/:year').get(tourControllers.getMonthlyPlan);
router
  .route('/top-5-cheap')
  .get(tourControllers.aliasTopTours, tourControllers.getAllTours);
router
  .route('/')
  .post(tourControllers.createTour)
  .get(authControllers.protect, tourControllers.getAllTours);
router
  .route('/:id')
  .delete(
    authControllers.protect,
    authControllers.restrictTo('admin', 'lead-guide'),
    tourControllers.deleteTour,
  )
  .patch(tourControllers.updateTour)
  .get(tourControllers.getTour);

module.exports = router;
