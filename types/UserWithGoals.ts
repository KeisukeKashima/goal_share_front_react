import Goal from "types/Goal"
import User from "./User";

export default interface UserWithGoal extends User {
  Goal: Array<Goal>
}
