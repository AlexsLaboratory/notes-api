class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.data = null;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(err => next(err));
  };
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    data: err.data,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message,
      data: err.data,
    });
  } else {
    res.status(500).json({
      message: "Something happened on our side!",
      data: null
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};

module.exports.CustomError = CustomError
module.exports.catchAsync = catchAsync;