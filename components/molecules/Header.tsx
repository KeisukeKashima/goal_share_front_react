import {FC, useState} from "react";
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

const {SubMenu} = Menu;

const Header: FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(true)
  const [userName, setUserName] = useState('田中')
  const [userId, setUserId] = useState(1)

  function renderWelcome(isSignedIn) {
    if (isSignedIn) {
      return <p>ようこそ！{userName}さん(会員ID: {userId})</p>
    } else {
      return <p>ログインすると全ての目標が閲覧できます！</p>
    }
  }

  return (
    <div className={styles.headerWrap}>
      <div>
        <Menu className={styles.menu}>
          <SubMenu key="sub1" icon={<AppstoreOutlined/>} title="各種メニュー">
            <>
              {
                isSignedIn ?
                  <>
                    {/*ログイン時のみ表示用ヘッダー*/}
                    <Menu.Item icon={<UserOutlined/>} key="1">マイページ</Menu.Item>
                    <Menu.Item icon={<PlusCircleOutlined/>} key="2">新規目標設定</Menu.Item>
                    <Menu.Item icon={<RiseOutlined/>} key="3">設定済みの目標と更新</Menu.Item>
                    <Menu.Item icon={<LogoutOutlined/>} key="4">ログアウト</Menu.Item>
                  </>
                  :
                  <>
                    {/*未ログイン時のみ表示用ヘッダー*/}
                    <Menu.Item icon={<PlusCircleOutlined/>} key="5">新規会員登録</Menu.Item>
                    <Menu.Item icon={<LoginOutlined/>} key="6">ログイン</Menu.Item>
                  </>
              }
            </>
            {/*共通ヘッダー*/}
            <Menu.Item icon={<RiseOutlined/>} key="7">
              <Link href='/goals'>
                <a>目標一覧</a>
              </Link>
            </Menu.Item>
            <Menu.Item icon={<UserOutlined/>} key="8">ユーザ一覧</Menu.Item>
          </SubMenu>
        </Menu>
      </div>

      <div className={styles.welcome}>
        {renderWelcome(isSignedIn)}
      </div>

      <div className={styles.logo}>
        <h2>目標共有サービス</h2>
        <p>みんなの目標が簡単に見れる！</p>
      </div>
    </div>
  )
}

export default Header
