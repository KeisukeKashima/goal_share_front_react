import React, {FC, useEffect, useState} from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/atoms/PageTitle";
import {Card} from 'antd';
import Goal from "../../types/Goal";
import {axiosClient} from "../../util/axiosClient";
import { useRouter } from 'next/router';
import commonStyles from "../../styles/common.module.css";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {selectOtherState} from "../../store/store";
import {setDisplayTargetGoalId} from "../../store/slices/otherSlice";

const GoalId: FC = () => {
  const dispatch = useDispatch()
  const routerGoalId = Number(useRouter().query.goal_id)
  // 表示対象目標ID
  const targetGoalId = useSelector(selectOtherState).displayTargetGoalId
  const [goal, setGoal] = useState<Goal>()

  useEffect(() => {
    // 画面リロードすると「router.query.goal_id」が取得できなくなるため、止むを得ず表示対象IDをstoreに保存
    dispatch(setDisplayTargetGoalId(routerGoalId))
    if(targetGoalId === routerGoalId) {
      // 初回描画時にstoreへの保存処理が間に合わないため、targetGoalIdがrouterGoalIdと一致してからapiを叩くようにしている
      axiosClient.get(`/api/goals/${targetGoalId}`).then(res => {
        setGoal(res.data)
      })
    }
  }, [targetGoalId])

  return (
    <Layout>
      <div>
        <PageTitle title={'目標詳細'}/>
        {
          goal &&
          <Card
            title={goal.title}
            bordered={true}
          >
            <p>■詳細</p>{goal.detail}
            <div className={commonStyles.mgt20}/>
            <p>■期限</p>{goal.deadline}
            <div className={commonStyles.mgt20}/>
            <Link href={`/users/${goal.user_id}`}>
              <a>この目標を設定したユーザ詳細を見る</a>
            </Link>
          </Card>
        }
      </div>
    </Layout>
  )
}

export default GoalId
