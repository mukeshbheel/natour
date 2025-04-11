const Tour = require('../models/tourModel');

exports.checkPostbody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTour = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
  });
};

exports.createNewTour = (req, res) => {
  console.log(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      // tour: newTour,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'updated tour here',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
