import React, {useEffect} from 'react';
import logo from './logo.svg';
import {Counter} from 'features/counter/Counter';
import './App.css';
import {Provider} from 'react-redux';
import {store} from 'app/store';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import {Login} from 'features/login/Login';
import {Register} from 'features/register/Register';
import {Profile} from 'features/Profile';
import {createTheme, Theme} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {appActions} from 'features/App/app.slice';
import {instance} from 'app/instance';
import {LoginTest} from 'features/login/LoginTest';
import {Layout} from 'features/layout/Layout';
import {toast} from 'react-toastify';
import {ForgotPasswordForm} from 'features/auth/forgot-password/ForgotPasswordForm';

const Test = () => {
	const isLoading = useAppSelector((state) => state.app.isLoading);
	const error = useAppSelector((state) => state.app.error);
	const isAppInitialized = useAppSelector((state) => state.app.isAppInitialized);
	const user = useAppSelector((state) => state.auth.user)

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(appActions.setIsLoading({isLoading: true}));
		setTimeout(() => {
			dispatch(appActions.setIsLoading({isLoading: false}));
		}, 3000);
		instance.get('/ping')
	}, []);

	const handleErrorButtonClick = () => {
		dispatch(appActions.setError({error: 'new test error'}))
	}
	return (
		<div className="App">
			{isLoading && <h1>Loader...</h1>}
			<Counter/>
			<button onClick={handleErrorButtonClick}>create error</button>
			{!!error && <h2>{error} </h2>}
		</div>
	);
}


const router = createBrowserRouter([
	{
		path: '/friday-cards',
		element: <Navigate to="/"/>,
	},
	{
		path: '/',
		//element: <div>Hello world!</div>,
		//element: <Counter/>,
		element: <Test/>,
	},
	{
		path: '/login',
		//element: <Login/>,
		element: <LoginTest/>,
	},
	{
		path: '/register',
		element: <Register/>,
	},
	{
		path: '/check-email',
		element: <h1>Check email</h1>,
	},
	{
		path: '/set-new-password',
		element: <h1>Set new password</h1>,
	},
	{
		path: '/forgot-password',
		element: <ForgotPasswordForm/>,
	},
	{
		path: '/profile',
		element: <Profile/>,
	},
	{
		path: '/packs',
		element: <><h1>Packs</h1><button onClick={()=>{
			toast.success("test toast");
			alert('333')
		}}>+</button></>,
	},
	{
		path: '/cards',
		element: <h1>Cards</h1>,
	},
	{
		path: '/learn',
		element: <h1>Learn</h1>,
	},
]);

const theme: Theme = createTheme()

function App() {
	return (

		<Provider store={store}>
			<Layout>
				<RouterProvider router={router}/>
			</Layout>
		</Provider>

		// <div className="App">
		//   <header className="App-header">
		//     <img src={logo} className="App-logo" alt="logo"/>
		//     <Counter/>
		//     <p>
		//       Edit <code>src/App.tsx</code> and save to reload.
		//     </p>
		//     <span>
		//       <span>Learn </span>
		//       <a
		//         className="App-link"
		//         href="https://reactjs.org/"
		//         target="_blank"
		//         rel="noopener noreferrer"
		//       >
		//         React
		//       </a>
		//       <span>, </span>
		//       <a
		//         className="App-link"
		//         href="https://redux.js.org/"
		//         target="_blank"
		//         rel="noopener noreferrer"
		//       >
		//         Redux
		//       </a>
		//       <span>, </span>
		//       <a
		//         className="App-link"
		//         href="https://redux-toolkit.js.org/"
		//         target="_blank"
		//         rel="noopener noreferrer"
		//       >
		//         Redux Toolkit
		//       </a>
		//       ,<span> and </span>
		//       <a
		//         className="App-link"
		//         href="https://react-redux.js.org/"
		//         target="_blank"
		//         rel="noopener noreferrer"
		//       >
		//         React Redux
		//       </a>
		//     </span>
		//   </header>
		// </div>
	);
}

export default App;


