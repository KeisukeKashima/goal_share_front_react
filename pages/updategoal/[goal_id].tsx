import {FC} from "react";
import GoalForm from "../../components/organisms/GoalForm";
import {useRouter} from "next/router";

const UpdateGoal: FC = () => {
  const router = useRouter()
  const goalId = Number(router.query.goal_id)

  return (
    <GoalForm goalId={goalId} />
  )
}

export default UpdateGoal
