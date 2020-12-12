const db = require('../models');

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

module.exports = {
  getBoard,
  createBoard,
};