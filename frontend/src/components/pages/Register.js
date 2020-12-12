import React from 'react';
import Navbar from '../common/Navbar';
import { Layout, Typography, Row, Col, Input, Form, Button, notification } from 'antd'
import axios from '../../config/axios';
import { withRouter } from 'react-router-dom';

const { Footer } = Layout;
const { Title } = Typography;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

const Register = (props) => {

  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    const body = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    }
    axios.post('/users/register', body)
      .then(res => {
        notification.success({
          message: `คุณ ${values.firstName} ${values.lastName} ได้สมัครสมาชิกเรียบร้อยแล้ว`
        })
        props.history.push("/login");
      })
      .catch(err => {
        console.log(err.response.data.message)
        notification.error({
          message: `การสมัครสมาชิกล้มเหลว
          ${err.response.data.message}`
        })
      })
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="layout flex flex-col h-screen">
      <Navbar setRole={props.setRole} />
      <div className="flex-grow px-12 bg-white pt-10">
        <Row align="center">
          <Col span={18}>
            <div className="border border-gray-200 rounded-md shadow-md p-5">
              <Title className="text-center">Register</Title>

              <Form
                {...layout}
                name="control-hooks"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your Email!' },
                    { type: 'email', message: 'Email is not valid'}
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Firstname"
                  name="firstName"
                  rules={[{ required: true, message: 'Please input your Firstname!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Lastname"
                  name="lastName"
                  rules={[{ required: true, message: 'Please input your Lastname!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" className="mr-2">
                    Submit
                  </Button>
                  <Button type="button" htmlType="reset" onClick={onReset}>
                    Reset
                  </Button>
                </Form.Item>
              </Form>

            </div>
          </Col>
        </Row>
      </div>
      <Footer style={{ textAlign: 'center' }}>Trello Clone ©2020 Created by Ponlawat</Footer>
    </Layout>
  )
}

export default withRouter(Register);