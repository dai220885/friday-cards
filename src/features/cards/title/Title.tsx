import s from "features/packs/title/styles.module.css"
import Button from "common/components/Button/Button"
import React, {FC} from "react"
import {CardType} from "features/cards/cards.types"


type PropsType = {
  name?: string
  buttonName: string
  setOpenCreateModal: (openCreateModal: boolean) => void
  cards?: CardType[]
}

export const Title: FC<PropsType> = ({setOpenCreateModal, name, buttonName, cards}) => {

  return (
    <div className={s.pack__titleWrapper}>
      <h1 className={s.pack__title}>{name}</h1>
      {cards && cards.length > 0 && <div>
        <Button name={buttonName} xType={"default"} onClick={() => {
          setOpenCreateModal(true)
          console.log(123)
        }} />
      </div>}
    </div>
  )
}