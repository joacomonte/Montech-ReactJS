import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import OpinionItem from '../components/OpinionItem/OpinionItem.js'
import OpinionWithComments from '../components/OpinionWithComments/OpinionWithComments.js';


function Opinion() 
{

    let {id} = useParams(); // returns an object of key/value pairs of URL parameters

    const[postObj, setPostObj] = useState({});

    const [commentsList, setCommentsList] = useState([])

    const [newComment, setNewCommement] = useState("");

    const [refresh, setRefresh] = useState(true);





    //puts comments into a list



    useEffect( () => {

      axios.get(`http://192.168.0.128:3001/posts/byId/${id}`)
        .then( (res) => { 
          setPostObj(res.data)
        });

      axios.get(`http://192.168.0.128:3001/comments/${id}`)
        .then( (res) => { 
          setCommentsList(res.data);
        });
    },[refresh]); // to refresh the component after send new comment


    const refreshFunc = () =>{
      setRefresh(!refresh);
    }


  return (
          <div className='opinionPage-content'>

            <OpinionWithComments 
              key={id} 
              comment={commentsList} 
              refreshFuncProp={refreshFunc} 
              {...postObj}/>


          </div>

  )
}

export default Opinion