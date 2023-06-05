import React from 'react';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {authActions, authThunks} from 'features/auth/auth.slice';
import s from 'features/auth/register/register.module.css';

export const Login = () => {
	const isLoading = useAppSelector((state) => state.auth.isLoading);
	const dispatch = useAppDispatch();

	const loginHandler = () => {
		dispatch(authThunks.login({email: 'dylevich220885.2@gmail.com', password: '12345678', rememberMe: true}))
	};

	return (
		<div className={s.container}>
			{isLoading && <h1>Loader...</h1>}
			<h1>Login</h1>
			<button onClick={loginHandler}>login</button>
		</div>
	);
};