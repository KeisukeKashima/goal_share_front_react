import React, {FC, useEffect, useState} from 'react';
import {Card} from 'antd';
import styles from 'styles/pages/Goals.module.css'
import commonStyles from 'styles/common.module.css'
import Goal from "types/goal"
import PageTitle from "../components/atoms/PageTitle";
import {axiosClient} from "util/axiosClient"
import Link from "next/link";

const Goals: FC = () => {
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    axiosClient.get('/api/goals')
      .then(res => {
        setGoals(res.data)
      })
  }, [])

  return (
    <>
      <PageTitle title={'目標一覧'}/>
      <div className={styles.cardWrap}>
        <div>
          {
            goals.map((goal, key) => {
              return (
                <div key={key}>
                  <Card
                    title={goal.title}
                    bordered={true}
                    className={styles.card}
                  >
                    <p>■詳細</p>{goal.detail}
                    <div className={commonStyles.mgt20}/>
                    <p>■期限</p>{goal.deadline}
                    <div className={commonStyles.mgt20}/>
                    <Link href={`Goals/${goal.id}`}>
                      <a>この目標の詳細を確認</a>
                    </Link>
                  </Card>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
export default Goals
