import React, {FC, useEffect, useState} from 'react';
import {Button} from 'antd';
import styles from 'styles/pages/Goals.module.scss'
import Goal from "types/goal"
import { axiosClient } from "util/axiosClient"

// FirstPost = () => { にして'react'のimportしなくてもいけた
const Goals: FC = () => {
  // Vueで言うdataの代わりにuseStateを利用する
  // const [変数名, 変数に値をセットする際のメソッド名] = useState><型(tsの場合でjsは省略可)>(初期値)
  // html側で表示する場合は「{}」でくくる <p>{ 変数名 }</p>
  // 「{}」でくくった後にさらにhtmlを表示する場合は「return」が必要なので注意(はまった)
  // const [count, setCount] = useState<number>(0)

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
