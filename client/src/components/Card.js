import React from "react"
import starON from "../images/star-black-on.png"
import starOFF from "../images/star-black-off.png"

import { useState } from "react"

import ModalProduct from "./ModalProduct"

export default function Card(props){

    let buyButton = props.stock ? "COMPRAR" : "SIN STOCK"

    let starIcon = props.isFav ? starON : starOFF

    const [imageToModal, setImageToModal ] = useState(null)

    const handleClick = (img) => {
        setImageToModal(img)
    };


    return(
        <>

        <div className="card-container">
            <div className="imgBackground" >
            </div>
                <img 
                src={require(`../images/${props.productImg}`)} 
                alt="imagen"
                
                />
            <div className="card-content" onClick={() => handleClick(props.productImg)} >
                <h3>{props.title}</h3>
                <img className="star" 
                src={starIcon} 
                onClickCapture={props.toggleFav} 
                onClick={(e)=>{e.stopPropagation()}}
                alt="fav-star-icon"/>
                <h4>{props.color}</h4>
                <button className="buttonStyle-card" onClick={(e) => {e.stopPropagation()}} >{buyButton}</button>
            </div>

            <div>
                {imageToModal && (
                        <ModalProduct clickedImg={imageToModal} setClickedImg={setImageToModal}/>
                    )}
            </div>



        </div>
        </>
    );
}