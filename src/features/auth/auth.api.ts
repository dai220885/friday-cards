import {AuthInstance} from 'features/auth/auth.instance';

export const AuthApi = {
	register: (params: RegisterArgsType) => {
		return AuthInstance.post<RegisterResponseType>('register', params)
	},
	login: (params: LoginArgsType) => {
		return AuthInstance.post<UserType>("login", params)
	},
}



export type RegisterResponseType = {
	addedUser: AddedUserType
}

type PasswordToPick = {
	password: string
}

export type AddedUserType = Omit<UserType, "token" | "tokenDeathTime">
export type RegisterArgsType = Pick<UserType, "email"> & PasswordToPick
export type LoginArgsType = Pick<UserType, "email" | "rememberMe"> & PasswordToPick
export type PartialUserType = Partial<UserType>
//Omit - убирает из типа указанные поля, Pick - выбирает из указанного типа ТОЛЬКО указанные поля, Partial - берет все поля из указанного типа, но делает их не обязательными.

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




type ResponseAfterRegistration = {
	addedUser: UserFromServerAfterRegistration;
}
type UserFromServerAfterRegistration = {
	_id: string;
	email: string;
	rememberMe: boolean;
	isAdmin: boolean;
	name: string;
	verified: boolean;
	publicCardPacksCount: number;
	created: string;
	updated: string;
	__v: number;
}

