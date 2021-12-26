import React, {FC, useState} from 'react';
import {Button} from 'antd';
import styles from 'styles/pages/Goals.module.scss'
import Goal from "./models/goal"

// FirstPost = () => { にして'react'のimportしなくてもいけた
const Goals: FC = () => {
  // Vueで言うdataの代わりにuseStateを利用する
  // const [変数名, 変数に値をセットする際のメソッド名] = useState><型(tsの場合でjsは省略可)>(初期値)
  // html側で表示する場合は「{}」でくくる <p>{ 変数名 }</p>
  // 「{}」でくくった後にさらにhtmlを表示する場合は「return」が必要なので注意(はまった)
  // const [count, setCount] = useState<number>(0)

  const [ids, setIds] = useState<number[]>([1,2,3])
  const [goals, setGoals] = useState<Goal[]>([
      {
        id: 1,
        title: '貯金する',
        detail: "月1万ずつで、10年以内に100万貯める。海外旅行に行くため",
        deadline: "hogehoge",
        user_id: 1,
        master_progress_status_id: 1
      },
      {
        id: 2,
        title: '貯金する',
        detail: "月1万ずつで、10年以内に100万貯める。海外旅行に行くため",
        deadline: "hogehoge",
        user_id: 1,
        master_progress_status_id: 1
      },
    ]
  )

  return (
    <>
      <h1>Goals</h1>
      <Button type="primary">Button</Button>
      <div>
        <div>
          {
            ids.map((id, index:number) => {
              {console.log(typeof(id))}
              return <p key={index}>{id}</p>
            })
          }
        </div>
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
