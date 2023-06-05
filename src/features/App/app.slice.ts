import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {isAxiosError} from 'axios';
import {toast} from 'react-toastify';

// Создаем reducer с помощью slice
const slice = createSlice({
	// name должен быть уникальным
	// name будет использоваться в качетве приставки (redux ducks)
	name: 'app',
	initialState: {
		error: null as string | null,
		isLoading: false,
		isAppInitialized: false,
		unhandledActions: [] as Array<any>,

	},
	// reducers состоит из подредьюсеров, каждый из которых эквивалентен одному оператору case в switch, как мы делали раньше (в обычном redux)
	reducers: {
		setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
			state.isLoading = action.payload.isLoading
		},
		setError: (state, action: PayloadAction<{ error: string | null }>) => {
			state.error = action.payload.error
		},
		setIsAppInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
			state.isAppInitialized = action.payload.isAppInitialized
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher((action) => {
				//проверяем, если диспатчится санка и ее состояние pending, то выполняем нужную нам логику
				return action.type.endsWith('/pending');
			}, (state, action) => {
				state.isLoading = true
			})
			.addMatcher((action) => {
				//проверяем, если диспатчится санка и ее состояние fulfilled, то выполняем нужную нам логику
				return action.type.endsWith('/fulfilled');
			}, (state, action) => {
				state.isLoading = false
			})
			.addMatcher(
				(action) => {
					return action.type.endsWith('/rejected')
				},
				(state, {payload: {error}}) => {
					//если состояни санки rejected, то показываем ошибку
					state.isLoading = false
					const errorMessage = getErrorMessage(error)
					if (errorMessage === null) return
					console.log(`проверка: ${errorMessage}`)
					toast.error(errorMessage)
				},)
			.addDefaultCase((state, action) => {
				//console.log('addDefaultCase 🚀', action.type)
				state.unhandledActions.push(action)
			})
	},
})


/* if null is returned no message should be shown */
function getErrorMessage(error: unknown): null | string {
	//debugger
	if (isAxiosError(error)) {
		//если не хотим показывать, что именно за ошибка при логинизации
		if (
			error?.response?.status === 400 &&
			error?.request.responseURL.endsWith('/login')
		) {
			//return null
			return 'incorrect login or password'
		}
		return error?.response?.data?.error ?? error.message
	}
	if (error instanceof Error) {
		return `Native error: ${error.message}`
	}
	return JSON.stringify(error)
}


export const appReducer = slice.reducer
export const appActions = slice.actions
// Санки  упакуем в объект, нам это пригодится в дальнейшем
export const appThunks = {};