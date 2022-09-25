import React from 'react';

import Footer from '../../components/Footer'

import { ErrorMessage, Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import "./RegistrationStyle.css"
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


function Registration() {

    let navigate = useNavigate();

    const initialValues = 
    {
        username: "",
        password: ""
    }


    const validationSchema = Yup.object().shape(
        {
            username: Yup.string().min(4).max(20).required("Debes introducir un usuario"),
            password: Yup.string().min(4).max(20).required("minimo 4 caracteres")
        }
    )


    const onSubmit = (data) =>{
        axios.post("http://192.168.0.128:3001/auth", data).then((res)=>{
            if(res.data.error) { alert(res.data.error); }
            else {
                alert (`El registro fue todo un exito ${data.username}!`);
                navigate('/login-page') ;
            }

        })
    };


    return (
        <div className='registration-page'>
            
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>

                <Form className="registration-formContainer">
                    <div className='title'>
                        Sign Up
                    </div>


                    <div className='username-div'>
                        <ErrorMessage className='errorMsj' name="username" component="span"/>
                        <Field className="username-field"
                            autoComplete="off"
                            id="inputUsername"
                            name="username"
                            placeholder="Usuario">
                        </Field>
                    </div>



                    <div className='password-div'>

                        <ErrorMessage className='errorMsj' name="password" component="span"/>
                        <Field className="password-field"
                            autoComplete="off"
                            type="password"
                            id="inputPassword"
                            name="password"
                            placeholder="Contraseña">
                        </Field>
                    </div>


                    <div className='Singup-buttonContainer'>
                        <button className='Singup-button' type='submit'>
                            Sign Up!
                        </button>
                    </div>

                </Form>



            </Formik>
            <Footer/>

        </div>
    );
  }
  
  export default Registration;