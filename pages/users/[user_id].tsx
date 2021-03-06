import React, {FC, useEffect, useState} from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/atoms/PageTitle";
import {Card} from 'antd';
import {axiosClient} from "../../util/axiosClient";
import {useRouter} from 'next/router';
import commonStyles from "../../styles/common.module.css";
import Link from "next/link";
import UserWithGoals from "../../types/UserWithGoals";

import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {selectOtherState, selectUserState} from "../../store/store";
import {setDisplayTargetUserId} from "../../store/slices/otherSlice";

const UserId: FC = () => {
  const dispatch = useDispatch()
  const routerUserId = Number(useRouter().query.user_id)
  // storeのユーザをログイン中のユーザIDとする
  const loginUserId = useSelector(selectUserState).id
  // 表示対象ユーザID
  const targetUserId = useSelector(selectOtherState).displayTargetUserId
  const [user, setUser] = useState<UserWithGoals>()

  useEffect( () => {
    // 画面リロードすると「router.query.user_id」が取得できなくなるため、止むを得ず表示対象IDをstoreに保存
    dispatch(setDisplayTargetUserId(routerUserId))
    if(targetUserId === routerUserId) {
      // 初回描画時にstoreへの保存処理が間に合わないため、targetUserIdがrouterUserIdと一致してからapiを叩くようにしている
      axiosClient.get(`/api/users/goals/${targetUserId}`).then(res => {
        setUser(res.data)
      })
    }
  }, [targetUserId])

  return (
    <Layout>
      <div>
        <PageTitle title={'ユーザ詳細'}/>
        {
          user &&
          <Card
            title={user.display_name}
            bordered={true}
          >
            <p>■プロフィール写真</p>
            <Avatar size="large" icon={<UserOutlined/>}/>

            <div className={commonStyles.mgt20}/>

            <p>■年齢</p>{user.age}

            <div className={commonStyles.mgt20}/>

            <p>■性別</p>{user.sex ? '男性' : '女性'}

            <div className={commonStyles.mgt20}/>

            {/*このユーザが登録済みの目標一覧*/}
            <>
              {
                user.Goal &&
                user.Goal.map((goal, index) => {
                  return (
                    <Card
                      title={goal.title}
                      bordered={true}
                      key={index}
                    >
                      <p>■詳細</p>{goal.detail}
                      <div className={commonStyles.mgt20}/>
                      <p>■期限</p>{goal.deadline}
                      <div className={commonStyles.mgt20}/>
                      {/*本人のみ目標編集画面への遷移を表示*/}
                      {
                        loginUserId === user.id &&
                        <Link href={`/updategoal/${goal.id}`}>
                          <a>目標を更新する</a>
                        </Link>
                      }
                    </Card>
                  )
                })
              }
            </>
          </Card>
        }
      </div>
    </Layout>
  )
}

export default UserId
