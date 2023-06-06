import React, {FC} from "react"
import Button from "common/components/Button/Button"
import s from "features/packs/forms/styles.module.css"
import closeImg from 'assets/img/close.svg'
import {toast} from "react-toastify"
import {LeftTitle} from "common/components/Title/LeftTitle/LeftTitle"
import {CardType} from "features/cards/cards.types"
import {cardsThunks} from "features/cards/cards.slice"
import {useAppDispatch} from 'app/hooks';
import {AuthCard} from 'common/components/Card/AuthCard';


type Props = {
  c: CardType
  cardsPack_id?: string
  setDeleteModal: (deleteModal: boolean) => void
}

export const DeleteCardForm: FC<Props> = ({setDeleteModal, c, cardsPack_id}) => {

  const dispatch = useAppDispatch()

  const removePackHandler = (id: string) => {
    dispatch(cardsThunks.removeCard(id))
      .unwrap()
      .then((res) => {
        toast.success(`Pack ${c.question} was deleted successfully`)
      })
      .catch(err => {console.log(err)})
    setDeleteModal(false)
  }


  return (
    <div className={s.background}>
      <AuthCard id={'cards-profile'}>
        <div className={s.closeImgWrapper}>
          <img src={closeImg} alt="close image" className={s.closeImg} onClick={() => setDeleteModal(false)}/>
        </div>
        <LeftTitle title={"Delete Pack"}/>
        <p className={s.desc}>Do you really want to remove <strong>{c.question}</strong>?</p>
        <p className={s.desc}>All cards will be deleted.</p>
        <div className={s.buttonsWrapper}>
          <Button
            name={"Delete"}
            xType={'red'}
            onClick={() => removePackHandler(c._id)}
            className={s.button}
          />
          <Button
            name={"Cancel"}
            xType={"secondary"}
            onClick={() => setDeleteModal(false)}
            className={s.button}
          />
        </div>
      </AuthCard>
    </div>
  )
}