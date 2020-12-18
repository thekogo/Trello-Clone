const db = require('../models');
const Category = require('../models/Category');

const getBoard = async (req, res) => {
    const boardList = await db.Board.findAll({ where: { member_id: req.user.id } });
    res.status(200).send(boardList);
};

const createBoard = async (req, res) => {
    const newBoard = await db.Board.create({
        member_id: req.user.id,
        name: req.body.boardName,
    });

    res.status(201).send(newBoard);
};

const createCategory = async (req, res) => {
    const boardId = req.params.boardId;
    const newCategoryId = await db.Category.count({where: {board_id: boardId} });
    const newCategory = await db.Category.create({
        name: req.body.categoryName,
        order: newCategoryId,
        board_id: boardId,
    });
    res.status(201).send(newCategory);
};

const createTask = async (req, res) => {
    const boardId = req.params.boardId;
    const categoryId = req.params.categoryId;
    const newCardId = await db.Card.count({where: { category_id: categoryId } });
    const newCard = await db.Card.create({
        taskName: req.body.taskName,
        description: req.body.description,
        order: newCardId,
        category_id: categoryId,
    })
    res.status(201).send(newCard);
}

module.exports = {
  getBoard,
  createBoard,
  createCategory,
  createTask,
};