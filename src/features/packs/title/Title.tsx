import s from "features/packs/title/styles.module.css"
import Button from "common/components/Button/Button"
import React, {FC} from "react"


type PropsType = {
  name?: string
  buttonName: string
  setOpenCreateModal: (openCreateModal: boolean) => void
}

export const Title: FC<PropsType> = ({setOpenCreateModal, name, buttonName}) => {

  return (
    <div className={s.pack__titleWrapper}>
      <h1 className={s.pack__title}>{name}</h1>
      <div className={s.buttonWrapper}>
        <Button name={buttonName} xType={"default"} onClick={() => setOpenCreateModal(true)} />
      </div>
    </div>
  )
}