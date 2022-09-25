import React from 'react'
import { useState, useEffect, useContext } from "react";
import Footer from '../components/Footer'
import OpinionItem from '../components/OpinionItem/OpinionItem';

import axios from 'axios';

import { ErrorMessage, Form, Field, Formik } from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '../helpers/AuthContext'
import "./OpinionsPageStyle.css"
import StarRating from '../components/StarRating/StarRating';

import perrito from "../images/doggy.png"
import covito from '../images/covito.png'





function OpinionsPage() {

  const {authState} = useContext(AuthContext);

  const[opinionsList, setOpinionsList] = useState([]);
  
  const[opinion, setOpinion] = useState("");

  const[refresh, setRefresh] = useState(true);

  const[rating, setRating] = useState(0);

  const[reverseList, setReverseList] = useState(true);


  const initialValues = 
    {
      username: authState.username,
      opinion: "",
    }

    const validationSchema = Yup.object().shape(
      {opinion: Yup.string().min(4).required("minimo 4 caracteres")}
    )


  useEffect( () => {
    axios.get("http://192.168.0.128:3001/posts")
      .then( (res) => { 
        setOpinionsList(res.data)
      });
  }, [refresh])




  function checkAndSubmitOpinion(){
    setOpinion("");
    if (!authState.status) {return alert("necesitas loguearte")}
    const obj = { userName: authState.username, opinion:opinion }
    postData(obj);
  }


  function postData(dataToSubtmit){
    axios.post("http://192.168.0.128:3001/posts",
    dataToSubtmit,
    {headers: {accessToken: localStorage.getItem('accessToken')}} )
      .then( (response) => {
        console.log('pareciera que funciona');
        setTimeout(setRefresh(!refresh),200)
      })
  }
  

 

  return (
<>
      <div className='opinionsPage-layout'> 
        <div className='formContainer'>
          <div className='formBox'>
            <div className='layoutSyle'>
              <div className='pictureSide'>
                {rating !==1 ? <img className='formPicture' src={perrito} alt="hola" ></img> : <img className='formPicture' src={covito} alt="hola" ></img>}
                <div className='pawButton'>
                  <div className='pawImg' onClick={checkAndSubmitOpinion} ></div>
                  <label style={{fontSize:'11px', color:'white'}}>Enviar</label>
                </div>
              </div>
              <div className='formSide'>
                <h2> Hacé feliz al perrito dejando un comentario </h2>
                <div className='stars'>
                  <StarRating key={Math.floor(Math.random(100))} handleFunc={(a)=>setRating(a)}/>
                </div>
                <div className='opinionBox'>
                  <Formik 
                    initialValues={initialValues} 
                    onSubmit={postData} 
                    validationSchema={validationSchema}>
                    <Form className='form'>
                      <Field 
                        as='textarea' 
                        className="opinion-field"
                        autoComplete="off"
                        id="description"
                        name="opinion"
                        placeholder='Ej: Esta pagina esta god'
                        value={opinion}
                        onChange={(e) => setOpinion(e.target.value)}>
                      </Field>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className='opinions-area'>
            <div className='opinions-content'>
              <h1 className='opinions-title'>Lista de Comentarios</h1>
              <label 
                onClick={ () => setReverseList(!reverseList)} 
                style={{cursor:'pointer', marginTop:'30px', height:'40px', width:'220px', backgroundColor:'#FEDA2D', color:'black', borderRadius:'10px', display:'grid', justifyContent:'center', alignContent:'center'}}> 
                {!reverseList ? 'Ordenar por mas recientes' : 'Ordenar por mas viejos' }
              </label>
              <div className='opinions-conatiner'>
              {reverseList ? opinionsList.slice(0).reverse().map( (value, index) =>{ 
                return (<OpinionItem 
                          key={index} 
                          id={value.id} 
                          authUsername={authState.username}
                          handleFunc={() => setRefresh(!refresh)}
                          {...value}/>)
                  }): opinionsList.map( (value, index) =>{ 
                return (<OpinionItem 
                          key={index} 
                          id={value.id} 
                          authUsername={authState.username}
                          handleFunc={() => setRefresh(!refresh)}
                          {...value}/>)
                })}
              </div>
            </div>
          </div>
      </div>
      <Footer/>
      </>
  )
}

export default OpinionsPage;