import React, {FC, useEffect, useState} from "react";
import Layout from "../Layout";
import PageTitle from "../atoms/PageTitle";
import {Form, Input, Button, Radio} from 'antd';
import {axiosClient} from "../../util/axiosClient";
import {setDisplayName, setId, setIsSignedIn} from "../../store/slices/userSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import UserWithGoal from "../../types/UserWithGoals";

interface Props {
  userId?: number
}

interface UserRequest {
  mail: string,
  password: string,
  display_name: string,
  age: number,
  sex: boolean
}

const UserForm: FC<Props> = ({userId}) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const [mail, setMail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [display_name, setName] = useState<string>()
  const [age, setAge] = useState<number>()
  const [sex, setSex] = useState<boolean>()

  useEffect(() => {
    // マイページの場合のみユーザ情報取得してstateにセット
    if (userId) {
      axiosClient.get(`/api/users/${userId}`).then(res => {
        const user = res.data
        setMail(user.mail)
        setPassword(user.password)
        setName(user.display_name)
        setAge(user.age)
        setSex(user.sex)
      })
    }
  }, [])

  // 登録 or 更新ボタン押下時処理
  function onFinish() {
    const request: UserRequest = {
      mail: mail,
      password: password,
      display_name: display_name,
      age: age,
      sex: sex
    }

    if (userId == null) {
      // 新規登録処理
      axiosClient.post<UserWithGoal>('/api/sign/up', request).then(res => {
        // 登録OKだったらユーザ情報をstoreに保存する
        dispatch(setIsSignedIn(true))
        dispatch(setId(res.data.id))
        dispatch(setDisplayName(res.data.display_name))

        // ここですぐにstoreから「user.displayName」を取得しても、まだstoreに反映されなていなくて取得できなかったので直接resから表示
        alert(`会員登録完了！${res.data.display_name}様、引き続き本サービスをお楽しみください！`)

        // 目標一覧に遷移
        router.push('/goals')

      }).catch((err) => {
        alert('新規登録処理に失敗しました。。')
        console.log(err.message)
      })

    } else {
      // マイページ更新処理
      axiosClient.put<UserWithGoal>(`/api/users/${userId}`, request).then(res => {
        alert(`マイページを更新しました！`)
      }).catch((err) => {
        alert('マイページ更新に失敗しました。。')
        console.log(err.message)
      })

    }
  }

  return (
    <Layout>
      <PageTitle title={userId ? 'マイページ' : '新規会員登録'}/>

      <Form name="nest-messages" onFinish={onFinish}>
        <Form.Item label="Email">
          <Input
            onChange={(e) => setMail(e.target.value)}
            value={mail}
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Item>
        <Form.Item label="Name">
          <Input
            onChange={(e) => setName(e.target.value)}
            value={display_name}
          />
        </Form.Item>
        <Form.Item label="Age">
          <Input
            onChange={(e) => setAge(Number(e.target.value))}
            value={age}
          />
        </Form.Item>
        <Form.Item label="Sex">
          <Radio.Group
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <Radio value={true}>男性</Radio>
            <Radio value={false}>女性</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {userId ? '更新' : '登録'}
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default UserForm
