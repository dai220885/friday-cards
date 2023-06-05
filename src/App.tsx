import React, {useEffect} from 'react';
import logo from './logo.svg';
import {Counter} from 'features/counter/Counter';
import './App.css';
import {Provider} from 'react-redux';
import {store} from 'app/store';
import {createBrowserRouter, Navigate, Outlet, RouterProvider, useNavigate} from 'react-router-dom';
import {Login} from 'features/auth/login/Login';
import {Register} from 'features/auth/register/Register';

import {createTheme, LinearProgress, Theme, ThemeProvider} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {appActions} from 'features/App/app.slice';
import {instance} from 'app/instance';
import {LoginTest} from 'features/auth/login/LoginTest';
import {Layout} from 'features/layout/Layout';
import {toast, ToastContainer} from 'react-toastify';
import {ForgotPasswordForm} from 'features/auth/forgot-password/ForgotPasswordForm';
import 'react-toastify/dist/ReactToastify.css'
import {BackLink} from 'common/components/BackLink/BackLink';
import {Profile} from 'features/auth/profile/Profile';
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
		}, 1000);
		instance.get('/ping')
	}, []);

	const handleErrorButtonClick = () => {
		dispatch(appActions.setError({error: 'new test error'}))
		toast.error('new test error')
	}
	return (
		<div className="App">
			{/*{isLoading && <h1>Loader...</h1>}*/}
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
		element: <ProtectedRoute />,
		children: [
			{
				element: <div>protected</div>,
			},
		],
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
		element: <><h1>Packs</h1>
			<button onClick={() => {
				toast.success('test toast');
				alert('333')
			}}>+
			</button>
		</>,
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
	const isLoading = useAppSelector((state) => state.app.isLoading)

	return (
		<ThemeProvider theme={theme}>
			 {/*<Provider store={store}>*/}
			<ToastContainer
				position="top-right"
				autoClose={1000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			{isLoading && <LinearProgress/>}

			{/* Same as */}
			{/*<ToastContainer />*/}
			{/*<Layout>*/}
				<RouterProvider router={router}/>
			{/*</Layout>*/}
			{/*</Provider>*/}


		</ThemeProvider>



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

function ProtectedRoute () {
	const isAuthed = useAppSelector((state) => state.auth.isAuthed)
	const navigate = useNavigate()

	useEffect( () => {
		//2. когда компонента вмонтирована, но ничего не отрисованож, проверяем isAuthed (пока не авторизовались, будет null и отработает return
		if (isAuthed === null) return
		//3. когда в isAuthed что-то попадет (true/false), useEffect сработает снова и выполнит navigate('/')
		// (если isAuthed false) или вернет <Outlet/> (если isAuthed true)
		if (!isAuthed) navigate('/')
	}, [isAuthed, navigate])
	//1. попадем сюда перед отработкой юзэффекта,
	if (!isAuthed) return null //тут можно отобразить лоадер
	//4.
	return <Outlet/>
}



export default App;


