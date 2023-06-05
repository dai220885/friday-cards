import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
	AuthApi,
	ForgotPassArgsType,
	LoginArgsType,
	PartialUserType,
	RegisterArgsType,
	RegisterResponseType,
	UserType
} from 'features/auth/auth.api';
import {createAppAsyncThunk} from 'common/utils/create.app.async.thunk';
import {Navigate} from 'react-router-dom';
import {isAxiosError} from 'axios';
import {createThunkAction} from 'common/utils/create-thunk-action';
import {toast} from 'react-toastify';
import {thunkTryCatch} from 'common/utils/thunk-try-catch';

// const register = createAsyncThunk('auth/register', (arg, thunkAPI)) => {
// 	const
// }
const THUNK_PREFIXES = {
	REGISTER: 'auth/register',
	LOGIN: 'auth/login',
	FORGOT_PASS: 'auth/forgot-password',
	LOGOUT: 'auth/logout',
	UPDATE_PROFILE_DATA: 'auth/update-profile-data',
	ME: 'auth/me',
}

const slice = createSlice({
	name: 'auth',
	initialState: {
		user: null as UserType | null,
		isLoading: false,
		isAuthed: null as null | boolean,
		isRegistered: null as null | boolean,
		error: null as null | string
	},
	//когда используем extraReducers, объект reducers, как правило, пустой:
	reducers: {
		// setUser: (state, action: PayloadAction<{ user: UserType }>) => {
		// 	state.user = action.payload.user
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, action) => {
				if (action.payload?.user) {
					state.user = action.payload.user
					state.isLoading = false
					state.isAuthed = true
				}
			})
			.addCase(login.rejected, (state, action) => {
				console.log(action.payload)
				//пофиксить!!!, сюда придет ошибка в формате, в котором отправляется в thunk-try-catch
				if (isAxiosError(action.payload)) {
					state.error = action.payload?.response?.data?.error
				} else state.error = 'login error has occurred'
				//state.error = 'an error has occurred'
				//console.log(action.payload)
				state.isLoading = false
				//toast.error(state.error)
			})
			.addCase(register.fulfilled, (state) => {
				state.isRegistered = true
			})
			.addCase(register.rejected, (state, action) => {
				console.log(action.payload)
				//if (action.payload.e) state.error = action.payload
				//пофиксить!!!, сюда придет ошибка в формате, в котором отправляется в thunk-try-catch
				if (isAxiosError(action.payload)) {
					state.error = action.payload?.response?.data?.error
				} else state.error = 'register error has occurred'
				//toast.error(state.error)
				console.log('register rejected')
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true
				state.error = null //????????
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null
				state.isLoading = false
				state.isAuthed = false
				state.error = null //????????
			})
			.addCase(logout.rejected, (state, action) => {
				state.isLoading = false
				console.log(action.payload)
				console.log(action)
			})
			.addCase(me.pending, (state) => {
				state.isLoading = true
				state.error = null //????????
			})
			.addCase(me.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null //????????
				state.user = action.payload.user
			})
			.addCase(me.rejected, (state, action) => {
				state.isLoading = false
				//state.error = null //????????
			})
	},
});

const register = createAppAsyncThunk<{ user: RegisterResponseType }, RegisterArgsType>(
	THUNK_PREFIXES.REGISTER,
	createThunkAction(AuthApi.register, (res) => ({user: res.data})),
)

//не работает:
const __register = createAppAsyncThunk<any, RegisterArgsType>(
	THUNK_PREFIXES.REGISTER,
	(arg, thunkAPI) => {
		return thunkTryCatch(thunkAPI, () => {
			return AuthApi.register(arg).then((res) => {
				return ({user: res.data})
			})
		})
	}
)

const _register = createAppAsyncThunk<any, RegisterArgsType>(
	// 1 - prefix
	THUNK_PREFIXES.REGISTER,
	// 2 - callback (условно наша старая санка), в которую:
	// - первым параметром (arg) мы передаем аргументы необходимые для санки
	// (если параметров больше чем один упаковываем их в объект)
	// - вторым параметром thunkAPI, обратившись к которому получим dispatch и др. свойства
	// https://redux-toolkit.js.org/usage/usage-with-typescript#typing-the-thunkapi-object
	async (arg, thunkAPI) => {
		const {rejectWithValue} = thunkAPI
		try {
			const res = await AuthApi.register(arg)
			console.log(res)
		} catch (e) {
			console.error(e)
			//возвращаем rejectWithValue, чтобы отрабатывался register.rejected
			// и в него попадала ошибка е
			return rejectWithValue(e);
		}
		// AuthApi.register(arg)
		// 	.then((res) => {
		// 		//debugger;
		// 		console.log(res)
		// 	}).catch((res) => {
		// 	console.error(res)
		// });
	}
);
const login = createAppAsyncThunk<{ user: UserType }, LoginArgsType>(
	THUNK_PREFIXES.LOGIN,
	createThunkAction(AuthApi.login, (res) => ({user: res.data})),
)

const _login = createAppAsyncThunk<{ user: UserType }, LoginArgsType>(
	THUNK_PREFIXES.LOGIN,
	async (arg, thunkAPI) => {
		//деструктуризируем методы из thunkAPI (dispatch будет нужен, чтобы задиспатчить экшен setUser,
		// который записывает данные залогиненного юзера в стейт. rejectWithValue нужен для обработки ошибок
		// при использовании extraReducers это нам не нужно
		//const {dispatch, getState, rejectWithValue} = thunkAPI
		const {rejectWithValue} = thunkAPI
		try {
			const res = await AuthApi.login(arg)
			return {user: res.data} //из санки нужно возвращать данные, которые попадут в extraReducers в action.payload
		} catch (e) {
			//console.log(e)
			//return rejectWithValue(!isAxiosError(e)? e: e?.response?.data?.error)
			return rejectWithValue(e)
		}
		//то же самое, но без try-catch
		// 	return AuthApi.login(arg)
		// 		.then((res)=>{return {user: res.data}})
		// 		.catch((e)=>{return rejectWithValue(e)})
	}
)


const logout = createAppAsyncThunk<void>(
	THUNK_PREFIXES.LOGOUT,
	createThunkAction(AuthApi.logout)
)

const updateProfile = createAppAsyncThunk<{ user: UserType }, PartialUserType>(
	THUNK_PREFIXES.UPDATE_PROFILE_DATA,
	createThunkAction(AuthApi.updateProfileData, (res) => ({user: res.data}))
)

const me = createAppAsyncThunk<{ user: UserType }>(
	THUNK_PREFIXES.ME,
	createThunkAction(AuthApi.me, (res) => ({user: res.data}))
)

const forgotPassword = createAppAsyncThunk<any, ForgotPassArgsType>(
	THUNK_PREFIXES.FORGOT_PASS,
	async (arg, thunkAPI
	) => {
		await AuthApi.forgotPassword(arg)
	})

export const authReducer = slice.reducer;
export const authActions = slice.actions
// Санки  упакуем в объект, нам это пригодится в дальнейшем
export const authThunks = {
	register,
	login,
	forgotPassword,
	logout,
	updateProfile,
	me
};
