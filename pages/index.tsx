import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {Button} from 'antd';
import React from "react";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className={styles.top}>
        <Link href='/goals'>
          <Button type="primary">さぁ！まずはここからみんなの目標を覗いてみよう！</Button>
        </Link>
      </div>
    </Layout>
  )
}
