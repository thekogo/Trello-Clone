import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Modal, notification } from 'antd';
import axios from '../../config/axios';
import { useParams, useHistory } from 'react-router-dom';

const Container = styled.div`
    border: 1px solid lightgrey;
    padding: 8px;
    margin-bottom: 8px;
    background-color: ${props => props.isDragging ? 'lightgreen' : 'white'}
`;


const Task = (props) => {

  const [showEdit, setShowEdit] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [taskName, setTaskName] = React.useState(props.task.content);
  const { boardId } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    console.log("update")
  }, [])

  const showModal = () => {
    setShowEdit(true);
  };

  const handleEdit = () => {
    setConfirmLoading(true);
    axios.patch(`/boards/${boardId}/${props.ColumnId}`, {
      taskId: props.task.id,
      taskName: taskName,
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

  const handleCancel = () => {
    setTaskName(props.task.content)
    setShowEdit(false);
  };

  const handleDelete = () => {
    console.log(props.task.id)
    setConfirmLoading(true);
    axios.put('/tasks', {
      taskId: props.task.id,
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

  return (
    <>
      <Draggable draggableId={props.task.id} index={props.task.order-1}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <span className="flex justify-between items-center">
              {props.task.content}
              <span className="flex justify-between items-center gap-2">
                <EditOutlined onClick={showModal} />
                <CloseOutlined onClick={() => setShowDeleteModal(true)}/>
              </span>
            </span>
          </Container>
        )}
      </Draggable>
      <Modal 
        title="แก้ไขข้อมูล"
        visible={showEdit} 
        onOk={handleEdit} 
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        <Input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      </Modal>
      <Modal
        title="ลบ Task"
        visible={showDeleteModal}
        onOk={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
        confirmLoading={confirmLoading}
        >
        <p>ยืนยันการลบ {taskName}</p>
      </Modal>
    </>
  )
}

export default Task;