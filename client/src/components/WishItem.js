import React from 'react'
import { ACTIONS } from './WishList.js'

export default function WishItem({item, dispatch}) {
  return (
    <div className="wishList-item">
        {item.name}
        <button 
        onClick={ () => dispatch (
          { 
            type: ACTIONS.REMOVE_ITEM,
            payload: {id: item.id} 
          })
          }>
            Delete
        </button>
    </div>  
  )
}
