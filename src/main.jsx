import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './index.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './scenes/AuthLayout.jsx';
import Signup from './pages/Signup.jsx';
import Allposts from './pages/Allposts.jsx';
import Addpost from './pages/Addpost.jsx';
import Editpost from './pages/Editpost.jsx';
import Post from './pages/Post.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <h1>404</h1>,
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
        errorElement: <h1>404</h1>,
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
        errorElement: <h1>404</h1>,
      },
      {
        path: '/allposts',
        element: (
          <AuthLayout authentication={true}>
            <Allposts />
          </AuthLayout>
        ),
        errorElement: <h1>404</h1>,
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication={true}>
            <Addpost />
          </AuthLayout>
        ),
        errorElement: <h1>404</h1>,
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication={true}>
            <Editpost />
          </AuthLayout>
        ),
        errorElement: <h1>404</h1>,
      },
      {
        path: '/allposts',
        element: (
          <AuthLayout authentication={true}>
            <Allposts />
          </AuthLayout>
        ),
        errorElement: <h1>404</h1>,
      },
      {
        path: '/post/:slug',
        element: (
          <AuthLayout authentication={true}>
            <Post />
          </AuthLayout>
        ),
        errorElement: <h1>404</h1>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
