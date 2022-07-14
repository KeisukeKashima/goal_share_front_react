import React, {FC} from "react";
import Layout from "../components/Layout";
import PageTitle from "../components/atoms/PageTitle";
import {Button} from "antd";
import {setIsSignedIn} from "../store/slices/userSlice";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import lscache from "lscache";

const CognitoComplete: FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  //指定パラメータ取得処理(貰い物)
  function getParameterByHash(name) {
    let wHash = window.location.hash; //ハッシュ(#)以降をとる
    wHash = wHash.replace('#', '&'); //↓の処理を使いたいがために#を&に変換するorzorz
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(wHash);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function complete() {
    // id_token(=jwt)取得
    let idToken = getParameterByHash('id_token')

    // localStorageの有効期限60分に設定
    lscache.set('id_token', idToken, 60)

    // ユーザ情報をstoreに保存する
    dispatch(setIsSignedIn(true))

    alert(`ログインに成功しました！`)

    // 目標一覧に遷移
    router.push('/goals')
  }

  return (
    <Layout>
      <PageTitle title={'ログイン完了画面'}/>
      <div>
        <Button onClick={complete}>本ボタンを押すことでログイン処理が完了します</Button>
      </div>
    </Layout>
  )
}

export default CognitoComplete
