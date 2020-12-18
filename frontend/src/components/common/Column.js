import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Input, notification } from 'antd';
import axios from '../../config/axios';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
  width: 300px;
  position: relative;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => props.isDraggingOver ? 'lightblue' : 'white'};
  flex-grow: 1;
  min-height: 100px;
  `;

const Column = (props) => {

  const [showCreateTask, setShowCreateTask] = React.useState(false);
  const [taskName, setTaskName] = React.useState("");
  const { boardId } = useParams();

  const createTask = () => {

    if (taskName === "") {
      notification.error({
        message: 'กรุณากรอกชื่องาน'
      })
      return ;
    }
    axios.post(`/boards/${boardId}/${props.index}`, {
      taskName: taskName
    }).then(result => {
      notification.success({
        message: `เพิ่ม ${taskName} เสร็จสิ้น`
      })
    }).catch(err => {
      notification.error({
        message: `เพิ่ม ${taskName} ล้มเหลว`
      })
    })

    setShowCreateTask(false);
    setTaskName("");
  }

  return (
    <Draggable draggableId={props.column.id} index={props.index} >
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title
            {...provided.dragHandleProps}
          >
            {props.column.title}
          </Title>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => 
                  <Task key={task.id} task={task} index={index} />
                )}
                {provided.placeholder}
                {!showCreateTask ? 
                <Button className="w-full" type="primary" onClick={() => setShowCreateTask(true)}>Create Task</Button>
                :
                <div className="flex flex-col gap-1 bg-gray-200 p-5">
                  <Input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                  <Button type="primary" onClick={createTask}>Create Task</Button>
                  <Button onClick={() => {setShowCreateTask(false); setTaskName("");} }>Cancel</Button>
                </div>
                }
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  )
}

export default Column;