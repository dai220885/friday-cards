import React from 'react';
import s from './register.module.css'
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {authThunks} from 'features/auth/auth.slice';
import {Navigate} from 'react-router-dom';

export const Register = () => {
	const dispatch = useAppDispatch();
	const isRegistered = useAppSelector((state)=>state.auth.isRegistered)

	const registerHandler = () => {
		dispatch(authThunks.register({email: 'dylevich220885@gmail.com', password: '12345678'}));
	};

	return (!isRegistered
			? <div className={s.container}>
		<h1>Register</h1>
		<button onClick={registerHandler}>register</button>
	</div>
			: <Navigate to={'/login'}/>

	);
};