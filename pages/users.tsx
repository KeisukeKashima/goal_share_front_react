import React, {FC, useEffect, useState} from "react";
import PageTitle from "../components/atoms/PageTitle";
import Layout from "../components/Layout";
import styles from "../styles/pages/Goals.module.css";
import {Card} from "antd";
import commonStyles from "../styles/common.module.css";
import Link from "next/link";
import User from "../types/user";
import {axiosClient} from "../util/axiosClient";

const users: FC = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    axiosClient.get('/api/users')
      .then(res => {
        setUsers(res.data)
      })
  }, [])

  return (
    <Layout>
      <PageTitle title={'目標一覧'}/>
      <div className={styles.cardWrap}>
        {
          users.map((user, key) => {
            return (
              <Card
                title={user.display_name}
                bordered={true}
                className={styles.card}
                key={key}
              >
                <p>■年齢</p>{user.age}

                <div className={commonStyles.mgt20}/>
                <p>■性別</p>{user.sex ? '男性' : '女性'}

                <div className={commonStyles.mgt20}/>
                <Link href={`/users/${user.id}`}>
                  <a>このユーザの設定した目標を見る</a>
                </Link>
              </Card>
            )
          })
        }
      </div>
    </Layout>
  )
}

export default users
