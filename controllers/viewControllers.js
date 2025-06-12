const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverView = catchAsync(async (req, res) => {
  // 1 get the data from the database
  const tours = await Tour.find();

  //2 build our template
  //3 render that template using tours data

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const tour = await Tour.findOne({ slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});
