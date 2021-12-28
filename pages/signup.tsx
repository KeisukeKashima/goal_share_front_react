import {FC, useState} from "react";
import UserForm from "../components/organisms/UserForm";
import User from "../types/User";

const SignUp: FC = () => {
  const [user, setUser] = useState<User>()
  function signUp(user) {
    setUser(user)
  }
  return (
    <>
      <UserForm createOrUpdate={() => signUp(user)}/></>
  )
}

export default SignUp
