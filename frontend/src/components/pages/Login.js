import React from 'react';
import Navbar from '../common/Navbar';
import { Layout, Typography, Row, Col, Input, Form, Button } from 'antd'

const { Footer } = Layout;
const { Title } = Typography;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 5, span: 16 },
};

const Login = (props) => {

  const [form] = Form.useForm();

  const onFinish = values => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="layout flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow px-12 bg-white pt-10">
        <Row align="center">
          <Col span={18}>
            <div className="border border-gray-200 rounded-md shadow-md p-5">
              <Title className="text-center">Login</Title>

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

export default Login;