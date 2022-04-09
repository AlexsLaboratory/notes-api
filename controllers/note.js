const {Note} = require("../models");
const pagination = require("../util/pagination");
const {hasNext, hasPrev} = require("../util/pagination");
const {Op} = require("sequelize");

exports.addNote = (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  Note.create({
    title: title,
    body: body
  }).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).send({
      error: "Sorry something happened on our side. Please try again"
    })
    console.log(err);
  });
};

exports.getNote = async (req, res) => {
  let primaryKey = parseInt(req.query.id)
  Note.findByPk(primaryKey).then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).send({
      error: "Sorry something happened on our side. Please try again"
    })
    console.log(err);
  });
}

exports.getNotes = async (req, res) => {
  let limit = parseInt(req.query.limit);
  let cursor = parseInt(req.query.cursor);
  if (isNaN(limit)) {
    limit = 3;
  }

  if (isNaN(cursor)) {
    cursor = null;
  }

  await pagination.find(Note, cursor, limit, res, "next");
};