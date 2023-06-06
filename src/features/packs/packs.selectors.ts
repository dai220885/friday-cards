import { RootState } from "app/store"

const selectPacks = (state: RootState) => state.packs.cardPacks
const selectCardPacksTotalCount = (state: RootState) => state.packs.cardsPackTotalCount
const selectPage = (state: RootState) => state.packs.params.page
const selectPageCount = (state: RootState) => state.packs.params.pageCount
const selectFilter = (state: RootState) => state.packs.params.filter
const selectMinCardsCount = (state: RootState) => state.packs.params.min
const selectMaxCardsCount = (state: RootState) => state.packs.params.max

export {
  selectPacks,
  selectCardPacksTotalCount,
  selectPage,
  selectPageCount,
  selectMinCardsCount,
  selectMaxCardsCount,
  selectFilter
}