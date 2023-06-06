import {RootState} from "app/store"

const selectCards = (state: RootState) => state.cards.cards
const selectCardsPackId = (state: RootState) => state.cards.selectedCardsPackId
const selectCardsPackName = (state: RootState) => state.cards.packName
const selectPackUserId = (state: RootState) => state.cards.packUserId

export {selectCards, selectCardsPackId, selectCardsPackName, selectPackUserId}