import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Создаем reducer с помощью slice
const slice = createSlice({
	// name должен быть уникальным
	// name будет использоваться в качетве приставки (redux ducks)
	name: 'app',
	initialState: {
		error: null as string | null,
		isLoading: false,
		isAppInitialized: false,
	},
	// reducers состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (в обычном redux)
	reducers: {
		setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
			state.isLoading = action.payload.isLoading
		},
		setError : (state, action: PayloadAction<{ error: string | null}>) =>{
			state.error = action.payload.error
		},
		setIsAppInitialized : (state, action: PayloadAction<{ isAppInitialized: boolean}>) =>{
			state.isAppInitialized = action.payload.isAppInitialized
		},

	},
})

export const appReducer = slice.reducer
export const appActions = slice.actions
// Санки  упакуем в объект, нам это пригодится в дальнейшем
export const appThunks = { };