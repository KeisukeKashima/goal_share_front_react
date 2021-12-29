import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {Button} from 'antd';
import React from "react";
import Layout from "../components/Layout";

import {useSelector, useDispatch} from 'react-redux'
import {RootState} from 'redux/rootReducer'
import {setDisplayName, setId, setIsSignedIn} from "redux/slices/user";

export default function Home() {

  // TODO 本来であればstate.userで取得したいのにそれだとうまく取れずstate=userとなってしまっている件
  const {user} = useSelector((state: RootState) => state)

  const dispatch = useDispatch()

  const consoleLogMethod = () => {
    console.log(user)
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
        <Button type="primary" onClick={consoleLogMethod}>consoleLogMethod</Button>
        <Button type="primary" onClick={() => dispatch(setIsSignedIn(!user.isSignedIn))}>ログイン状態を変更</Button>
        <Button type="primary" onClick={() => dispatch(setId(2))}>idを変更</Button>
        <Button type="primary" onClick={() => dispatch(setDisplayName('更新後の名前'))}>名前を変更</Button>
      </div>
    </Layout>
  )
}
