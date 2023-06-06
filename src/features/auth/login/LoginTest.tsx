import {authThunks} from "features/auth/auth.slice"
import s from "features/auth/styles.module.css"
import React, {useState} from "react"
import {AuthCard} from "common/components/Card/AuthCard"
import {Title} from "common/components/Title/Title"
import {NavLink, useNavigate} from "react-router-dom"
import {Footer} from "common/components/Footer/Footer"
import Button from "common/components/Button/Button"
import {SubmitHandler, useForm} from "react-hook-form"
import i from "common/components/Input/styles.module.css"
import c from "common/components/Checkbox/styles.module.css"
import {TextField} from "@mui/material"
import eye from 'assets/img/eye.svg'
import {toast} from "react-toastify"
//import {AppPreloader} from "common/components/AppPreloader/AppPreloader"
import {useAppDispatch} from 'app/hooks';


type FormDataType = {
	email: string
	password: string
	rememberMe: boolean
}

export const LoginTest = () => {

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [isPasswordHidden, setIsPasswordHidden] = useState(true)
	const {register, handleSubmit, formState: {errors}} = useForm<FormDataType>({
		mode: "onChange",
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false
		}
	})

	const onSubmit: SubmitHandler<FormDataType> = (data) => {
		dispatch(authThunks.login(data))
			.unwrap()
			.then(() => {
				toast.success("You are logged in successfully")
				setTimeout(() => {
					//пока временно редиректим на profile, нужно изменить на /packs
					navigate("/packs")
				}, 500)
			}).catch((err) => {
				//debugger
			//toast.error("login error")
			console.log(err)
		})
	}


	return (
		<form onSubmit={handleSubmit(onSubmit)} action="features/auth/login/LoginTest#" autoComplete={'off'}>
			<AuthCard id={'cards-Login'}>
				<Title title={"Sign in"}/>
				{/*<button onClick={()=>toast.error("test toast")}>+</button>*/}
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
									value: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{}':"\\|,.<>/?]*$/,
									message: 'Enter valid password',
								},
								minLength: 8
							}))}
							type={isPasswordHidden ? "password" : "text"}
						/>
						<div className={i.eyeWrapper}>
							<img
								src={eye}
								alt="password hidden img"
								className={i.eye}
								onClick={() => setIsPasswordHidden(!isPasswordHidden)}
							/>
							{isPasswordHidden && <hr className={i.hr}/>}
						</div>
						{errors.password && <span className={i.error}>{errors.password.message}</span>}
					</div>
				</div>

				<div className={s.auth__rememberMe}>
					<div style={{display: "flex", gap: "12px"}}>
						<input
							className={c.checkbox}
							{...(register("rememberMe"))}
							type="checkbox"
						/>
						<span className={s.auth__label}>Remember me</span>
					</div>
				</div>
				<div className={s.auth__forgotPasswordWrapper}>
					<NavLink to={"/forgot-password"}>
						<p className={s.auth__label}>Forgot password?</p>
					</NavLink>
				</div>
				<Footer>
					<Button type={"submit"} name={"Sign in"} xType={"default"}/>
					<p className={s.auth__alreadyHaveAcc}>Not registered yet?</p>
					<NavLink to={"/register"}>
						<p className={s.auth__redirect}>Sign up</p>
					</NavLink>
				</Footer>
			</AuthCard>
		</form>
	)
}