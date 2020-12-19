require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');

const UserRouter = require('./routers/users');
const BoardRouter = require('./routers/boards');
const TaskRouter = require('./routers/tasks');
const ColumnRouter = require('./routers/columns');

const port = process.env.PORT

require('./config/passport');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', UserRouter);
app.use('/boards', BoardRouter);
app.use('/tasks', TaskRouter);
app.use('/columns', ColumnRouter);


app.get('/', (req, res) => res.send("OK"))



db.sequelize.sync( {force: false} ).then(() => {
  app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
  });
});