import React, {useState} from "react"
import s from 'features/packs/styles.module.css'
import {Title} from "features/packs/title/Title"
import {Nav} from "features/packs/nav/Nav"
import {PacksTable} from "features/packs/table/PacksTable"
import {CreatePackForm} from "features/packs/forms/CreatePackForm"
import {BackLink} from "common/components/BackLink/BackLink"


export const Packs = () => {

  const [openCreateModal, setOpenCreateModal] = useState(false)

  return (
    <div className={s.packsWrapper}>
      <BackLink backPath={'/profile'} backText={'Back to Profile'} />
      {openCreateModal && <CreatePackForm setOpenCreateModal={setOpenCreateModal}/>}
      <div className={s.packs}>
        <Title name={"Packs"} buttonName={"Add new pack"} setOpenCreateModal={setOpenCreateModal}/>
        <Nav />
        <PacksTable />
      </div>
    </div>
  )
}