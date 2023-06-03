import React, {FC, ReactNode} from 'react'
import s from 'features/layout/styles.module.css'

type PropsType = {
  children: ReactNode
}

export const Layout: FC<PropsType> = ({children}) => {

  return (
    <div className={s.layout}>
      <div className={s.layoutContainer}>
        {/*<Header/>*/}
        {children}
        {/*<Footer/>*/}
      </div>
    </div>
  )
}
