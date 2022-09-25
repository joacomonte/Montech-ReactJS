import React, { useState } from 'react'
import './StarRatingStyle.css'
import { FaStar } from 'react-icons/fa'

function StarRating(props,key) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);


    const clickFunc = (argRating) =>
    {
        setRating(argRating);
        props.handleFunc(argRating);
    }

  return (
    <div>
        { [...Array(5)].map((star, i) => {
            const ratingValue = i+1;
            return(
                <label key={i}>
                    <input 
                        type='radio' 
                        name='rating' 
                        value={ratingValue} 
                        onClick={ () => clickFunc(ratingValue)}
                    />
                    <FaStar
                        className='starComponent' 
                        color={ratingValue <= (rating || hover) ? 'yellow' : 'grey'} 
                        size={20}
                        onMouseEnter={ () => setHover(ratingValue) }
                        onMouseLeave={ () => setHover(null) }
                    /> 
                </label>
            )
        })}
    </div>
  )
}

export default StarRating
