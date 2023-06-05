import React, {useState} from "react"
import {Title} from "common/components/Title/Title"
import {SubmitHandler} from "react-hook-form"
import styles from "features/auth/profile/styles.module.css"
import edit from "assets/img/edit.svg"
import editPhoto from "assets/img/editPhoto.svg"
import {Footer} from "common/components/Footer/Footer"
import Button from "common/components/Button/Button"
import i from "common/components/Input/styles.module.css"
import {EditProfileForm} from "features/auth/profile/forms/EditProfileForm"
import {authThunks} from "features/auth/auth.slice"

import avatar from 'assets/img/avatar.jpg'
import logout from 'assets/img/logout.svg'
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"

import f from 'common/components/Footer/styles.module.css'
import {BackLink} from "common/components/BackLink/BackLink"
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {AuthCard} from 'common/components/Card/AuthCard';


export const Profile = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  //const profile = useSelector(selectProfile)
  const user = useAppSelector((state)=> state.auth.user)
  const [editMode, setEditMode] = useState(false)

  // log out
  const onSubmit: SubmitHandler<any> = () => {
    dispatch(authThunks.logout())
      .unwrap()
      .then(() => {
        navigate('/login')
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  // edit profile
  const onEditMode = () => {
    setEditMode(true)
  }


  return (
    <>
      <BackLink backPath={'/packs'} backText={'Back to Packs List'} />
      <AuthCard id={'cards-profile'}>
        <Title title={"Personal Information"}/>
        <div className={styles.profile__wrapper}>
          <div className={styles.profile__userPhotoWrapper}>
            <img
              src={avatar}
              alt="user img"
              className={styles.profile__userPhoto}/>
            <div className={styles.profile__editPhotoWrapper}>
              <img src={editPhoto} alt="edit photo" className={styles.profile__editPhoto}/>
            </div>
          </div>

          <div className={styles.profile__userInfoWrapper}>
            {!editMode ?
              <div className={styles.profile__userNameWrapper}>
                <p className={styles.profile__userName}>{user && user.name}</p>
                <img src={edit} alt="edit profile" onClick={onEditMode} className={styles.profile__editImg}/>
              </div>
              :
              <div className={i.inputWrapper + " " + styles.profile__inputWrapper + ' ' +
                (editMode && styles.profile__inputWrapperFadeIn)}>
                <EditProfileForm userName={user && user.name} editMode={editMode} setEditMode={setEditMode}/>
              </div>
            }
            <p className={styles.profile__userEmail}>{user && user.email}</p>
          </div>

          <Footer>
            <Button onClick={onSubmit} name={"Log out"} xType={"secondary"} imgPath={logout}/>
          </Footer>
        </div>
      </AuthCard>
    </>
  )
}