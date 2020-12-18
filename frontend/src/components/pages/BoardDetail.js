import React from 'react';
import { Button, Col, Input, Layout, notification, Row, Typography } from 'antd';
import Navbar from '../common/Navbar';
import axios from '../../config/axios';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import initData from '../common/data';
import Column from '../common/Column';
import { useParams } from 'react-router-dom';

const { Title } = Typography;
const { Footer } = Layout;

const Container = styled.div`
  display: flex;
  width: 100%
  overflow-x: scroll;
  position: relative;
`;

const BoardDetail = (props) => {

  const [data, setData] = React.useState({});
  const [isCreateCategory, setIsCreateCategory] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState("");
  const { boardId } = useParams();

  const getData = () => {
    axios.get(`/boards/${boardId}`).then(result => {
      setData(result)
    })
  }

  React.useEffect(() => {
    getData();
  }, [])

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if( !destination ) return ;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newData = {
        ...data,
        columnOrder: newColumnOrder
      }

      setData(newData)
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if(start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
  
      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        }
      }
      // console.log(newData)
      setData(newData);
      return;
    } 

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }

    setData(newData);
  }

  const createCategory = () => {

    if (categoryName === "") {
      notification.error({
        message: 'ต้องมีหัวข้อ'
      })
      return ;
    }

    axios.post(`/boards/${boardId}`, {
      boardId: boardId,
      categoryName: categoryName
    }).then(result => {
      notification.success({
        message: `สร้าง ${categoryName} เสร็จสิ้น`
      })
    }).catch(err => {
      notification.error({
        message: `ไม่สามารถสร้าง ${categoryName}`
      })
    })

    setIsCreateCategory(false);
    setCategoryName("");
  }

  return (
    <Layout className="layout flex flex-col h-screen">
      <Navbar setRole={props.setRole} />
      <div className="flex-grow px-12 bg-white pt-10">
        <Row align="center">
          <Col span={18}>
            <div className="border border-gray-200 rounded-md shadow-md p-5">
              <Row justify="space-between" align="top">
                <Col>
                  <Title>My Board</Title>
                </Col>
                <Col>
                  
                </Col>
              </Row>
              <DragDropContext
                onDragEnd={onDragEnd}
              >
                <Droppable
                  droppableId="all-column"
                  direction="horizontal"
                  type="column"
                >
                  {(provided) => (
                    <Container
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="relative w-full overflow-x-scroll"
                    >
                    {!data && data.columnOrder.map((columnId, index) => {
                      const column = data.columns[columnId];
                      const tasks = column.taskIds.map(taskId => data.tasks[taskId]);

                      return <Column key={column.id} column={column} tasks={tasks} index={index} />
                    })}
                    {provided.placeholder}
                    {!isCreateCategory ?
                      <Button className="mt-2" onClick={() => setIsCreateCategory(true)}>Create Category</Button>
                      :
                      <div className="flex flex-col gap-2">
                        <Input className="h-10 w-64 mt-2" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                        <Button type="primary" onClick={createCategory}>Create</Button>
                        <Button onClick={() => {setIsCreateCategory(false); setCategoryName("");} }>Cancel</Button>
                      </div>
                    }
                    </Container>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </Col>
        </Row>
      </div>
      <Footer style={{ textAlign: 'center' }}>Trello Clone ©2020 Created by Ponlawat</Footer>
    </Layout>
  )
}

export default BoardDetail;