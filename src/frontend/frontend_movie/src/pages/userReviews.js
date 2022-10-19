import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import SingleReview from "../pages/profileSingleReview";
import ImageListItem from '@mui/material/ImageListItem';
import * as React from 'react';
import Stack from '@mui/material/Stack';


function UserReviews() {
    let {uid} = useParams();
    const [reviews, showMovieReviews] = useState([])
    
    const fetchData = () => { 
        fetch(`http://localhost:8000/profile/reviews/${uid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { 
            console.log(data)
            showMovieReviews(data.movie_review_list)
        })   
    } 
    
    useEffect(() => {
        fetchData()
    }, [uid]) 

  

    return (
        <div>   

            <Stack  spacing={2}>

              {reviews.map((review) => (
                <ImageListItem sx = {{padding: 0}} key={review.rid}>
                    
                    <SingleReview  rid = {review.rid}/>

                </ImageListItem>
              ))} 
              
            </Stack>

        
        </div>
    )
    
}


 

export default UserReviews
