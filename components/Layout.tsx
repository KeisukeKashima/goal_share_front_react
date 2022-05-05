import {ReactNode} from 'react'
import styles from 'styles/components/Layout.module.css'
import Header from "./molecules/Header";

type Props = {
  children: ReactNode;
}

function Layout({children, ...props}: Props) {
  return (
    <div className={styles.top}>
      <Header />
      <div {...props}>{children}</div>
    </div>
  )
}

export default Layout
