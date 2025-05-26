const express = require('express');
const tourControllers = require('./../controllers/tourControllers');
const router = express.Router();

router.param('id', tourControllers.checkID);
router
  .route('/')
  .post(tourControllers.checkBody, tourControllers.createTour)
  .get(tourControllers.getAllTours);
router
  .route('/:id')
  .delete(tourControllers.deleteTour)
  .patch(tourControllers.updateTour)
  .get(tourControllers.getTour);

module.exports = router;
