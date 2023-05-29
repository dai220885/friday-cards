import axios from 'axios';

export const AuthInstance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL + 'auth/',
	withCredentials: true,
})