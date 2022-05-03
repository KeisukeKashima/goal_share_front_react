import React, {FC, useEffect, useState} from "react";
import Layout from "../Layout";
import PageTitle from "../atoms/PageTitle";
import {Form, Input, Button, Radio} from 'antd';
import {axiosClient} from "../../util/axiosClient";
import {setDisplayName, setId, setIsSignedIn} from "../../store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import UserWithGoal from "../../types/UserWithGoals";
import Goal from "../../types/Goal";
import {selectUserState} from "../../store/store";

interface Props {
  goalId?: number
}

interface GoalRequest {
  title: string,
  detail: string,
  deadline: string,
  user_id: number,
  master_progress_status_id: number
}

const GoalForm: FC<Props> = ({goalId}) => {
  const router = useRouter()
  const user = useSelector(selectUserState)
  const userId = user.id

  const [title, setTitle] = useState<string>()
  const [detail, setDetail] = useState<string>()
  const [deadline, setDeadline] = useState<string>()
  const [master_progress_status_id, setMasterProgressStatusId] = useState<number>()

  useEffect(() => {
    // 目標更新の場合は目標情報取得してstateにセット
    if (goalId) {
      axiosClient.get(`/api/goals/${goalId}`).then(res => {
        const goal = res.data
        setTitle(goal.title)
        setDetail(goal.detail)
        setDeadline(goal.deadline)
        setMasterProgressStatusId(goal.master_progress_status_id)
      })
    }
  }, [])

  // 登録 or 更新ボタン押下時処理
  function onFinish() {
    const request: GoalRequest = {
      title: title,
      detail: detail,
      deadline: deadline,
      user_id: userId,
      master_progress_status_id: master_progress_status_id
    }
    if (goalId == null) {
      // 新規登録処理
      axiosClient.post<Goal>('/api/goals', request).then(res => {
        alert('新しい目標を設定しました！')
        router.push(`/users/${userId}`)
      }).catch((err) => {
        alert('新規登録処理に失敗しました。。')
        console.log(err.message)
      })
    } else {
      // 更新処理
      axiosClient.put<Goal>(`/api/goals/${goalId}`, request).then(res => {
        alert('目標を更新しました！')
        router.push(`/users/${user.id}`)
      }).catch((err) => {
        alert('目標更新に失敗しました。。')
        console.log(err.message)
      })
    }
  }

  return (
    <Layout>
      <PageTitle title={goalId ? '目標更新' : '目標新規作成'}/>

      <Form name="nest-messages" onFinish={onFinish}>
        <Form.Item label="タイトル">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </Form.Item>
        <Form.Item label="詳細">
          <Input
            onChange={(e) => setDetail(e.target.value)}
            value={detail}
          />
        </Form.Item>
        <Form.Item label="期限">
          <Input
            onChange={(e) => setDeadline(e.target.value)}
            value={deadline}
          />
        </Form.Item>
        <Form.Item label="達成度">
          <Radio.Group
            onChange={(e) => setMasterProgressStatusId(e.target.value)}
            value={master_progress_status_id}
          >
            <Radio value={1}>未達成</Radio>
            <Radio value={2}>達成済み</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {goalId ? '更新' : '登録'}
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default GoalForm
