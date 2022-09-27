import React from "react"
import App from "./App"
import "./style.css"
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";



const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
        <App tab="home" />  
    </BrowserRouter>
);


