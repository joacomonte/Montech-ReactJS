import React,{useContext} from 'react';

import { ErrorMessage, Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import "./LoginStyle.css"
import axios from 'axios';

import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../../helpers/AuthContext'
import Footer from '../../components/Footer'




function Login() {

    const {authState, setAuthState} = useContext(AuthContext);

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


    const onSubmit = (argData) =>{
      const data = {username: argData.username, password: argData.password}
        axios.post("http://192.168.0.128:3001/auth/login", data).then((res)=>{
            if(res.data.error) { alert(res.data.error); }
            else 
            {
                localStorage.setItem("accessToken", res.data.token);
                setAuthState( {username: res.data.username, id: res.data.id, status:true} );
                navigate('/') ;
            };
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
                    Log in
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
                        Log in!
                    </button>
                </div>

            </Form>



            </Formik>
            <Footer/>

        </div>

        

    );
  }
  
  export default Login;