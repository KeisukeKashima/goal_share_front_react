import React, {FC} from "react";
import Link from 'next/link'
import styles from "styles/components/molecules/Header.module.css";
import {Menu} from 'antd';
import {
  AppstoreOutlined,
  UserOutlined,
  PlusCircleOutlined,
  RiseOutlined,
  LogoutOutlined,
  LoginOutlined
} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {selectUserState} from "../../store/store";
import {axiosClient} from "../../util/axiosClient";
import {setDisplayName, setId, setIsSignedIn} from "../../store/slices/userSlice";
import {useRouter} from "next/router";

const {SubMenu} = Menu;

const Header: FC = () => {
  const user = useSelector(selectUserState)
  const router = useRouter()
  const dispatch = useDispatch()

  function renderWelcome(isSignedIn) {
    if (isSignedIn) {
      return <p>ようこそ！{user.displayName}さん(会員ID: {user.id})</p>
    } else {
      return <p>ログインすると全ての目標が閲覧できます！</p>
    }
  }

  async function signOut() {
    // キャンセルなら以降の処理を実行しない
    if (!confirm('本当にログアウトしますか？')) {
      return
    }

    //window.location.reload()
    // awaitで待つことで、リロードさせないとstoreのログイン情報が画面に反映されなかったためリロードさせていたのを解消
    await axiosClient.post('/api/sign/out').then(() => {
      // サインアウトOKだったらユーザ情報をstateから破棄する
      dispatch(setIsSignedIn(false))
      dispatch(setId(0))
      dispatch(setDisplayName(''))
    })
    alert('ログアウトしました')
    router.push('/goals')
  }

  return (
    <div className={styles.headerWrap}>
      <div>
        <Menu className={styles.menu}>
          <SubMenu key="sub1" icon={<AppstoreOutlined/>} title="各種メニュー">
            <>
              {
                user.isSignedIn ?
                  <>
                    {/*ログイン時のみ表示用ヘッダー*/}
                    <Menu.Item icon={<UserOutlined/>} key="1">
                      <Link href='/mypage'>
                        <a>マイページ</a>
                      </Link>
                    </Menu.Item>
                    <Menu.Item icon={<PlusCircleOutlined/>} key="2">新規目標設定</Menu.Item>
                    <Menu.Item icon={<RiseOutlined/>} key="3">設定済みの目標と更新</Menu.Item>
                    <Menu.Item icon={<LogoutOutlined/>} key="4" onClick={() => signOut()}>ログアウト</Menu.Item>
                  </>
                  :
                  <>
                    {/*未ログイン時のみ表示用ヘッダー*/}
                    <Menu.Item icon={<PlusCircleOutlined/>} key="5">
                      <Link href='/signup'>
                        <a>新規会員登録</a>
                      </Link>
                    </Menu.Item>
                    <Menu.Item icon={<LoginOutlined/>} key="6">
                      <Link href='/signin'>
                        <a>ログイン</a>
                      </Link>
                    </Menu.Item>
                  </>
              }
            </>
            {/*共通ヘッダー*/}
            <Menu.Item icon={<RiseOutlined/>} key="7">
              <Link href='/goals'>
                <a>目標一覧</a>
              </Link>
            </Menu.Item>
            <Menu.Item icon={<UserOutlined/>} key="8">
              <Link href='/users'>
                <a>ユーザ一覧</a>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>

      <div className={styles.welcome}>
        {renderWelcome(user.isSignedIn)}
      </div>

      <div className={styles.logo}>
        <h2>目標共有サービス</h2>
        <p>みんなの目標が簡単に見れる！</p>
      </div>
    </div>
  )
}

export default Header
