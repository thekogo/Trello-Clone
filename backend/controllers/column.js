const db = require('../models');

const deleteCol = async (req, res) => {
  const columnId = req.body.columnId;
  const columnDb = await db.Category.findOne({where: {id: columnId}});
  if (columnDb) {
    columnDb.destroy();
  }
  res.status(200).send(columnDb);
};

const updateTitle = async (req, res) => {
  const columnId = req.body.columnId;
  const columnName = req.body.columnName;
  const columnDb = await db.Category.findOne({where: {id: columnId}});
  if (columnDb) {
    columnDb.name = columnName;
    columnDb.save();
  }
  res.status(200).send(columnDb);
};

const updateOrderCol = async (req, res) => {
  const ColumnIds = req.body.ColumnIds;
  ColumnIds.forEach(async (column, index) => {
    const columnDb = await db.Category.findOne({where: {id: column}})
    columnDb.order = index+1;
    columnDb.save();
  })
    res.status(200).send({ColumnIds: ColumnIds});
};


module.exports = {
  updateOrderCol,
  deleteCol,
  updateTitle,
};
