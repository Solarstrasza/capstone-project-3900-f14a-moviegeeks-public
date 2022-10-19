import { useEffect, useState, useRef } from 'react';
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



export default function RecentMovies() {
    const [user] = useAuthState(auth);
    const [recommendedMovies, showRecommendedMovies] = useState([])

    const fetchData = () => { 
        fetch('http://localhost:8000/recent/')
        .then((response) => {
            return response.json()
        }) 
        .then((data) => { // data is an object
            console.log(data)
            showRecommendedMovies(data.movie_poster_list) // passing in array movie_info_list  
        })   
    } 
      
    useEffect(() => {
        fetchData()
    }, [])

  
   
      const [value, setValue] = React.useState(0);

      const handleChange = (event, newValue) => {
          setValue(newValue);
      };
  

    if (!user) {
      return ("")
    }
    return (
        <div>
            <Button style={{height: 30, pointerEvents: 'none'}} 
                variant="text" 
                startIcon = {<AlignHorizontalRightRoundedIcon/>} 
                endIcon={<ArrowForwardIosIcon />}
                scrollButtonsscrollButtons
                sx={{color: 'white', position: "flex", top: 30, left: 74, fontWeight: '550', fontSize: 20 }}
            > Recent Releases
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
                    <MoviePoster title={item.title} id = {item.id} uid = {user.uid}/>
                </ImageListItem>
              ))}
              </Tabs>
              </ImageList>
            </Box>
            </div>
    );
    
  }
  
