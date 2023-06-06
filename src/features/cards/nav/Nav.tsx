import React from "react"
import s from 'features/packs/nav/styles.module.css'
import {SearchField} from "common/components/SearchField/SearchField"


export const Nav = () => {

  return (
    <div className={s.nav}>
      <SearchField label={"Search"} addedClass={s.nav__position}/>
    </div>
  )
}