import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Input, notification, Modal } from 'antd';
import axios from '../../config/axios';
import { useParams, useHistory } from 'react-router-dom';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';


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

  const [showEdit, setShowEdit] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [showCreateTask, setShowCreateTask] = React.useState(false);
  const [columnName, setColumnName] = React.useState("");
  const [taskName, setTaskName] = React.useState("");
  const { boardId } = useParams();
  const history = useHistory();

  const createTask = () => {

    if (taskName === "") {
      notification.error({
        message: 'กรุณากรอกชื่องาน'
      })
      return ;
    }
    axios.post(`/boards/${boardId}/${props.column.id}`, {
      taskName: taskName
    }).then(result => {
      notification.success({
        message: `เพิ่ม ${taskName} เสร็จสิ้น`
      })
      props.getData();
    }).catch(err => {
      notification.error({
        message: `เพิ่ม ${taskName} ล้มเหลว`
      })
    })

    setShowCreateTask(false);
    setTaskName("");
  }

  const handleDelete = () => {
    setConfirmLoading(true);
    axios.put('/columns', {
      columnId: props.column.id,
    })
    .then(result => {
      notification.success({
        message: 'ลบเสร็จสิ้น'
      })
      history.go(0);
    }).catch(err => {
      notification.error({
        message: 'เกิดข้อผิดพลาด'
      })
    }).finally(() => {
      setShowDeleteModal(false);
      setConfirmLoading(false);
    })
  }

  const handleEdit = () => {
    setConfirmLoading(true);
    axios.patch(`/columns/title`, {
      columnId: props.column.id,
      columnName: columnName,
    })
    .then(result => {
      notification.success({
        message: `แก้ไขเสร็จสิ้น`
      })
      props.getData();
    })
    .catch(err => {
      notification.error({
        message: 'แก้ไขข้อความล้มเหลว'
      })
    })
    .finally(() => {
      setShowEdit(false);
      setConfirmLoading(false);
    })
  };

  return (
    <>
      <Draggable draggableId={props.column.id} index={props.column.order - 1} >
        {(provided) => (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Title
              {...provided.dragHandleProps}
            >
              <span className="flex items-center justify-between">
                {props.column.title}
                <span className="flex items-center gap-2">
                  <EditOutlined onClick={() => setShowEdit(true)} />
                  <CloseOutlined onClick={() => setShowDeleteModal(true)}/>
                </span>
              </span>
            </Title>
            <Droppable droppableId={'column'+props.column.id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {props.tasks.map((task, index) => 
                    <Task key={"task-" + index} task={task} index={index} ColumnId={props.column.id} getData={props.getData} />
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
      <Modal
        title="ลบ Column"
        visible={showDeleteModal}
        onOk={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
        confirmLoading={confirmLoading}
        >
        <p>ยืนยันการลบ {props.column.title}</p>
      </Modal>
      <Modal 
        title="แก้ไขข้อมูล"
        visible={showEdit} 
        onOk={handleEdit} 
        onCancel={() => setShowEdit(false)}
        confirmLoading={confirmLoading}
      >
        <Input value={columnName} onChange={(e) => setColumnName(e.target.value)} />
      </Modal>
    </>
  )
}

export default Column;