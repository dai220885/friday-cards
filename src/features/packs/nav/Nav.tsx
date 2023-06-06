import React, {useEffect, useState} from "react"
import noFilters from 'assets/img/noFilters.svg'
import s from 'features/packs/nav/styles.module.css'
import {SearchField} from "common/components/SearchField/SearchField"
import {FilterValueType} from "features/packs/packs.types"
import {packsActions} from "features/packs/packs.slice"
import {Range} from 'common/components/Range/Range'
import {useAppDispatch, useAppSelector} from 'app/hooks';


export const Nav = () => {

  const dispatch = useAppDispatch()
  const filter = useAppSelector(state => state.packs.params.filter)
  const minCardsCount = useAppSelector(state => state.packs.params.min)
  const maxCardsCount = useAppSelector(state=> state.packs.params.max)

  const [value1, setValue1] = useState<number>(Number(minCardsCount))
  const [value2, setValue2] = useState<number>(Number(maxCardsCount))
  console.log(value2, value1)

  const change = (event: Event, value: number | number[]) => {
    console.log('change')
    if (Number.isInteger(value)) {
      setValue1(value as number)
    } else if (Array.isArray(value)) {
      setValue1(value[0])
      setValue2(value[1])
    }
  }

  useEffect(() => {
    packsActions.setParams({params: {min: value1, max: value2}})
  }, [change])

  const renderFilterButton = (filterValue: FilterValueType) =>
    <button
      onClick={() => handleChangeFilter(filterValue)}
      className={s.nav__filterButton + ' ' + (filter === filterValue && s.nav__filterButton_active)}
    >
      {filterValue}
    </button>

  const handleChangeFilter = (value: FilterValueType) => dispatch(packsActions.setParams({params: {filter: value}}))


  return (
    <div className={s.nav}>
      <SearchField label={"Search"} addedClass={s.nav__position}/>
      <div className={s.nav__showPackCards + " " + s.nav__position}>
        <p className={s.nav__filterTitle}>Show packs cards</p>
        <div className={s.nav__filterButtonsWrapper}>
          {renderFilterButton('My')}
          {renderFilterButton('All')}
        </div>
      </div>

      <div className={s.nav__numberOfCards + " " + s.nav__position}>
        <p className={s.nav__filterTitle}>Number of cards</p>
        <div className={s.nav__rangeWrapper}>
          <input value={value1} type="text" pattern="[0-9]*" className={s.nav__rangeInput}/>
          <Range value={[value1, value2]} onChange={change}/>
          <input value={value2} type="text" pattern="[0-9]*" className={s.nav__rangeInput}/>
        </div>
      </div>

      <div className={s.nav__buttonWrapper}>
        <button className={s.nav__buttonNoFilters}>
          <img src={noFilters} alt="no filter img"/>
        </button>
      </div>
    </div>
  )
}