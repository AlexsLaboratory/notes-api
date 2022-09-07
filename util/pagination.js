const {Op} = require("sequelize");

async function hasNext(obj, cursor, userID) {
  return await obj.count({
    where: {
      id: {
        [Op.gt]: cursor
      },
      userID: userID
    }
  });
}

async function hasPrev(obj, cursor, userID) {
  return await obj.count({
    where: {
      id: {
        [Op.lt]: cursor
      },
      userID: userID
    }
  });
}

async function find(obj, cursor, limit, req, res, direction) {
  const userID = parseInt(req.userID);

  async function processResult(data) {
    if (data[data.length - 1].id === undefined) {
      res.status(404).json({
        message: "No notes found."
      });
    }

    let next = await hasNext(obj, data[data.length - 1].id, userID).then(data => {
      return data;
    });
    next = next > 0;
    let prev = await hasPrev(obj, data[0].id, userID).then(data => {
      return data;
    });
    prev = prev > 0;

    res.status(200).json({
      prev: prev ? data[0].id : null,
      next: next ? data[data.length - 1].id : null,
      direction: direction,
      data
    });
  }

  if (direction === "next") {
    if (cursor === null) {
      obj.findAll({
        where: {
          userID: userID
        },
        order: [
          ["id", "ASC"]
        ],
        limit: parseInt(limit)
      }).then(processResult);
    } else {
      obj.findAll({
        where: {
          id: {
            [Op.gt]: parseInt(cursor)
          },
          userID: userID
        },
        order: [
          ["id", "ASC"]
        ],
        limit: parseInt(limit)
      }).then(processResult);
    }
  }
}

exports.find = find;