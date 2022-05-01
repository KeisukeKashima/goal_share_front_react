import React, {FC} from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/atoms/PageTitle";
import {Button, Form, Input} from "antd";
import {axiosClient} from "../util/axiosClient";
import {setDisplayName, setId, setIsSignedIn} from "../store/slices/userSlice";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import UserWithGoal from "../types/UserWithGoals";

interface SignInRequest {
  mail: string,
  password: string
}

const SignIn: FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  function onFinish(formValues) {
    // 画面から入力されたオブジェクトはformValuesにwrapされているので、 リクエストボディをformValues.userから取得してpostする
    const request: SignInRequest = {
      mail: formValues.user.mail,
      password: formValues.user.password
    }
    axiosClient.post<UserWithGoal>('/api/sign/in', request).then(res => {
      // ログインOKだったらユーザ情報をstoreに保存する
      dispatch(setIsSignedIn(true))
      dispatch(setId(res.data.id))
      dispatch(setDisplayName(res.data.display_name))

      alert(`ログインに成功しました！`)

      // 目標一覧に遷移
      router.push('/goals')

    }).catch((err) => {
      alert('ログイン処理に失敗しました。。')
      console.log(err.message)
    })
  }

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!'
    }
  }

  return (
    <Layout>
      <PageTitle title={'ログインフォーム'}/>

      <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['user', 'mail']} label="Email" rules={[{required: true}, {type: 'email'}]}>
          <Input/>
        </Form.Item>
        <Form.Item name={['user', 'password']} label="Password" rules={[{required: true}]}>
          <Input/>
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

export default SignIn
