import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {Button} from 'antd';
import React from "react";

export default function Home() {
  return (
    <>
      <div className={styles.top}>
        <Link href='/Goals'>
          <Button type="primary">さぁ！まずはここからみんなの目標を覗いてみよう！</Button>
        </Link>
      </div>
    </>
  )
}
