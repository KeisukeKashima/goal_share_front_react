import Goal from "types/Goal"
import User from "./User";

// バックエンドのUserエンティティにあたる
export default interface UserWithGoal extends User {
  Goal: Array<Goal>
}
