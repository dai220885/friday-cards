import React, {FC} from "react"
import Button from "common/components/Button/Button"
import s from "./styles.module.css"
import {packsThunks} from "features/packs/packs.slice"
import closeImg from 'assets/img/close.svg'
import {PackType} from "features/packs/packs.types"
import {toast} from "react-toastify"
import {LeftTitle} from "common/components/Title/LeftTitle/LeftTitle"
import {useAppDispatch} from 'app/hooks';
import {AuthCard} from 'common/components/Card/AuthCard';
import {log} from 'util';


type Props = {
  p: PackType
  setDeleteModal: (deleteModal: boolean) => void
}

export const DeletePackForm: FC<Props> = ({setDeleteModal, p}) => {

  const dispatch = useAppDispatch()

  const removePackHandler = (id: string) => {
    dispatch(packsThunks.removePack(id))
      .unwrap()
      .then((res) => {
        toast.success(`Pack ${p.name} was deleted successfully`)
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
        <p className={s.desc}>Do you really want to remove <strong>{p.name}</strong>?</p>
        <p className={s.desc}>All cards will be deleted.</p>
        <div className={s.buttonsWrapper}>
          <Button
            name={"Delete"}
            xType={'red'}
            onClick={() => removePackHandler(p._id)}
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