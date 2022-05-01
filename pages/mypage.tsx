import {FC} from "react";
import UserForm from "../components/organisms/UserForm";
import {useSelector} from "react-redux";
import {selectUserState} from "../store/store";

const SignUp: FC = () => {
  const user = useSelector(selectUserState)

  return (
    <UserForm userId={user.id}/>
  )
}

export default SignUp
