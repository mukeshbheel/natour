const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures')

exports.aliasTopTour = (req,res,next)=>{
  req.query.limit = 5;
  req.query.sort = '-ratingAvarage,price'
  req.query.fields = 'name,duration,price,ratingAvarage'
  next()
}

exports.getAllTour = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate()

    const tours = await features.query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  // const id = req.params.id * 1;
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try{
    const stats = await Tour.aggregate([
      {
        $match: { ratingAvarage: { $gte: 4.5}}
      },
      {
        $group: {
          _id: {$toUpper: "$difficulty"},
          numTours: {$sum : 1},
          numRatings: {$sum : "$ratingQuantity"},
          avgRating: {$avg: "$ratingAvarage"},
          avgPrice: {$avg: "$price"},
          minPrice: {$min: "$price"},
          maxPrice: {$max: "$price"},
        }
      },
      {
        $sort: {avgPrice: 1}
      },
      // {
      //   $match: { _id: { $ne: "EASY"}}
      // }
    ])

    res.status(200).json({
      status: 'success',
      data: {
        stats
      },
    });

  }catch(err){
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
}
