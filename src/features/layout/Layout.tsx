import React, {FC, PropsWithChildren, ReactNode} from 'react'
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


const Layout2 = ({children}: PropsWithChildren) => {
  return <div>
    {/*<Header/>*/}
    {children}
    {/*<Footer/>*/}
  </div>
}

type Layout3Props = {
count: number
}
const Layout3: FC<PropsWithChildren<Layout3Props>> = ({children, count}) => {
  return <div>
    {/*<Header/>*/}
    {children}
    {/*<Footer/>*/}
  </div>
}