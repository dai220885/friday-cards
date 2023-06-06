import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {
  ArgCreateCardType,
  CardType,
  GetCardsParamsType,
  GetCardsResponseType,
  GetParamsType
} from "features/cards/cards.types"

import {CardsApi} from "features/cards/cardsApi"
import {createAppAsyncThunk} from 'common/utils/create.app.async.thunk';
import {createThunkAction} from 'common/utils/create-thunk-action';
import {thunkTryCatch} from 'common/utils/thunk-try-catch';


const THUNK_PREFIXES = {
  CREATE_CARD: 'cards/createCard',
  GET_CARDS: 'cards/getCards',
  DELETE_CARD: 'cards/deleteCard',

}


const getCards = createAppAsyncThunk<GetCardsResponseType>(
  THUNK_PREFIXES.GET_CARDS,
  async (arg, thunkAPI) => {
    const {getState} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const params = {
        ...getState().cards.params,
        cardsPack_id: getState().cards.selectedCardsPackId
      }
      const res = await CardsApi.getCards(params)
      return {
        cards: res.data.cards,
        cardsPack_id: params.cardsPack_id,
        packName: res.data.packName,
        packUserId: res.data.packUserId
      }
    })
  })

// const _createCard = createAppAsyncThunk<{ card: CardType }, ArgCreateCardType>(
//   'cards/createCard',
//   async (arg, thunkAPI) => {
//     const {dispatch} = thunkAPI
//     return thunkTryCatch(thunkAPI, async () => {
//       const res = await CardsApi.createCard(arg)
//       dispatch(cardsThunks.getCards())
//       return { pack: res.data.newCard }
//     })}
//   )

const createCard = createAppAsyncThunk<{ card: CardType }, ArgCreateCardType>(
  THUNK_PREFIXES.CREATE_CARD,
  createThunkAction(CardsApi.createCard, (res) => ({ card: res.data }))
)


// const __deleteCard = createAppAsyncThunk<{ deletedCard: CardType }, string>(
//   "cards/removeCard",
//   async (id: string, thunkAP) => {
//     //const {dispatch} = thunkAPI
//     return thunkTryCatch(thunkAPI, async () => {
//       const res = await CardsApi.deleteCard(id)
//       //dispatch(cardsThunks.getCards())
//       return {cardId: res.data.deletedCard}
//     })
//   })

export const deleteCard = createAppAsyncThunk<{ deletedCard: CardType }, string>(
  THUNK_PREFIXES.DELETE_CARD,
  createThunkAction(CardsApi.deleteCard, (res) => ({ deletedCard: res.data.deletedCard }))
)

export const _deleteCard = createAppAsyncThunk(
  THUNK_PREFIXES.DELETE_CARD,
  async (id: string) => {
    return await CardsApi.deleteCard(id)
  }
)


const slice = createSlice({
  name: "cards",
  initialState: {
    packName: '',
    cards: [] as CardType[],
    params: {
      cardAnswer: '',
      cardQuestion: '',
      cardsPack_id: '',
      min: 0,
      max: 5,
      sortCards: 0,
      page: 1,
      pageCount: 4,
    } as GetCardsParamsType,
    selectedCardsPackId: '' as string,
    isLoading: false as boolean,
    packUserId: ''
  },
  reducers: {
    setParams: (state, action: PayloadAction<{ params: GetParamsType }>) => {
      state.params = { ...state.params, ...action.payload.params }
    },
    setCardsPackId: (state, action: PayloadAction<string>) => {
      state.selectedCardsPackId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload.cards
        state.packName = action.payload.packName
        state.selectedCardsPackId = action.payload.cardsPack_id
        state.packUserId = action.payload.packUserId
      })
      .addCase(createCard.fulfilled, (state, action: PayloadAction<{ card: CardType }>) => {
        state.cards.unshift(action.payload.card);
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        const index = state.cards.findIndex((c: CardType) => c._id && c._id === action.payload.deletedCard?._id)
        if (index !== -1) state.cards.splice(index, 1)
      })
  }
})

export const cardsActions = slice.actions
export const cardsReducer = slice.reducer
export const cardsThunks = { getCards, createCard, removeCard: deleteCard }
