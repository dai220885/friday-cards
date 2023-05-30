import s from 'common/components/Card/styles.module.css'
import {FC, ReactNode} from "react"
import React from 'react'


type PropsType = {
  children: ReactNode
  id: string
}

export const Card: FC<PropsType> = ({children, id}) => {

  return (
    <div className={s.cardWrapper}>
      <div className={s.card} id={id}>
        {children}
      </div>
    </div>
  )
}