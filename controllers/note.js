const {Note} = require("../models");
const pagination = require("../util/pagination");
const {CustomError, catchAsync} = require("../util/error");

exports.addNote = catchAsync(async (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  const userID = parseInt(req.userID);
  if (!userID) return next(new CustomError("Please login first", 401));
  const note = await Note.create({
    title: title,
    body: body,
    userID: userID
  });
  res.status(201).json(note);
});

exports.getNote = catchAsync(async (req, res, next) => {
  const primaryKey = parseInt(req.query.id)
  const userID = parseInt(req.userID);
  if (!userID) return next(new CustomError("Please login first", 401));
  const note = await Note.findOne({where: {id: primaryKey, userID: userID}})
  if (!note) return next(new CustomError("Note could not be found", 404));
  res.status(200).json(note);
});

exports.updateNote = catchAsync(async (req, res, next) => {
  const primaryKey = parseInt(req.query.id)
  const userID = parseInt(req.userID);
  const title = req.body.title;
  const body = req.body.body;
  if (!userID) return next(new CustomError("Please login first", 401));
  const note = await Note.update({title, body}, {where: {id: primaryKey, userID: userID}});
  if (!note) return next(new CustomError("Note could not be found", 404));
  res.status(201).json(note);
});

exports.getNotes = catchAsync(async (req, res, next) => {
  let limit = parseInt(req.query.limit);
  let cursor = parseInt(req.query.cursor);
  const userID = parseInt(req.userID);
  if (!userID) return next(new CustomError("Please login first", 401));
  if (isNaN(limit)) {
    limit = 3;
  }

  if (isNaN(cursor)) {
    cursor = null;
  }

  await pagination.find(Note, cursor, limit, req, res, "next");
});
