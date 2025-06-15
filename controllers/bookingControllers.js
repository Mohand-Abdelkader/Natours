/* eslint-disable import/no-extraneous-dependencies */
const stripe = require('stripe');
const Tour = require('../models/tourModel');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
// const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  console.log('im working inside booking cont');
  // 1 get the tour
  const tour = await Tour.findById(req.params.tourID);
  console.log(process.env.STRIPE_SECRET_KET);
  //2 create checkout session
  const session = await stripe(
    process.env.STRIPE_SECRET_KET,
  ).checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: tour.price,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          },
        },
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.test = (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
};
