const db = require('../models');

const deleteTask = async (req, res) => {
  const taskId = req.body.taskId;
  console.log(taskId)
  const taskDb = await db.Card.findOne({where: {id: taskId}});
  if (taskDb) {
    taskDb.destroy();
  }
  res.status(200).send(taskDb);
};

const updateSame = async (req, res) => {
  const taskIds = req.body.taskIds;
  taskIds.forEach(async (task, index) => {
    const taskDb = await db.Card.findOne({where: {id: task}})
    taskDb.order = index+1;
    taskDb.save();
  })
    res.status(200).send({taskIds: taskIds});
};

const updateDiffCol = async (req, res) => {
  const newCategoryId = req.body.newCategoryId;
}


module.exports = {
  updateSame,
  deleteTask,
};
