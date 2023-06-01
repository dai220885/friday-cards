import React, {useState} from 'react'
import {Title} from 'common/components/Title/Title'
import s from 'features/auth/styles.module.css'
import {Footer} from 'common/components/Footer/Footer'
import Button from 'common/components/Button/Button'
import {Navigate, NavLink} from 'react-router-dom'
import i from 'common/components/Input/styles.module.css'
import {TextField} from '@mui/material'
import {SubmitHandler, useForm} from 'react-hook-form'
import {authThunks} from 'features/auth/auth.slice'
import {useAppDispatch} from 'app/hooks';
import {AuthCard} from 'common/components/Card/AuthCard';


type FormDataType = {
	email: string
	from?: string
	message: string
}

export const ForgotPasswordForm = () => {

	const dispatch = useAppDispatch()
	const [sentSuccess, setSentSuccess] = useState(false)
	const {register, handleSubmit, formState: {errors}, reset} = useForm<FormDataType>({
		mode: 'onChange',
		defaultValues: {
			email: '',
			from: '',
			message:`<div style="background-color: lime; padding: 15px">password recovery link:<a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
		}
	})

	const onSubmit: SubmitHandler<FormDataType> = (data) => {
		setSentSuccess(true)
		dispatch(authThunks.forgotPassword(data))
		reset()
	}

	if (sentSuccess) return <Navigate to={'/check-email'}/>

	return (
		<form onSubmit={handleSubmit(onSubmit)} action="#">
			<AuthCard id={'cards-forgot-password'}>
				<Title title={'Forgot your password'}/>
				<div className={s.auth__inputGroup}>
					<div className={i.inputWrapper}>
						<TextField
							fullWidth={true}
							label={'Email'}
							variant={'standard'}
							autoComplete={'off'}
							placeholder={'Email'}
							className={i.input}
							{...(register('email', {
								required: 'Email field is required',
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
				</div>
				<p className={s.auth__alreadyHaveAcc} style={{marginTop: '18px'}}>
					Enter your email address and we will send you further instructions
				</p>
				<Footer>
					<Button name={'Send Instructions'} xType={'default'}/>
					<p className={s.auth__alreadyHaveAcc}>Did you remember your password?</p>
					<NavLink to={'/login'}>
						<p className={s.auth__redirect}>Try logging in</p>
					</NavLink>
				</Footer>
			</AuthCard>
		</form>
	)
}