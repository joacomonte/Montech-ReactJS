import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./OpinionItemStyle.css"
import { AuthContext } from '../../helpers/AuthContext';
import axios from 'axios';

import trash from '../../images/yellowTrash.png'



function OpinionItem(props) {
    // is used to redirect the user on button click.
    let navigate = useNavigate();
    const {authState} = useContext(AuthContext);
    const [likeBoolean, setLikeBoolean] = useState(props.likeStatus);

    useEffect(() => {
        if(props.id && authState.status){
            axios.post(
                "http://192.168.0.128:3001/likes/a",
                {PostId: props.id},
                { headers: {accessToken: localStorage.getItem("accessToken")}}
            ).then( (res) => {
                console.log(res.data)
                setLikeBoolean(res.data.state)
            })
        }
    }, [])
    

    const likeOpinion = (argId) =>{
        axios.post(
            "http://192.168.0.128:3001/likes",
            {PostId: argId},
            { headers: {accessToken: localStorage.getItem("accessToken")}}
        ).then( (res) => {
                setLikeBoolean(res.data);
                props.handleFunc();
            }
        )
    }



    const deletePostFunc = (id) =>{
            axios.delete(`http://192.168.0.128:3001/posts/${id}`,
                {headers: {accessToken: localStorage.getItem("accessToken")}}
                ).then(setTimeout(() => {
                     props.handleFunc()}, 100));
              ;
        }



  return (
    <div className='opinion-container'>
        <div className='WrapperNoButton'>
            <div className='opinion-title'>
                <div className='opinion-name'>
                    <div className="vertical-line" >
                        <h2>{props.userName}</h2>
                    </div>
                </div>

            </div>



            <div className='opinion-opinion'>
                <h4>{props.opinion}</h4>
            </div>

            <div className='commentOfOpinion-container'>
                <div className="vertical-line-comment">
                    {(props.comment) && (props.comment.length > 0) && <div className='commentOfOpinion-userName'> Comentarios </div>}
                </div>

            </div>
            {(props.authUsername === props.userName) && 
                <img 
                    src={trash} 
                    className='trashImg'
                    onClick={ () => {deletePostFunc(props.id)}}>
                </img>}
        </div>


        <div className='like-container' style={{textAlign:'center'}} >

            {!likeBoolean && (props.Likes) &&
            <div className='like-insidecontainer'> 
                <div className='unlikedIMG' onClick={() => likeOpinion(props.id)} ></div>
                <div> {props.Likes.length} </div>
            </div>
            }

            {likeBoolean && (props.Likes) &&
            <div className='like-insidecontainer'> 
                <div className='likedIMG' onClick={ () => likeOpinion(props.id)}></div>
                <div> {props.Likes.length} </div>
            </div>
            }
            
            

            
        </div>

        {!props.comment && 
            <div className='like-insidecontainer'> 
                <div className='button-comment' onClick={ () => navigate(`/post/${props.id}`) } > </div>
         </div>}


    </div>
  )
}

export default OpinionItem