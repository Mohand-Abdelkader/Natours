const express = require('express');
const tourControllers = require('../controllers/tourControllers');

const router = express.Router();

// router.param('id', tourControllers.checkID);

router
  .route('/top-5-cheap')
  .get(tourControllers.aliasTopTours, tourControllers.getAllTours);
router
  .route('/')
  .post(tourControllers.createTour)
  .get(tourControllers.getAllTours);
router
  .route('/:id')
  .delete(tourControllers.deleteTour)
  .patch(tourControllers.updateTour)
  .get(tourControllers.getTour);

module.exports = router;
