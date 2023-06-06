import s from './styles.module.css'
import {FC} from "react";
import React from 'react';


type PropsType = {
  title: string
}

export const LeftTitle: FC<PropsType> = ({title}) => {

  return (
    <div className={s.titleWrapper}>
      <h3 className={s.title}>{title}</h3>
      <hr/>
    </div>
  )
}