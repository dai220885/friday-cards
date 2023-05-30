import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthApi, LoginArgsType, RegisterArgsType, UserType} from 'features/auth/auth.api';
import {createAppAsyncThunk} from 'common/utils/create.app.async.thunk';

// const register = createAsyncThunk('auth/register', (arg, thunkAPI)) => {
// 	const
// }
const THUNK_PREFIXES = {
	REGISTER: 'auth/register',
	LOGIN: 'auth/login',
}

const slice = createSlice({
	name: 'auth',
	initialState: {user: null as UserType | null, isLoading: false},
	//когда используем extraReducers, объект reducers, как правило, пустой:
	reducers: {
		// setUser: (state, action: PayloadAction<{ user: UserType }>) => {
		// 	state.user = action.payload.user
		// },
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(login.fulfilled, (state, action) => {
			if (action.payload?.user) {
				state.user = action.payload.user
				state.isLoading = false
			}
		})
		builder.addCase(login.rejected, (state) => {
			state.isLoading = false
		})
	},
});

const register = createAppAsyncThunk<void, RegisterArgsType>(
	// 1 - prefix
	THUNK_PREFIXES.REGISTER,
	// 2 - callback (условно наша старая санка), в которую:
	// - первым параметром (arg) мы передаем аргументы необходимые для санки
	// (если параметров больше чем один упаковываем их в объект)
	// - вторым параметром thunkAPI, обратившись к которому получим dispatch и др. свойства
	// https://redux-toolkit.js.org/usage/usage-with-typescript#typing-the-thunkapi-object
	async (arg, thunkAPI) => {
		await AuthApi.register(arg)
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
	async (arg, thunkAPI) => {
		//деструктуризируем методы из thunkAPI (dispatch будет нужен, чтобы задиспатчить экшен setUser,
		// который записывает данные залогиненного юзера в стейт. rejectWithValue нужен для обработки ошибок
		// при использовании extraReducers это нам не нужно
		//const {dispatch, getState, rejectWithValue} = thunkAPI
		const res = await AuthApi.login(arg)
		//dispatch(authActions.setUser({user: res.data}))
		return {user: res.data} //из санки нужно возвращать данные, которые попадут в extraReducers в action.payload
	},
	// (arg, thunkAPI) => {
	// 	const {dispatch, getState, rejectWithValue} = thunkAPI
	// 	AuthApi.login(arg).then((res)=>{
	// 		dispatch (authActions.setUser({user: res.data}))
	// 	})
	// },
)



export const authReducer = slice.reducer;
export const authActions = slice.actions
// Санки  упакуем в объект, нам это пригодится в дальнейшем
export const authThunks = {register, login};
