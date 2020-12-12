import React from 'react';
import { Layout, Button, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import localStorageService from '../../services/localStorageService';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = (props) => {

  const logout = () => {
    localStorageService.removeToken();
    props.setRole("guest");
  }

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
            {props.role === "guest" ?
              <>
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
              </>
              :
              <>
                <Col>
                  <Link to="/register">
                    <Button size="large" type="primary">Register</Button>
                  </Link>
                </Col>
                <Col offset={1}>
                  <Button size="large" type="default" onClick={logout}>Logout</Button>
                </Col>
              </>
            }
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default Navbar;