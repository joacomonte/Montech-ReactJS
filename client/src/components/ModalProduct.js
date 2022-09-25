import React from "react";
import ReactDom from "react-dom";

const ModalProduct = ({clickedImg, setClickedImg}) => {

    const handleClick = (e) => {
        console.log(e)
        if(e.target.classList.contains("dismiss") 
        || e.target.classList.contains("img-dismiss")
        || e.target.classList.contains("dismiss-inside")
        
        ) {
            setClickedImg(null);
        }
    };
    
    return ReactDom.createPortal (
        <>
            <div className="dismiss" onClick={handleClick}>
                <div className="dismiss-inside">
                    <img className="img-dismiss" src={require(`../images/${clickedImg}`)} alt={`${clickedImg}`} />
                </div>
            </div> 
        </>,
        document.getElementById("portal")
    )
};

export default ModalProduct;