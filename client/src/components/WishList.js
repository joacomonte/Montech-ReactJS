import React, { useReducer, useState } from "react";
import WishItem from "./WishItem.js";



export const ACTIONS = {
    ADD_ITEM: 'add-item',
    REMOVE_ITEM: 'remove-item'
}

function reducerFunction(itemsList,action){
    switch (action.type){
        case ACTIONS.ADD_ITEM:
            return[...itemsList, newItem(action.payload.itemName)]
        case ACTIONS.REMOVE_ITEM:
            return itemsList.filter(item => item.id !== action.payload.id)
        default:
            return itemsList
    }
}


function newItem(itemName){
    return {id: Date.now(), name:itemName}
}



function WishList(){
    
    const[itemsList, dispatch] = useReducer(reducerFunction, [])

    const[nameInputed, setName] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        dispatch({type: ACTIONS.ADD_ITEM, payload: {itemName: nameInputed}})
        setName('')
    }

    const itemsMapped = itemsList.map(item => {
        return(
            <WishItem 
                key={item.id} 
                item={item}
                dispatch={dispatch}
            />
        )
    })

        return(
            <div className="wishList-container">
                    <div className="wishList-title">
                        Wish List
                    </div>
                    <div className="wishList-list">
                        {itemsMapped}
                        <div className="wishList-input">
                            <form  onSubmit={handleSubmit}>
                                <input 
                                type= "text" 
                                placeholder="New item here" 
                                value={nameInputed} 
                                onChange={e => setName (e.target.value)} />
                            </form> 
                        </div>
                    </div>
            </div>
        );
}

export default WishList;