import {PackType} from "features/packs/packs.types"
import React, {FC, useState} from "react"
import s from "features/packs/table/styles.module.css"
import teacher from "assets/img/teacher.svg"
import pencil from "assets/img/pencil.svg"
import bin from "assets/img/bin.svg"
import {UpdatePackForm} from "features/packs/forms/UpdatePackForm"
import {DeletePackForm} from "features/packs/forms/DeletePackForm"
import {NavLink} from "react-router-dom"
import {useAppSelector} from 'app/hooks';

type Props = {
  p: PackType
  key: string
}

export const Pack: FC<Props> = ({p}) => {

  const [editMode, setEditMode] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const authorizedUser = useAppSelector(state => state.auth.user)

  const createdDate = new Date(p.created)
  const updatedDate = new Date(p.updated)

  const isOwner = authorizedUser?._id === p.user_id

  return (
    <tr key={p._id} className={s.table__tr}>
      <td className={s.table__colValue}>
        <NavLink to={`/cards/${p._id}`} className={s.table__link}>
          {p.name}
        </NavLink>
      </td>
      <td className={s.table__colValue}>
        {p.cardsCount}
      </td>
      <td className={s.table__colValue}>
        {p.updated ? updatedDate.toLocaleString() : createdDate.toLocaleString()}
      </td>
      <td className={s.table__colValue}>
        {p.user_name}
      </td>
      <td
        className={s.table__colValue_actions}>
        <div
          className={s.table__colValue_actionsWrapper + ' ' + (authorizedUser?._id !== p.user_id && s.table__colValue_actions_justLearn)}>
          {isOwner &&
            <>
              <img onClick={() => setEditMode(true)} src={pencil} alt="pencil"/>
              {editMode && <UpdatePackForm p={p} setEditMode={setEditMode}/>}

              <img onClick={() => setDeleteModal(true)} src={bin} alt="bin"/>
              {deleteModal && <DeletePackForm p={p} setDeleteModal={setDeleteModal}/>}
            </>
          }
          <img src={teacher} alt="teacher"/>
        </div>
      </td>
    </tr>
  )
}