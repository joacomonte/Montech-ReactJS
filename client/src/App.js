// http://192.168.0.128:3000

import React, { useEffect } from "react";
import  { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import OpinionsPage from "./pages/OpinionsPage"
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration"
import Opinion from "./pages/Opinion";
import PageNotFound from "./pages/PageNotFound";

import {AuthContext} from "./helpers/AuthContext"
import {useState} from "react";
import axios from "axios";


function App(){
    const[authState, setAuthState] = useState({username:"", id: 0, status: false});

    useEffect( () => {
            axios.get('http://192.168.0.128:3001/auth/token',
            {headers:{accessToken: localStorage.getItem("accessToken")}}
            ).then( (res) => {
                    if (res.data.error) { setAuthState( {...authState, status:false} )} //destruct the obj and only change the status
                    else {setAuthState({username:res.data.username, id: res.data.id, status: true})}
            })
    },[]);



    return(
        <>
        <AuthContext.Provider value={{authState, setAuthState}}>
        <Navbar />
        
        <div className="pageContainer-monte1">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/opinions-page" element={<OpinionsPage />} />
                <Route path="/post/:id" element={<Opinion/>} />
                <Route path="/registration-page" element={<Registration/>} />
                <Route path="/login-page" element={<Login/>} />
                <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </div>

        </AuthContext.Provider>
        </>
    )
}
export default App;