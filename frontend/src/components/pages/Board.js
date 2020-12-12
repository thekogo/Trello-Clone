import React from 'react';
import Navbar from '../common/Navbar';
import { Layout, Row, Col, Typography, Button, Modal, Form, notification, Input } from 'antd';
import axios from '../../config/axios';

const { Footer } = Layout;
const { Title } = Typography;

const Board = (props) => {

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [boardName, setBoardName] = React.useState("");

  const showModal = () => {
    setBoardName("")
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    console.log(boardName)
    axios.post('/boards', { boardName: boardName })
    .then(result => {
      notification.success({
        message: `สร้างบอร์ดเสร็จสิ้น`
      })
    })
    .catch(err => {
      notification.error({
        message: `ไม่สามารถสร้างบอร์ดได้`
      })
    })
    .finally(() => {
      setBoardName("")
      setVisible(false);
      setConfirmLoading(false);
    })
  };

  const handleCancel = () => {
    setVisible(false);
    setBoardName("")
  };

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
                  <Button type="primary" size="large" onClick={showModal}>Create Board</Button>
                </Col>
              </Row>

            </div>
          </Col>
        </Row>
      </div>
      <Footer style={{ textAlign: 'center' }}>Trello Clone ©2020 Created by Ponlawat</Footer>
      <Modal
        title="Create Board"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Title level={4}>Board Name : </Title> <Input placeholder="Example Board" onChange={(e) => setBoardName(e.target.value)} value={boardName} />
      </Modal>
    </Layout>
  )
}

export default Board;