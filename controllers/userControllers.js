const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) create error if user POST password data
  if (req.body.password || req.body.confirmPassword)
    return next(
      new AppError(
        'This Route is not for password update , please use /updateMyPassword',
        400,
      ),
    );
  //2) update user Doc
  const filterBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};
exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet define',
  });
};
