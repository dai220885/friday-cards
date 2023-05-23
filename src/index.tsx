import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import {Login} from 'features/Login';
import {Register} from 'features/Register';
import {Profile} from 'features/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/check-email",
    element: <h1>Check email</h1>,
  },
  {
    path: "/set-new-password",
    element: <h1>Set new password</h1>,
  },
  {
    path: "/forgot-password",
    element: <h1>Forgot password</h1>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
  {
    path: "/packs",
    element: <h1>Packs</h1>,
  },
  {
    path: "/cards",
    element: <h1>Cards</h1>,
  },
  {
    path: "/learn",
    element: <h1>Learn</h1>,
  },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
