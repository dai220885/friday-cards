import {AuthInstance} from 'features/auth/auth.instance';
import axios from 'axios';

export const AuthApi = {
	me: () => {
		return AuthInstance.post<UserType>("me")
	},
	register: (params: RegisterArgsType) => {
		return AuthInstance.post<RegisterResponseType>('register', params)
	},
	login: (params: LoginArgsType) => {
		return AuthInstance.post<UserType>('login', params)
	},
	logout: () => {
		return AuthInstance.delete('me')
	},
	forgotPassword: (arg: ForgotPassArgsType) => {
		return AuthInstance.post('forgot', arg)
		//return axios.post("https://neko-back.herokuapp.com/2.0/auth/forgot", arg, {withCredentials: true})
	},
	updateProfileData: (arg: PartialUserType) => {
		return AuthInstance.put<UserType>('me', arg)
	}
}

//types:
export type RegisterResponseType = {
	addedUser: AddedUserType
}

type PasswordToPick = {
	password: string
}

type FieldsToForgot = {
	from?: string
	message: string
}
export type ForgotPassArgsType = Pick<UserType, 'email'> & FieldsToForgot
export type AddedUserType = Omit<UserType, 'token' | 'tokenDeathTime'>
export type RegisterArgsType = Pick<UserType, 'email'> & PasswordToPick
export type LoginArgsType = Pick<UserType, 'email' | 'rememberMe'> & PasswordToPick
export type PartialUserType = Partial<UserType> //пока используется для updateUser и на сервер отправляетя только новое имя
//Omit - убирает из типа указанные поля,
// Pick - выбирает из указанного типа ТОЛЬКО указанные поля,
// Partial - берет все поля из указанного типа, но делает их не обязательными.
export type UserType = {
	_id: string
	email: string
	rememberMe: boolean
	isAdmin: boolean
	name: string
	verified: boolean
	publicCardPacksCount: number
	created: string
	updated: string
	token: string
	tokenDeathTime: number
	__v: number
}


