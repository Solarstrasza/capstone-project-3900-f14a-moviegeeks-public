import { useEffect, useState } from 'react';

import { Link, useParams, useNavigate } from 'react-router-dom';
import ReviewForm from './reviewForm'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOffAltTwoToneIcon from '@mui/icons-material/ThumbUpOffAltTwoTone';
import ThumbDownAltTwoToneIcon from '@mui/icons-material/ThumbDownAltTwoTone';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import IconButton from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import "./stylesheets/posterStyles.css";
import Rating from '@mui/material/Rating';


function ReviewInfo() {
    let {mid} = useParams();
    const [reviews, showMovieReviews] = useState([])
    const [user] = useAuthState(auth);
    
    const fetchData = () => { 
        fetch(`http://localhost:8000/reviews/${mid}/${user.uid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            console.log(data)
            showMovieReviews(data.movie_review_list) // passing in array movie_info_list 
        })   
    } 
    
    useEffect(() => {
        fetchData()
    }, []) 

    

    return (
        <div>   
            {reviews.map((review) => { 
            return(
               <Review key = {review.rid}review={review}/>
            ) 
            })}  
            <ReviewForm/>
        </div>
    )
    
}




const Review = (props) => {

    const [user] = useAuthState(auth);
    const {review} = props;
    let {uid} = useParams();
    const deleteData = () => { 
        fetch(`http://localhost:8000/deleteReview/${review.rid}`,{method: "DELETE"})
        .then((response) => {
            window.location.reload(false);
            return response.json()
        })
    }

    const Upvote = () => { 
        fetch(`http://localhost:8000/upvote/${review.mid}/${review.rid}/${review.upvote+1}/${review.downvote}/${user.uid}`,{method: "POST"})
        .then((response) => { 
            window.location.reload(false);
            return response.json()
        })
        
    }

    const Downvote = () => { 
        fetch(`http://localhost:8000/downvote/${review.mid}/${review.rid}/${review.downvote+1}/${review.upvote}/${user.uid}`,{method: "POST"})
        .then((response) => {
            window.location.reload(false);
            return response.json()
            
        })
    }
    const banReviewer = () => { 
        fetch(`http://localhost:8000/ban/add_ban/${uid}/${review.uid}/${review.name}`,{method: "POST"})
        .then((response) => {
            window.location.reload(false);
            return response.json()
        })
    }



    const [upvoted, checkUpvoted] = useState([])

    const checkUpvote = () => {
        fetch(`http://localhost:8000/checkUpvote/${review.rid}/${user.uid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            //console.log(data)
            checkUpvoted(data) // passing in array movie_info_list 
        })   
    } 
    
    useEffect(() => {
        checkUpvote()
    }, []) 


    const [downvoted, checkDownvoted] = useState([])

    const checkDownvote = () => {
        fetch(`http://localhost:8000/checkDownvote/${review.rid}/${user.uid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            checkDownvoted(data) // passing in array movie_info_list 
        })   
    } 
    
    useEffect(() => {
        checkDownvote()
    }, []) 

    

    
   
        

    return(<li key = {review.rid}> 
        <br />
        Rid: {review.rid} <br />
        Name: <Link to={`/profile/${review.uid}/${review.name}`}>{review.name}</Link> <br />
        Mid: {review.mid} <br /> 
        Rating: {review.rating}/5 <br />
        <div style = {{pointerEvents: 'none'}}>
       <Rating style = {{color : "#FFD700"}} value={review.rating} readOnly precision={0.1} size="large"/> <br />
       </div>

            {!upvoted && <IconButton 
                className = "upvoteButton"
                onClick = {() => 
                    Upvote(review.rid, review.upvote+1)
                } 

                sx={{
                    "&:hover": {
                    backgroundColor: '#a4f7a4',
                    }
                }}
                style={{ 
                    color: '#32CD32', 
                    maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
                }}
                
            ><ThumbUpOutlinedIcon/></IconButton>}

            {upvoted && <IconButton 
                className = "upvoteButton"
                onClick = {() => 
                    Upvote(review.rid, review.upvote+1)
                } 

                sx={{
                    "&:hover": {
                    backgroundColor: '#a4f7a4',
                    }
                }}
                style={{ 
                    color: '#32CD32',
                    maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
                }}
                
            ><ThumbUpOffAltTwoToneIcon/></IconButton>} {review.upvote}  <br /> 

        <Avatar sx={{ width: 30, height: 30, fontSize: "1rem", color:'#000000', backgroundColor: 'transparent'}}>{review.upvote - review.downvote}</Avatar>
        
            {!downvoted && <IconButton
                className = "downvoteButton"
                onClick = {() => Downvote(review.rid, review.downvote+1)} 

                sx={{
                    "&:hover": {
                    backgroundColor: '#f5928a',
                    }
                }}
                style={{ 
                    color: '#f44336',
                    maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
                }}

            ><ThumbDownOutlinedIcon/></IconButton>}

            {downvoted && <IconButton
                className = "downvoteButton"
                onClick = {() => Downvote(review.rid, review.downvote+1)}

                sx={{
                    "&:hover": {
                    backgroundColor: '#f5928a',
                    }
                }} 
                style={{ 
                    color: '#f44336',
                    maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
                }}

            ><ThumbDownAltTwoToneIcon/></IconButton>} {review.downvote} <br /> 


        <br />

        Review_Date: {review.review_date} <br />
        Review: {review.review} <br /> 
        {(review.uid == user.uid) && <button style={{margin:10}}  onClick={() => deleteData(review.rid)}>Delete Review</button>}
        
        {(review.uid != user.uid) && <button style={{margin:10}}  onClick={() => banReviewer(uid, review.uid, review.name)}>Ban Reviewer</button>}
        <br /> <hr />
    </li>) 
} 

export default ReviewInfo
