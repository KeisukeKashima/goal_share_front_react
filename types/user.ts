import Goal from "types/goal"

export default interface User {
  id: number
  mail: string
  password: string
  display_name: string
  age: number
  sex: boolean
  Goal: Array<Goal>
}
