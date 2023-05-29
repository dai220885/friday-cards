import React from 'react';
import s from './register.module.css'
import {useAppDispatch} from 'app/hooks';
import {authThunks} from 'features/auth/auth.slice';

export const Register = () => {
	const dispatch = useAppDispatch();

	const registerHandler = () => {
		dispatch(authThunks.register({email: 'dylevich220885@gmail.com', password: '12345678'}));
	};

	return (
		<div className={s.container}>
			<h1>Register</h1>
			<button onClick={registerHandler}>register</button>
		</div>
	);
};