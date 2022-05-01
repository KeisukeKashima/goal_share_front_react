import {FC} from "react";
import UserForm from "../components/organisms/UserForm";

const SignUp: FC = () => {
  return (
    <UserForm isSignUp={true}/>
  )
}

export default SignUp
