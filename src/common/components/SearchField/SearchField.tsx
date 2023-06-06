import s from "common/components/SearchField/styles.module.css"
import {Input} from "common/components/Input/Input"
import React, {FC} from "react"


type PropsType = {
  label: string
  addedClass?: string
}

export const SearchField: FC<PropsType> = ({label, addedClass}) => {

  return (
    <div className={s.searchWrapper + " " + addedClass}>
      <p className={s.searchLabel}>{label}</p>
      <Input placeholder={"Provide your text"} type={"text"} extraClass={s.searchInput} />
    </div>
  )
}