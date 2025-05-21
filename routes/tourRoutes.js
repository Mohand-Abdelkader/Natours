const express = require('express');
const tourControllers = require('./../controllers/tourControllers');
const router = express.Router();
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
