import React, {ChangeEvent, useEffect} from "react"
import s from 'features/packs/table/styles.module.css'
import {PackType} from "./../packs.types"
import {packsActions, packsThunks} from "features/packs/packs.slice"
import {Pack} from "features/packs/table/Pack"
import {MenuItem, Pagination, Select, SelectChangeEvent} from "@mui/material"
import {useAppDispatch, useAppSelector} from 'app/hooks';


export const PacksTable = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const filter = useAppSelector(state => state.packs.params.filter)
  const profile = useAppSelector(state => state.auth.user)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardsPackTotalCount)
  const pageCount = useAppSelector(state => state.packs.params.pageCount) ?? 4
  const page = useAppSelector(state => state.packs.params.page)

  // packs per page
  const handleChangePacksPerPage = (event: SelectChangeEvent) => {
    dispatch(packsActions.setParams({params: {pageCount: Number(event.target.value)}}))
  }
  const newPageCount = Math.ceil(cardPacksTotalCount / pageCount)

  // selected page
  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    dispatch(packsActions.setParams({params: {page: newPage}}))
  }

  let packsToRender = cardPacks
  if (filter === "My") {
    packsToRender = cardPacks.filter(p => p.user_id === profile?._id ? p : '')
  }

  useEffect(() => {
    dispatch(packsThunks.fetchPacks())
  },
    [page, pageCount])
    //[])

  return (
    <div className={s.container}>
      <table className={s.table} style={{marginTop: "38px"}}>
        <thead className={s.table__head}>
        <tr className={s.table__tr}>
          <td className={s.table__colName}>
            Name
          </td>
          <td className={s.table__colName}>
            Cards
          </td>
          <td className={s.table__colName}>
            Last Updated
          </td>
          <td className={s.table__colName}>
            Created By
          </td>
          <td className={s.table__colName}>
            Actions
          </td>
        </tr>
        </thead>

        <tbody>
        {packsToRender?.map((p: PackType) => <Pack key={p._id} p={p}/>)}
        </tbody>
      </table>

      <div className={s.paginationWrapper}>
        <Pagination
          count={newPageCount}
          page={page}
          color="primary"
          onChange={handleChangePage}
        />

        <p className={s.paginationText}>Show</p>
        <Select
          value={pageCount.toString()}
          defaultValue={'4'}
          onChange={handleChangePacksPerPage}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
        <p className={s.paginationText}>Packs per page</p>
      </div>
    </div>
  )
}