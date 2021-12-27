import React, {FC, useEffect, useState} from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/atoms/PageTitle";
import {Card} from 'antd';
import Goal from "../../types/goal";
import {axiosClient} from "../../util/axiosClient";
import { useRouter } from 'next/router';
import commonStyles from "../../styles/common.module.css";
import Link from "next/link";

const GoalId: FC = () => {
  const router = useRouter()
  const goalId = router.query.goal_id

  const [goal, setGoal] = useState<Goal>()

  useEffect(() => {
    console.log(goalId)
    axiosClient.get(`/api/goals/${goalId}`).then(res => {
      setGoal(res.data)
    })
  }, [])

  return (
    <Layout>
      <div>
        <PageTitle title={'目標詳細'}/>
        <Card
          title={goal.title}
          bordered={true}
        >
          <p>■詳細</p>{goal.detail}
          <div className={commonStyles.mgt20}/>
          <p>■期限</p>{goal.deadline}
          <div className={commonStyles.mgt20}/>
          <Link href={`users/${goal.user_id}`}>
            <a>この目標を設定したユーザ詳細を見る</a>
          </Link>
        </Card>
      </div>
    </Layout>
  )
}

export default GoalId
