import React, {useContext } from "react";
// import data from "../data";
import WishList from "./WishList.js";
import { DataContext } from "../pages/Home";




export default function Section2(){
    
    // const [productsArray, setProductsArray] = React.useState(data)
    // const { updateData } = useContext(DataContext);

    const { data } = useContext(DataContext);


    let count = 0;
    const itemMapped = data.map(item =>{
        if(item.isFav){
            count = count+1;
            return(
                <li key={item.id}> {item.title} </li>
            )
        }
        return null;
    })
    
    return(
        <div className="section2-area">
            <div className="favList-container">
                <WishList />
            </div>
            <div className="favList-container">
                <h2>Productos Favoritos</h2>
                <ul>
                    {count === 0 && <li style={{color: "grey"}} > no items in favs </li>}
                    {itemMapped}
                </ul>
        </div>
        </div>
        
    )
}