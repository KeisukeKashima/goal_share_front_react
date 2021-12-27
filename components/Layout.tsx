import {ReactNode} from 'react'
import styles from 'styles/components/Layout.module.css'

type Props = {
  children: ReactNode;
}

function Layout({children, ...props}: Props) {
  return (
    <div className={styles.top}>
      <h1>共通ヘッダー作ったらここに入れる</h1>
      <div {...props}>{children}</div>
    </div>
  )
}

export default Layout
