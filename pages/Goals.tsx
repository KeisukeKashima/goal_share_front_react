import React, {FC, useEffect, useState} from 'react';
import {Button} from 'antd';
import styles from 'styles/pages/Goals.module.scss'
import Goal from "types/goal"
import PageTitle from "../components/atoms/PageTitle";
import { axiosClient } from "util/axiosClient"

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
      <h1>Goals</h1>
      <PageTitle title={'目標一覧'}/>
      <Button type="primary">Button</Button>
      <div>
        <div>
          {
            goals.map((goal, index) => {
              return <p key={index}>{goal.title}</p>
            })
          }
        </div>
        <p>hgoe1</p>
        <p>hgoe2</p>
      </div>
      <div>
        <p>fuga1</p>
        <p>fuga2</p>
      </div>
    </>
  )
}
export default Goals
