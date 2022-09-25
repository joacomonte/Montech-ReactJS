import React from "react";

import { Link } from "react-router-dom";


export default function Footer(){
    return(
        <footer className="footer--main">
                <Link to="/">
                    <div className="montechLetras">MONTECH</div>
                </Link>
            <div className="nav-div-logo">
            </div>
            <div>
                <ul className="footer--links">
                    <li><a href="/#"> Mail </a></li>
                    <li><a href="/#"> Locales </a></li>
                </ul>
            </div>
         </footer>
    )
}