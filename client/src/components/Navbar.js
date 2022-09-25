import React, {useContext} from "react";
import { AuthContext } from "../helpers/AuthContext";

import { Link } from "react-router-dom";

import '../style.css';




export default function Navbar(){

    const {authState, setAuthState} = useContext(AuthContext);




    const logout = () =>{
        localStorage.removeItem("accessToken");
        setAuthState( {username:"", id:0, status:false} );
    }



    return(
        <header className="header-container">

            <div className="montechLetras-container">
                <Link to="/">
                    <div className="montechLetras">MONTECH</div>
                </Link>
            </div>

         

            <div className="headerLinks-container">
                <a href="https://wordle-montech.netlify.app">
                    <button className="buttonStyle-white">
                        Wordle Game
                    </button>
                    </a>

                <Link to="/opinions-page"> 
                        <button className="buttonStyle-white">
                            Comment Here!
                        </button>
                </Link>


                {!authState.status ? (<>
                    <Link to="/login-page"> 
                            <button className="buttonStyle-white">
                                Login
                            </button>
                    </Link>
                    <Link to="/registration-page"> 
                            <button className="buttonStyle-white">
                                Sign Up
                            </button>
                    </Link>
                </>) : (
                    <button className="buttonStyle-white" onClick={logout}>
                            Logout
                    </button>
                )}


            </div>
         </header>
    )
}