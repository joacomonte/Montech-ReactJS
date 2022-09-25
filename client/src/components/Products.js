import React, { useContext, useState } from "react";


import Card from "./Card.js";
import Weather from "./Weather";

import { DataContext } from "../pages/Home";






export default function Products(){


    const { data } = useContext(DataContext);

    const { updateData } = useContext(DataContext);

    const [toggleState, setToggleState] = useState("")

    const [colorState, colorUpdate] = useState("")

    function colorFunction(color){
        colorUpdate(prevState => prevState = color)
        setToggleState(prevState => prevState = color)
    };




    function toggleFavorite(id){
        updateData(prevState =>{
            return prevState.map((item)=>{
                return item.id === id ? {...item, isFav: !item.isFav} : item
            })
        })
    }


    const cardMapped = data.map(item => {
        if(colorState===""){
            return(
                <Card 
                    key={item.id}
                    {...item} // id,title,color,img,stock,isFav
                    toggleFav = {() => toggleFavorite(item.id)}
                />
            )
        }else{
            return(
                item.color === colorState && <Card 
                    key={item.id}
                    {...item} // id,title,color,img,stock,isFav
                    toggleFav = {() => toggleFavorite(item.id)}
  
                />
            )
        }
    })


    return(


        <div className="productsSection-container">


                <div className="productsSection-title" >Productos</div>


                <div className="productsSection-filterButtons-container" >
                    <button className={toggleState === "" ? "products-filtersButtonActive" : "products-filtersButton"} onClick={() => colorFunction("")} >Mostrar todo</button>
                    <button className={toggleState === "black" ? "products-filtersButtonActive" : "products-filtersButton"} onClick={() => colorFunction("black")}>Productos negros</button>
                    <button className={toggleState === "white" ? "products-filtersButtonActive" : "products-filtersButton"} onClick={() => colorFunction("white")}>Productos Blancos</button>
                </div>

                <div className="productsSection-cardsContainer">
                    {cardMapped}
                </div>

                <div>
                    <Weather/>
                </div>

        </div>

    )
    
}



