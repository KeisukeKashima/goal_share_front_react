import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {Button} from 'antd';
import React from "react";
import Layout from "../components/Layout";

import {useDispatch, useSelector} from 'react-redux'
import {selectGoalState, selectUserState} from "../store/store";
import {setDisplayName, setId, setIsSignedIn} from "../store/slices/userSlice";
import {setName} from "../store/slices/goalSlice";

export default function Home() {
  const dispatch = useDispatch()
  const user = useSelector(selectUserState)
  // 「{}」で囲むと中身が取れる(変数名を合わせる必要あり).
  // 最初上記のコードで{user}で取得しようとしてうまくいかなくてハマったが、それは中身が取得しようとしていたため
  // userの中にはuserなんていう変数名は当然ないためエラーとなっていた. ちなみに中身を直接取るなら↓こんな感じで書く
  const {isSignedIn, displayName, id} = useSelector(selectUserState)
  const goal  = useSelector(selectGoalState)

  const consoleLogMethod = () => {
    console.log(user)
    console.log(goal)
  }

  return (
    <Layout>
      <div className={styles.top}>
        <Link href='/goals'>
          <Button type="primary">さぁ！まずはここからみんなの目標を覗いてみよう！</Button>
        </Link>
      </div>
      {/*reduxからの表示とredux登録のテスト用div*/}
      <div>
        <p>{user.isSignedIn ? 'true' : 'false'}</p>
        <p>{user.id}</p>
        <p>{user.displayName}</p>
        <p>目標：{goal.name}</p>
        <Button type="primary" onClick={consoleLogMethod}>consoleLogMethod</Button>
        <Button type="primary" onClick={() => dispatch(setIsSignedIn(!user.isSignedIn))}>ログイン状態を変更</Button>
        <Button type="primary" onClick={() => dispatch(setId(2))}>idを変更</Button>
        <Button type="primary" onClick={() => dispatch(setDisplayName('更新後の名前'))}>名前を変更</Button>
        <Button type="primary" onClick={() => dispatch(setName('更新後の目標'))}>目標を変更</Button>
      </div>
    </Layout>
  )
}
