import {FC} from "react";
import GoalForm from "../../components/organisms/GoalForm";
import {router} from "next/client";

const UpdateGoal: FC = () => {
  const goalId = Number(router.query.goal_id)

  return (
    <GoalForm goalId={goalId} />
  )
}

export default UpdateGoal
