const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// PARAM MIDDLEWARE
// router.param('id', tourController.checkID);

router.route('/top-5-cheap').get(tourController.aliasTopTour, tourController.getAllTour)
router.route('/tour-stats').get(tourController.getTourStats)
router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.createNewTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
