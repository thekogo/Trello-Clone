import React from 'react';
import Navbar from '../common/Navbar';
import { Layout, Row, Col, Typography, Button, Modal, Form, notification, Input, Divider } from 'antd';
import axios from '../../config/axios';
import BoardBox from '../common/BoardBox';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title } = Typography;

const Board = (props) => {

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [boardName, setBoardName] = React.useState("");
  const [boardList, setBoardList] = React.useState([]);

  const getBoardList = () => {
    axios.get('/boards')
    .then(result => {
      setBoardList(result.data)
    })
  }
  React.useEffect(() => {
    getBoardList()
  }, [])

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
      });
      getBoardList();
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
              <Divider />
              {boardList.length === 0 ? 
                <Title>Board is empty</Title>
                :
                <Row gutter={24}>
                  {boardList.map(board => (
                    <Col span={6} className="gutter-row mb-4">
                      <Link to={`/board/${board.id}`}>
                        <BoardBox {...board} />
                      </Link>
                    </Col>
                  ))}
                </Row>
              }
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