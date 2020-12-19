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

const createCategory = async (req, res) => {
    const boardId = req.params.boardId;
    const newCategoryId = await db.Category.count({where: {board_id: boardId} });
    const newCategory = await db.Category.create({
        name: req.body.categoryName,
        order: newCategoryId + 1,
        board_id: boardId,
    });
    res.status(201).send(newCategory);
};

const createTask = async (req, res) => {
    const boardId = req.params.boardId;
    const categoryId = req.params.categoryId;
    const newCardId = await db.Card.count({where: { category_id: categoryId } });
    const newCard = await db.Card.create({
        name: req.body.taskName,
        description: req.body.description,
        order: newCardId + 1,
        category_id: categoryId,
    })
    res.status(201).send(newCard);
}

const editTask = async (req, res) => {
    const boardId = req.params.boardId;
    const categoryId = req.params.categoryId;
    const editCard = await db.Card.findOne({where: {
        id: req.body.taskId,
        category_id: categoryId,
    }})
    editCard.name = req.body.taskName;
    await editCard.save()
    res.status(201).send(editCard);
}

const getBoardDetail = async (req, res) => {
    const boardId = req.params.boardId;
    let categories = await db.Category.findAll({
        where: {board_id: boardId},
        order: [['order', 'ASC']],
    })
    let columnOrder = categories.map(column => String(column.id))
    let taskObj = {};
    let columns = await Promise.all(categories.map( async (category) => {
        const tasks = await db.Card.findAll({
            where: {category_id: category.id},
            order: [['order', 'ASC']],
        })
        console.log(tasks)
        let taskIds = [];
        tasks.forEach(task => {
            taskIds.push(String(task.id))
            taskObj[task.id] = {
                id: String(task.id),
                content: task.name,
                order: task.order,
            }
        })
        
        return (
            {
                [category.id]: {
                    id: String(category.id),
                    title: category.name,
                    order: category.order,
                    taskIds: taskIds,
                }
            }
        )
    })
    )
    let objColumns = {}; 

    columns.forEach(column => {
        objColumns[Object.keys(column)] = column[Object.keys(column)]
    });

    // res.send(objColumns)
    const data = {
        tasks: taskObj,
        columns: objColumns,
        columnOrder: columnOrder
    }
    res.status(200).send(data);
}

module.exports = {
  getBoard,
  createBoard,
  createCategory,
  createTask,
  getBoardDetail,
  editTask,
};

// const initialData = {
//     tasks: {
//       'task-1': {
//         id: 'task-1',
//         content: 'Take out the garbage 1',
//       },
//       'task-2': {
//         id: 'task-2',
//         content: 'Take out the garbage 2',
//       },
//       'task-3': {
//         id: 'task-3',
//         content: 'Take out the garbage 3',
//       },
//       'task-4': {
//         id: 'task-4',
//         content: 'Take out the garbage 4',
//       },
//       'task-5': {
//         id: 'task-5',
//         content: 'Take out the garbage 5',
//       },
//     },
//     columns: {
//       'column-1': {
//         id: 'column-1',
//         title: 'To do',
//         taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5']
//       },
//       'column-2': {
//         id: 'column-2',
//         title: 'Process',
//         taskIds: []
//       },
//       'column-3': {
//         id: 'column-3',
//         title: 'Done',
//         taskIds: []
//       }
//     },
//     columnOrder: ['column-1', 'column-2', 'column-3'],
//   };
  
//   export default initialData;