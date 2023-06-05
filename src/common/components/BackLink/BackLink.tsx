import React, {FC} from "react"
import s from './styles.module.css'
import {NavLink} from "react-router-dom"
import back from 'assets/img/back.svg'


type Props = {
  backPath: string
  backText: string
}

export const BackLink: FC<Props> = ({backPath, backText}) => {

  return (
    <div className={s.linkWrapper}>
      <NavLink to={backPath} className={s.link}>
        <img src={back} alt="back" className={s.linkImg}/>
        <p className={s.linkText}>{backText}</p>
      </NavLink>
    </div>
  )
}