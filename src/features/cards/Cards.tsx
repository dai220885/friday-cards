import React, {useEffect, useState} from "react"
import s from 'features/packs/styles.module.css'
import t from "features/packs/title/styles.module.css"
import {Nav} from "features/cards/nav/Nav"
import {CreateCardForm} from "features/cards/forms/CreateCardForm"
import {useParams} from "react-router-dom"
import {CardsTable} from "features/cards/table/CardsTable"
import {BackLink} from "common/components/BackLink/BackLink"
import Button from "common/components/Button/Button"
import {cardsActions, cardsThunks} from "features/cards/cards.slice"
import {toast} from "react-toastify"

import {useAppDispatch, useAppSelector} from 'app/hooks';


export const Cards = () => {

  const dispatch = useAppDispatch()

  const cardsPackFromUseParams = useParams() // here an object, like {id: "csdghcvdsghcda"}
  const cardsPack_id = cardsPackFromUseParams.cardsPack_id
  const packUserId = useAppSelector ((state) => state.cards.packUserId)
  const authorizedUser = useAppSelector ((state) => state.auth.user)
  const isOwner = authorizedUser?._id === packUserId
  const cards = useAppSelector ((state) => state.cards.cards)
  const packName = useAppSelector ((state) => state.cards.packName)

  useEffect(() => {
    cardsPack_id && dispatch(cardsActions.setCardsPackId(cardsPack_id))
    // dispatch(cardsActions.setParams())
    dispatch(cardsThunks.getCards())
      // .unwrap()
      // .then((res) => {
      //   if (res.cards.length > 0) {
      //     toast.success("Cards loaded successfully")
      //   }
      // })
  }, [])

  const [openCreateModal, setOpenCreateModal] = useState(false)

  return (
    <div className={s.packsWrapper}>
      <BackLink backPath={'/packs'} backText={'Back to Packs List'}/>
      {openCreateModal &&
        <CreateCardForm cardsPack_id={cardsPack_id} setOpenCreateModal={setOpenCreateModal}/>}
      <div className={s.packs}>
        <div className={t.pack__titleWrapper}>
          <h1 className={t.pack__title}>{packName}</h1>
          {cards && cards.length > 0 && <div>
            <Button name={"Add new card"} xType={"default"} onClick={() => setOpenCreateModal(true)}/>
          </div>}
        </div>

        {cards.length > 0
          ? <div>
            <Nav/>
            <CardsTable isOwner={isOwner} cards={cards} cardsPack_id={cardsPack_id}/>
          </div>
          : <div className={s.emptyPackWrapper}>
            {isOwner
              ? <>
                <p className={s.addCardDesc}>
                  This pack is empty. Click add new card to fill this pack
                </p>
                <div className={s.buttonEmptyPackWrapper}>
                  <Button name={"Add new card"} xType={"default"} onClick={() => setOpenCreateModal(true)}/>
                </div>
              </>
              :
              <p className={s.addCardDesc}>
                This pack is empty
              </p>
            }
          </div>
        }
      </div>
    </div>
  )
}