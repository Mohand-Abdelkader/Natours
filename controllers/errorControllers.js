/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require('../utils/appError');

/* eslint-disable no-cond-assign */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateDB = (err) => {
  const value = Object.values(err.keyValue)[0];
  const message = `Duplicate filed value :${value}, please use another value`;
  return new AppError(message, 400);
};

const handleValidationDB = (err) => {
  const message = `Please correct the following errors: ${err.message}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token, please login again', 401);
const handleJWTExpiredError = () =>
  new AppError('your token has been expired, please login again', 401);

const sendErrorDev = (err, req, res) => {
  //API
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    //RENDER WEBSITE
    res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //1) log the error
    //2)send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: err.message,
    });
  }
  //1) log the error

  //2)send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: 'please Try again Later',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if ((process.env.NODE_ENV = 'development')) {
    let error = Object.create(err);

    if (error.code === 11000) error = handleDuplicateDB(error);
    if (error.name === 'ValidationError') error = handleValidationDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorDev(error, req, res);
  } else if ((process.env.NODE_ENV = 'production')) {
    let error = Object.create(err);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateDB(error);
    if (error.name === 'ValidationError') error = handleValidationDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(error, req, res);
  }
};
