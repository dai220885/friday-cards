import React, {FC} from "react"
import styles from "features/auth/profile/styles.module.css"
import Button from "common/components/Button/Button"
import {TextField} from "@mui/material"
import i from "common/components/Input/styles.module.css"
import s from "./styles.module.css"
import {SubmitHandler, useForm} from "react-hook-form"
import {toast} from "react-toastify"
import {packsThunks} from "features/packs/packs.slice"
import {Footer} from "common/components/Footer/Footer"
import closeImg from 'assets/img/close.svg'
import {LeftTitle} from "common/components/Title/LeftTitle/LeftTitle"
import {useAppDispatch} from 'app/hooks';
import {AuthCard} from 'common/components/Card/AuthCard';


type Props = {
  setOpenCreateModal: (openCreateModal: boolean) => void
}
type FormDataType = {
  name: string
  privateCard: boolean
}

export const CreatePackForm: FC<Props> = ({setOpenCreateModal}) => {

  const {register, formState: {errors}, handleSubmit} = useForm<FormDataType>({mode: "onChange"})
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    dispatch(packsThunks.createPack(data))
      .unwrap()
      .then((res) => {
        toast.success(`New Pack ${res.pack.name} was added successfully`)
      })
      .catch(err => {console.log(err)})
    setOpenCreateModal(false)
  }


  return (
    <div className={s.background}>
      <AuthCard id={'cards-profile'}>
        <div className={s.closeImgWrapper}>
          <img src={closeImg} alt="close image" className={s.closeImg} onClick={() => setOpenCreateModal(false)}/>
        </div>
        <LeftTitle title={"Add New Pack"}/>
        <div className={styles.profile__wrapper}>
          <form onSubmit={handleSubmit(onSubmit)} action="#" autoComplete={'off'} style={{width: "350px"}}>
            <TextField
              fullWidth={true}
              label={"Pack Name"}
              variant={"standard"}
              autoComplete="off"
              placeholder={"Enter Pack Name"}
              className={i.input}
              {...(register("name", {
                required: "Name field is required",
                minLength: {
                  value: 3,
                  message: "Min length of card name field is 3 symbols"
                }
              }))}
              defaultValue={''}
              type="text"
            />
            {errors.name && <span className={i.error}>{errors.name.message}</span>}

            <div className={s.checkboxWrapper}>
              <input type={"checkbox"} {...register('privateCard')} className={s.checkbox} />
              <label htmlFor="#" style={{color: "#000"}} className={s.label}>Private Pack</label>
            </div>
            <Footer>
              <Button name={"Create"} xType={"default"}/>
            </Footer>
          </form>
        </div>
      </AuthCard>
    </div>
  )
}