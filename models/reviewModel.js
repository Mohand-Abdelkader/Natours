/* eslint-disable prefer-arrow-callback */
const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'you must enter your review'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'please leave a rating'],
      min: [1, 'rating must be above 1.0'],
      max: [5, 'rating must be below 5.0'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: 'user',
  //     select: 'name photo',
  //   }).populate({
  //     path: 'tour',
  //     select: 'name',
  //   });
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  return next();
});

reviewSchema.statics.calcAverageRating = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingQuantity: stats[0].nRating,
      ratingAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingQuantity: 0,
      ratingAverage: 4.5,
    });
  }
};

//this line to make the user have only one review per tour,
// so we made index that will depend on each user and tour id,
// and we set it to unique true to make sure
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
reviewSchema.post('save', function () {
  //this point to current review
  this.constructor.calcAverageRating(this.tour);
});

//this is jonas solution
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  this.r.constructor.calcAverageRating(this.r.tour);
});

//Post middleware will get the doc as the first argument. So the post middleware will get the updated review as an argument. So you can just do:
// reviewSchema.post(/^findOneAnd/, async function (doc) {
//   await doc.constructor.calcAverageRatings(doc.tour);
// });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
