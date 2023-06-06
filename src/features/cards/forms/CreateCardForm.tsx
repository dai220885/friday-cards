import React, {FC} from "react"
import styles from "features/auth/profile/styles.module.css"
import Button from "common/components/Button/Button"
import {TextField} from "@mui/material"
import i from "common/components/Input/styles.module.css"
import s from "features/packs/forms/styles.module.css"
import {SubmitHandler, useForm} from "react-hook-form"
import {toast} from "react-toastify"
import {Footer} from "common/components/Footer/Footer"
import closeImg from 'assets/img/close.svg'
import {LeftTitle} from "common/components/Title/LeftTitle/LeftTitle"
import {cardsThunks} from "features/cards/cards.slice"
import {AuthCard} from 'common/components/Card/AuthCard';
import {useAppDispatch} from 'app/hooks';


type Props = {
  setOpenCreateModal: (openCreateModal: boolean) => void
  cardsPack_id?: string
}
type FormDataType = {
  question: string
  answer: string
  cardsPack_id: string
}

export const CreateCardForm: FC<Props> = ({setOpenCreateModal, cardsPack_id}) => {

  const {register, formState: {errors}, handleSubmit} = useForm<FormDataType>({
    mode: "onChange",
    defaultValues: {
      question: '',
      answer: '',
      cardsPack_id: cardsPack_id
    }
  })
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    dispatch(cardsThunks.createCard(data))
      .unwrap()
      .then(() => {
        toast.success("New Card was added successfully")
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
        <LeftTitle title={"Add New Card"}/>
        <div className={styles.profile__wrapper}>
          <form onSubmit={handleSubmit(onSubmit)} action="#" autoComplete={'off'} style={{width: "350px"}}>
            <p className={i.inputLabel}>Question</p>
            <TextField
              fullWidth={true}
              variant={"standard"}
              autoComplete="off"
              className={i.input}
              {...(register("question", {
                required: "Question field is required",
                minLength: {
                  value: 3,
                  message: "Min length of card question field is 3 symbols"
                }
              }))}
              defaultValue={''}
              type="text"
            />
            {errors.question && <span className={i.error}>{errors.question.message}</span>}

            <p className={i.inputLabel}>Answer</p>
            <TextField
              fullWidth={true}
              variant={"standard"}
              autoComplete="off"
              className={i.input}
              {...(register("answer", {
                required: "Answer field is required",
                minLength: {
                  value: 3,
                  message: "Min length of card answer field is 3 symbols"
                }
              }))}
              defaultValue={''}
              type="text"
            />
            {errors.answer && <span className={i.error}>{errors.answer.message}</span>}

            <Footer>
              <Button name={"Create"} xType={"default"}/>
            </Footer>
          </form>
        </div>
      </AuthCard>
    </div>
  )
}