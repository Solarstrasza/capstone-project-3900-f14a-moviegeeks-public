import { useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import MoviePoster from "../../pages/moviePoster";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AlignHorizontalRightRoundedIcon from '@mui/icons-material/AlignHorizontalRightRounded';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../Auth";
import Tabs from '@mui/material/Tabs';



export default function UserRecommendedMovies() {
	let {uid} = useParams();
	const [recommendedMovies, showRecommendedMovies] = useState([])


	const fetchRecommended = () => { 
		fetch('http://localhost:8000/recommend/user_pref_movie_rec/?' 
			+ new URLSearchParams({ uid: uid }).toString() + "&" 
			+ new URLSearchParams({ limit: 16 }).toString() + "&" 
			+ new URLSearchParams({ similar_genre_flag: 1 }).toString() + "&" 
			+ new URLSearchParams({ similar_director_flag: 1 }).toString() + "&" 
			+ new URLSearchParams({ similar_crew_flag: 1 }).toString() + "&"
			+ new URLSearchParams({ similar_actor_flag: 1 }).toString() + "&" 
			+ new URLSearchParams({ similar_reviews_flag: 1 }).toString()  
		)
		.then((response) => {
			return response.json()
		}) 
		.then((data) => {
			console.log(uid)
			console.log(data)
			showRecommendedMovies(data) 
		})   
	} 
		
	useEffect(() => {
		fetchRecommended()
	}, []) 
   
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
  

    if (!uid) {
      return ("Loading")
    }
    return (
        <div>
            <Button style={{height: 30, pointerEvents: 'none'}} 
                variant="text" 
                startIcon = {<AlignHorizontalRightRoundedIcon/>} 
                endIcon={<ArrowForwardIosIcon />}
                scrollButtonsscrollButtons
                sx={{ color: 'white', position: "flex", top: 30, left: 74, fontWeight: '550', fontSize: 20 }}
            > Recommended for you
            </Button>
            <Box
              display="flex"
              justifyContent="center"
              minHeight="0vh"
              flexDirection= "row"
            >     
              <ImageList sx={{ 
                width: "max-content", 
                maxHeight: 510,
                margin: 5,
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
                    aria-label="scrollable auto tabs example"
                    TabIndicatorProps={{style: {backgroundColor: "transparent"}}}
                >
              {recommendedMovies.map((item) => (
                <ImageListItem sx = {{paddingRight: 6}} key={item.title}>
                    <MoviePoster title={item.title} id = {item.mid} uid = {uid}/>
                </ImageListItem>
              ))}
              </Tabs>
              </ImageList>
            </Box>
            </div>
    );
    
  }
  
