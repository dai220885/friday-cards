import React, {useEffect, useState} from 'react';
//import s from './register.module.css';
import s from "features/auth/styles.module.css"
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {authThunks} from 'features/auth/auth.slice';
import {Navigate, NavLink, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import {TextField} from '@mui/material';
import {Title} from "common/components/Title/Title";
import i from "common/components/Input/styles.module.css";
import eye from 'assets/img/eye.svg';
import {Footer} from 'common/components/Footer/Footer';
import Button from 'common/components/Button/Button';
import {AuthCard} from 'common/components/Card/AuthCard';

export const _Register = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate()
	const registerHandler = () => {
		dispatch(authThunks.register({email: 'dylevich220885.5@gmail.com', password: '12345678'}))
			//.unwrap()
			.then(() => {
				toast.success('you registered successfully')
				setTimeout(() => {
					navigate('/login')
				}, 500)
			})
	};

	return (
		<div className={s.container}>
			<h1>Register</h1>
			<button onClick={registerHandler}>register</button>
		</div>
	);
};




type FormDataType = {
	email: string
	password: string
	confirmPassword: string
}

export const Register = () => {

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [isPasswordInputType, setIsPasswordInputType] = useState(true)
	const {register, handleSubmit, formState: {errors}, reset, watch} = useForm<FormDataType>({
		mode: "onChange",
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: ''
		}
	})

	const password = watch("password", "")

	const onSubmit = (data: FormDataType) => {
		dispatch(authThunks.register(data))
			.unwrap() //нужен при использовании .catch()
			.then(() => {
				toast.success("You are registered successfully")
				setTimeout(() => {
					navigate("/login")
				}, 500)
			})
			.catch ((error) => {
			console.log(error)
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} action="features/auth/register/Register#" autoComplete={'off'}>
			<AuthCard id={'cards-registration'}>
				<Title title={"Sign up"}/>
				<div className={s.auth__inputGroup}>
					<div className={i.inputWrapper}>
						<TextField
							fullWidth={true}
							label={"Email"}
							variant={"standard"}
							autoComplete="off"
							placeholder={"Email"}
							className={i.input}
							{...(register("email", {
								required: "Email field is required",
								pattern: {
									value: /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9-]+.)+([a-zA-Z]{2,})$/,
									message: 'Enter valid email address',
								},
								minLength: 7
							}))}
							type="email"
						/>
						{errors.email && <span className={i.error}>{errors.email.message}</span>}
					</div>

					<div className={i.inputWrapper}>
						<TextField
							fullWidth={true}
							label={"Password"}
							variant={"standard"}
							autoComplete="off"
							placeholder={"Password"}
							className={i.input}
							{...(register("password", {
								required: "Password field is required",
								pattern: {
									value: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
									message: 'Please, enter symbols, numbers and latin letters',
								},
								minLength: {
									value: 8,
									message: "Password is too short, min length is 8 symbols"
								}
							}))}
							type={isPasswordInputType ? "password" : "text"}
						/>
						<div className={i.eyeWrapper}>
							<img
								src={eye}
								alt="password hidden img"
								className={i.eye}
								onClick={() => setIsPasswordInputType(!isPasswordInputType)}
							/>
							{isPasswordInputType && <hr className={i.hr}/>}
						</div>
						{errors.password && <span className={i.error}>{errors.password.message}</span>}
					</div>

					<div className={i.inputWrapper}>
						<TextField
							fullWidth={true}
							label={"Confirm password"}
							variant={"standard"}
							autoComplete="off"
							placeholder={"Confirm password"}
							className={i.input}
							{...(register("confirmPassword", {
								required: "Confirm password field is required",
								validate: {
									value: (value: string) => value === password || "Passwords do not match"
								},
								minLength: 8
							}))}
							type={isPasswordInputType ? "password" : "text"}
						/>
						<div className={i.eyeWrapper}>
							<img
								src={eye}
								alt="password hidden img"
								className={i.eye}
								onClick={() => setIsPasswordInputType(!isPasswordInputType)}
							/>
							{isPasswordInputType && <hr className={i.hr}/>}
						</div>
						{errors.confirmPassword && <span className={i.error}>{errors.confirmPassword.message}</span>}
					</div>
				</div>

				<Footer>
					<Button name={"Sign up"} xType={"default"}/>
					<p className={s.auth__alreadyHaveAcc}>Already have an account?</p>
					<NavLink to={"/login"}>
						<p className={s.auth__redirect}>Sign in</p>
					</NavLink>
				</Footer>
			</AuthCard>
		</form>
	)
}