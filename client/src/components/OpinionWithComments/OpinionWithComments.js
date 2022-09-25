import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import './OpinionWithCommentsStyle.css'
import { AuthContext } from '../../helpers/AuthContext'
import axios from 'axios';

function OpinionWithComments(props) {


  let {id} = useParams(); // returns an object of key/value pairs of URL parameters

  const [commentsList, setCommentsList] = useState([])
  const [newComment, setNewCommement] = useState("");
  const [refresh, setRefresh] = useState(true);

  const {authState} = useContext(AuthContext);



  useEffect( () => {


    axios.get(`http://192.168.0.128:3001/comments/${id}`)
      .then( (res) => { 
        setCommentsList(res.data);
      });
  },[refresh]); // to refresh the component after send new comment


  const deleteCommentFunc = (id) =>{
    axios.delete(`http://192.168.0.128:3001/comments/${id}`,
        {headers: {accessToken: localStorage.getItem("accessToken")}}
        ).then(setTimeout(() => 
        {
             props.refreshFuncProp()
            }, 100));
      ;
  }



  const addComment = () => {
    axios.post("http://192.168.0.128:3001/comments/", 
      {
        commentBody: newComment,
        PostId: id
      },
      {
        headers:
        {
          accessToken: localStorage.getItem("accessToken") //gettin the accessToken from "cookies".. "accessToken is the key we chose"
        }
      }
    )
    .then( (res) => {
      if (res.data.error) {return alert("no estas loggeado")}
      setNewCommement(""); //to clear input words
      props.refreshFuncProp();
    })
  }


 

  return (
    <div className='opinionWithComments-container'>
      <div className='opinionSection'>
        <h3>{props.userName}</h3>
        <p> 
          {props.opinion}
        </p>
      </div>

      {(props.comment) && (props.comment.length > 0) &&
      <div className='commentTitle'>
        <h3>Comentarios</h3> 

        {props.comment.map( (comment, key) => {
          return(
            <div className='commentsSection' key={key}>
              <div className='commentUsername' > {comment.username}: </div>
              <div className='commentBody'> {comment.commentBody}</div>
              {authState.username === comment.username && 
                <div 
                    className='deleteIMG' 
                    style={{color:'yellow'}} 
                    onClick={ () => {deleteCommentFunc(comment.id)}}>
                </div> 
              }
            </div>
        )})}
      </div>
      }

      <div className='footer'>
          <input className='inputComment' type="text" placeholder='Comentá algo...' autoComplete='off' value={newComment} onChange={ (e) => {setNewCommement(e.target.value)} }/> 
          <button className='buttonComment' onClick={addComment} >Enviar</button>
      </div>

    </div>
  )
}

export default OpinionWithComments