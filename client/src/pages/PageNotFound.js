import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div>


        <h2 style={{color:'black', display:'flex', justifyContent:'center', marginTop:'50px' }} >
            Page not Found! Try this link:&nbsp; <Link to="/" style={{color:'red'}}> HomePage </Link>
        </h2>
    </div>

  )
}

export default PageNotFound

