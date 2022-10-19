import { useEffect, useState } from 'react';
import * as React from 'react';
import { useParams} from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../components/Auth";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import SingleReview from './singleReview'


function ReviewInfo({title}) {
    let {mid} = useParams();
    const [reviews, showMovieReviews] = useState([])
    const [user] = useAuthState(auth);

    const reviewForm = {rid: 0, name: 'reviewForm', uid: '0', downvote: 0, upvote: 0, rating: 1, review_date:"none", review: "form", mid: 0,}


    const fetchData = () => { 
        fetch(`http://localhost:8000/reviews/${mid}/${user.uid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            console.log(data)
            showMovieReviews(data.movie_review_list) // passing in array movie_info_list 
            showMovieReviews(current => [reviewForm, ...current]);
            console.log(data.movie_review_list)
        })   
    } 
    
    useEffect(() => {
        fetchData()
    }, []) 

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  
   
    if (!reviews.length) {
        return ""
    }

     

    return (
        <div>   

            <Button style={{height: 30, pointerEvents: 'none'}} 
                variant="text" 
                scrollButtonsscrollButtons
                sx={{ color: "white", position: "flex", top: 20, left: 60, fontWeight: '550', fontSize: 17 }}
            > Reviews of {title}
            </Button>
            <Box
              display="flex"
              minHeight="0vh"
              flexDirection= "row"
            >     
              <ImageList sx={{ 
                width: "max-content", 
                maxHeight: 610,
                margin: 1,
                display: "flex",
                flexDirection: "row",
                position: "flex",
                }} cols={4} gap = {50}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons = {true}
                    allowScrollButtonsMobile
                    TabIndicatorProps={{style: {backgroundColor: "transparent"}}}
                    aria-label="scrollable auto tabs example"
                >
              {reviews.map((review) => (
                <ImageListItem sx = {{padding: 2}} key={review.rid}>
                    <SingleReview rid = {review.rid}/>
                </ImageListItem>
              ))} 
              </Tabs>
              </ImageList>
            </Box>


        
        </div>
    )
    
}


export default ReviewInfo
