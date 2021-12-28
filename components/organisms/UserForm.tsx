import React, {FC} from "react";
import Layout from "../Layout";
import PageTitle from "../atoms/PageTitle";
import { Form, Input, InputNumber, Button, Radio } from 'antd';
import User from "../../types/User";

interface Props {
  createOrUpdate: Function
}

const UserForm: FC<Props> = ({createOrUpdate}) => {

  function submit(user: User) {
    console.log(user)
    createOrUpdate(user)
  }

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }

  return (
    <Layout>
      <PageTitle title={'ユーザサインイン or ログイン.本当はpropsで'}/>

      <Form name="nest-messages" onFinish={submit} validateMessages={validateMessages}>
        <Form.Item name={['user', 'mail']} label="Email" rules={[{ required: true }, { type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'password']} label="Password" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'display_name']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="sex" label="Sex">
          <Radio.Group>
            <Radio value={true}>男性</Radio>
            <Radio value={false}>女性</Radio>
          </Radio.Group>d
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default UserForm
