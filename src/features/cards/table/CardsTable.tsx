import React, {FC} from "react"
import s from 'features/packs/table/styles.module.css'
import {Card} from "features/cards/table/Card"
import {CardType} from "features/cards/cards.types"


type Props = {
  cardsPack_id?: string
  cards: CardType[]
  isOwner: boolean
}

export const CardsTable: FC<Props> = ({cardsPack_id, cards}) => {

  return (
    <div className={s.container}>
      <div>
        <table className={s.table} style={{marginTop: "38px"}}>
          <thead className={s.table__head}>
          <tr className={s.table__tr}>
            <td className={s.table__colName}>
              Question
            </td>
            <td className={s.table__colName}>
              Answer
            </td>
            <td className={s.table__colName}>
              Created At
            </td>
            <td className={s.table__colName}>
              Actions
            </td>
          </tr>
          </thead>

          <tbody>
          {
            cards?.map((c) => <Card cardsPack_id={cardsPack_id} key={c?._id} c={c}/>)
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}