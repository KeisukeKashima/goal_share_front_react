import React, {FC} from 'react';
import styles from 'styles/atoms/PageTitle.module.css'

interface Props {
  title: string
}

const PageTitle: FC<Props> = (props) => {
  return (
    <h2 className={styles.title}>{props.title}</h2>
  )
}

export default PageTitle
