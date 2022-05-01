import React, {FC, useState} from "react";
import Layout from "../Layout";
import PageTitle from "../atoms/PageTitle";
import { Form, Input, InputNumber, Button, Radio } from 'antd';
import User from "../../types/User";
import {axiosClient} from "../../util/axiosClient";
import {setDisplayName, setId, setIsSignedIn} from "../../store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectUserState} from "../../store/store";
import {useRouter} from "next/router";

interface Props {
  isSignUp: boolean
}

const UserForm: FC<Props> = ({isSignUp}) => {
  const router = useRouter();
  const dispatch = useDispatch()

  function onFinish(formValues) {
    if(isSignUp) {
      // 画面から入力されたオブジェクトはformValuesにwrapされているので、 リクエストボディをformValues.userとしてpostする
      axiosClient.post('/api/sign/up', formValues.user).then(res => {
        // 登録OKだったらユーザ情報をstoreに保存する
        dispatch(setIsSignedIn(true))
        dispatch(setId(res.data.id))
        dispatch(setDisplayName(res.data.display_name))

        // ここですぐにstoreから「user.displayName」を取得しても、まだstoreに反映されなていなくて取得できなかったので直接resから表示
        alert(`会員登録完了！${res.data.display_name}様、引き続き本サービスをお楽しみください！`)

        // 目標一覧に遷移
        // TODO 画面遷移するとstoreが消えてしまうことの解消から
        // router.push('/goals')

      }).catch((err) => {
        alert('新規登録処理に失敗しました。。')
        console.log(err.message)
      })
    } else {
      // TODO マイページ更新処理
    }
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

      <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
        <Form.Item name={['user', 'sex']} label="Sex">
          <Radio.Group>
            <Radio value={true}>男性</Radio>
            <Radio value={false}>女性</Radio>
          </Radio.Group>
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
