import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ArgCreatePackType, FetchPacksResponseType, FilterValueType, GetPacksParamsType, PackType} from "./packs.types";
import {packsApi} from "features/packs/packs.api"
import {createAppAsyncThunk} from 'common/utils/create.app.async.thunk';
import {thunkTryCatch} from 'common/utils/thunk-try-catch';


const fetchPacks = createAppAsyncThunk<{ packsPage: FetchPacksResponseType, params: GetPacksParamsType }>(
  "packs/fetchPacks",
  async (_, thunkAPI) => {
    const { getState } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const params = {
        ...getState().packs.params,
        min: getState().packs.params?.min,
        max: getState().packs.params?.max,
        page: getState().packs.params?.page,
        pageCount: getState().packs.params?.pageCount
      }
      const res = await packsApi.getPacks(params)
      return { packsPage: res.data, params: params }
    })
  }
)

const createPack = createAppAsyncThunk<{ pack: PackType }, ArgCreatePackType>(
  "packs/createPack",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.createPack(arg)
      dispatch(packsThunks.fetchPacks())
      return { pack: res.data.newCardsPack }
    })
  })

const removePack = createAppAsyncThunk<{ packId: string }, string>(
  "packs/removePack",
  async (id, thunkAPI) => {
    const { dispatch } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.removePack(id)
      dispatch(packsThunks.fetchPacks())
      return {packId: res.data.deletedCardsPack._id}
    })
  })

const updatePack = createAppAsyncThunk<{ pack: PackType }, PackType>(
  "packs/updatePack",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.updatePack(arg);
      return { pack: res.data.updatedCardsPack }
    })
  })

const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: [] as PackType[],
    cardsPackTotalCount: 2000,
    params: {
      page: 1,
      pageCount: 4,
      min: 0,
      max: 100,
      packName: '',
      user_id: '',
      filter: 'All',
    } as GetPacksParamsType
  },
  reducers: {
    setParams: (state, action: PayloadAction<{ params: GetPacksParamsType }>) => {
      //debugger
      state.params = action.payload.params
    },
    setIsOwner: (state, action: PayloadAction<{ isOwner: boolean }>) => {
      state.cardPacks.forEach(pack => pack.isOwner = action.payload.isOwner)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPacks.fulfilled, (state, action) => {
        state.cardPacks = action.payload.packsPage.cardPacks
        state.cardsPackTotalCount = action.payload.packsPage.cardPacksTotalCount
      })
      .addCase(createPack.fulfilled, (state, action) => {
        state.cardPacks.unshift(action.payload.pack)
      })
      .addCase(removePack.fulfilled, (state, action) => {
        const index = state.cardPacks.findIndex((pack: PackType) => pack._id && pack._id === action.payload.packId)
        if (index !== -1) state.cardPacks.splice(index, 1)
      })
      .addCase(updatePack.fulfilled, (state, action) => {
        const index = state.cardPacks.findIndex((pack: PackType) => pack._id && pack._id === action.payload.pack?._id)
        if (index !== -1) state.cardPacks[index] = action.payload.pack
      })
  }
})

export const packsReducer = slice.reducer;
export const packsActions = slice.actions;
export const packsThunks = { fetchPacks, createPack, removePack, updatePack  };
