import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login/Login'
import Dashboard from "./Components/Dashboard/Dashboard";
import Users from "./Components/Dashboard/User";
import axios from "axios";

const ProtectedRoute=( { children } ) =>
{
  const token=localStorage.getItem( "access_token" )
  if ( !token )
  {
    return <Navigate to="/login" replace />
  }
  return children
};

axios.interceptors.request.use(
  ( config ) =>
  {
    const token=localStorage.getItem( "access_token" )
    if ( token )
    {
      config.headers[ 'Authorization' ]='Bearer '+token
    }
    return config
  },
  ( error ) =>
  {
    return Promise.reject( error )
  }
)

export default function App ()
{
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/login" element={< Login />}></Route>
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route exact path="/users" element={< Users />}></Route>
          <Route exact path="/orders" element={<ProtectedRoute><h1>Welcome To Order Page</h1></ProtectedRoute>}></Route>
        </Routes>
      </Router>
    </>
  );
}

