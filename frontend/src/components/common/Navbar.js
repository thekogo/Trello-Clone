import React from 'react';
import { Layout, Button, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  return (
    <Header className="bg-gray-200">
      <Row align="middle">
        <Col span={8}>
          <Title level={5}>Home</Title>
        </Col>
        <Col span={8}>
          <Title level={2} className="text-center">Trello</Title>
        </Col>
        <Col span={8}>
          <Row justify="end">
            <Col>
              <Link to="/register">
                <Button size="large" type="primary">Register</Button>
              </Link>
            </Col>
            <Col offset={1}>
              <Link to="/login">
                <Button size="large" type="default">Login</Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default Navbar;