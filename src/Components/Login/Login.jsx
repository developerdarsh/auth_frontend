import React, { useEffect, useState } from "react";
import "./style.css";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function Login ()
{

  const [ showPassword, setShowPassword ]=useState( false );
  const navigate=useNavigate()
  const token=localStorage.getItem( "access_token" )

  const handleClickShowPassword=() => setShowPassword( ( show ) => !show );

  const handleMouseDownPassword=( event ) =>
  {
    event.preventDefault();
  };


  // User login api function

  const submitHandler=( data ) =>
  {
    axios.post( "https://auth-eight-iota.vercel.app/api/login", {
      email: data.email,
      password: data.password,
    } ).then( async ( response ) =>
    {
      localStorage.setItem( "access_token", response.data.access_token )
      localStorage.setItem( "refresh_token", response.data.refresh_token )
      await navigate( '/' )
    } ).catch( ( error ) =>
    {
      localStorage.clear()
      toast.error( error.response.data.message );
    } )
  }


  // validation function

  const validationSchema=Yup.object( {
    email: Yup.string().email( 'Invalid email address' ).required( 'Required' ),
    password: Yup.string().min( 8, 'Must be 8 characters or more' ).required( 'Required' ),
  } )

  // Validation initial Values

  const initialValues={
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm_password: '',
  }

  const formik=useFormik( {
    initialValues,
    validationSchema,
    onSubmit: submitHandler
  } );

  useEffect( () =>
  {
    if ( token )
    {
      navigate( "/" )
    }
  }, [] )

  // Navigate users when without auth

  const Navigation=() =>
  {
    navigate( "/users" );
  }

  return (
    <>
      <div className="session">
        <div className="left">
          <svg
            enableBackground="new 0 0 300 302.5"
            version="1.1"
            viewBox="0 0 300 302.5"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <style
              type="text/css"
              dangerouslySetInnerHTML={{ __html: "\n\t.st01{fill:#fff;}\n" }}
            />
            <path
              className="st01"
              d="m126 302.2c-2.3 0.7-5.7 0.2-7.7-1.2l-105-71.6c-2-1.3-3.7-4.4-3.9-6.7l-9.4-126.7c-0.2-2.4 1.1-5.6 2.8-7.2l93.2-86.4c1.7-1.6 5.1-2.6 7.4-2.3l125.6 18.9c2.3 0.4 5.2 2.3 6.4 4.4l63.5 110.1c1.2 2 1.4 5.5 0.6 7.7l-46.4 118.3c-0.9 2.2-3.4 4.6-5.7 5.3l-121.4 37.4zm63.4-102.7c2.3-0.7 4.8-3.1 5.7-5.3l19.9-50.8c0.9-2.2 0.6-5.7-0.6-7.7l-27.3-47.3c-1.2-2-4.1-4-6.4-4.4l-53.9-8c-2.3-0.4-5.7 0.7-7.4 2.3l-40 37.1c-1.7 1.6-3 4.9-2.8 7.2l4.1 54.4c0.2 2.4 1.9 5.4 3.9 6.7l45.1 30.8c2 1.3 5.4 1.9 7.7 1.2l52-16.2z"
            />
          </svg>
          {/* <img src={computer} alt="computer" /> */}
        </div>
        <form onSubmit={formik.handleSubmit} className="log-in" autoComplete="off">
          <div className="withoutauthbtn">
            <Button onClick={Navigation} variant="outlined">Without Auth</Button>
          </div>
          <p className="login-text">Welcome back! <br /> Log in to your account :</p>
          <FormControl fullWidth margin="normal" variant="outlined">
            <TextField
              fullWidth
              type="email"
              name="email"
              id="margin-normal"
              margin="normal"
              label="Email"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email&&formik.errors.email? (
              <div className="error">{formik.errors.email}</div>
            ):null}
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              type={showPassword? 'text':'password'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword? <VisibilityOff />:<Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {formik.touched.password&&formik.errors.password? (
              <div className="error">{formik.errors.password}</div>
            ):null}
          </FormControl>
          <button type="submit" className="login-btn">
            Log in
          </button>
        </form>
      </div >
    </>
  );
}
