import React, {useContext} from 'react'

import wordlePNG from '../images/wordlePNG.png';
import mLogo from "../images/m-logo.png"

// components
import Products from "../components/Products";

import TransitionImg from "../components/TransitionImg.js";
import Section2 from "../components/Section2.js";
import Footer from '../components/Footer';


import dataProducts from '../data-products';
import { AuthContext } from '../helpers/AuthContext'


import { useState, createContext} from "react";


export const DataContext = createContext();




function Home() {

    const {authState} = useContext(AuthContext);

    const [data, updateData] = useState(dataProducts);

    return(
    <>
        <div className='homePage-container'>
            <div className="main-container">
                {(authState.status) && <div style={{position:'absolute', top:'50px'}} className="montechLetras">hola {authState.username}!</div>}
                <img className="main-image" src={mLogo} alt="hola"></img>
            </div>

            <DataContext.Provider value={{data,updateData}}>
                <Products/>
            </DataContext.Provider>

                <TransitionImg/>

            <DataContext.Provider value={{data,updateData}}>
                <Section2/>
            </DataContext.Provider>
            
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginTop:'50px' }}>

                <h1 style={{color:'black', padding:'40px'}}>Uno de mis proyectos</h1>
                <div className='wordle-container' style={{borderWidth:'2px', borderStyle:'solid', borderColor:'lightGrey', padding:'10px', marginBottom:'50px', borderRadius:'15px'}}>
                    <a href="https://wordle-montech.netlify.app">
                        <img className="wordle-image" src={wordlePNG} alt="hola"></img>
                    </a>
                </div>


            </div>

        </div>

        <Footer/>

    </>

    )
}

export default Home;

   


