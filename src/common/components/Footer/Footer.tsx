import React, {FC, ReactNode} from 'react'
import s from 'common/components/Footer/styles.module.css'


type Props = {
  children: ReactNode
}
export const Footer: FC<Props> = ({children}) => {

  return (
    <div className={s.footerWrapper}>
      {children}
    </div>
  )
}