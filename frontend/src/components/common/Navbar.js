import React, { useEffect, useState } from 'react';
import { Layout, Button, Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import localStorageService from '../../services/localStorageService';
import jwtDecode from 'jwt-decode';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = (props) => {

  const [user, setUser] = useState({});

  const logout = () => {
    localStorageService.removeToken();
    props.setRole("guest");
  }

  useEffect(() => {
    const token = localStorageService.getToken();
    if (token) {
        const user = localStorageService.getUser();
        setUser(user);
    }
  }, [])

  return (
    <Header className="bg-gray-200">
      <Row align="middle">
        <Col span={8}>
          <Row>
            <Col>
              <Title level={5}>
                <Link to="/">
                  Home
                </Link>
              </Title>
            </Col>
            {!(user.role === "guest" || user.role === undefined) &&
              <Col offset={1}>
                <Title level={5}>
                  <Link to="/board">
                    Board
                  </Link>
                </Title>
              </Col>
            }
          </Row>
        </Col>
        <Col span={8}>
          <Title level={2} className="text-center">Trello</Title>
        </Col>
        <Col span={8}>
          <Row justify="end">
            {user.role === "guest" || user.role === undefined ?
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
                  <span>{user.firstName} {user.lastName}</span>
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