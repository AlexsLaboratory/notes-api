const {Op} = require("sequelize");

async function hasNext(obj, cursor) {
  return await obj.count({
    where: {
      "id": {
        [Op.gt]: cursor
      }
    }
  });
}

async function hasPrev(obj, cursor) {
  return await obj.count({
    where: {
      "id": {
        [Op.lt]: cursor
      }
    }
  });
}

async function find(obj, cursor, limit, res, direction) {
  async function processResult(data) {
    let next = await hasNext(obj, data[data.length - 1].id).then(data => {
      return data;
    });
    next = next > 0;
    let prev = await hasPrev(obj, data[0].id).then(result => {
      return result;
    });
    prev = prev > 0;

    res.status(200).json({
      page: {
        prev: prev ? data[0].id : null,
        next: next ? data[data.length - 1].id : null,
        direction: direction,
        data
      }
    });
  }

  if (direction === "next") {
    if (cursor === null) {
      obj.findAll({
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
          }
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