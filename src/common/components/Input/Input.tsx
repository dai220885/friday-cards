import i from "common/components/Input/styles.module.css"
import React, {FC} from "react"


type Props = {
  placeholder: string
  label?: string
  type: string
  options?: any
  extraClass?: string
}

export const Input: FC<Props> = ({extraClass, placeholder, label, type, options}) => {

  return (
    <>
      {label && <label>{label}</label>}
      <input
        placeholder={placeholder}
        type={type}
        className={i.inputField + " " + (extraClass && extraClass)}
      />
    </>
  )
}