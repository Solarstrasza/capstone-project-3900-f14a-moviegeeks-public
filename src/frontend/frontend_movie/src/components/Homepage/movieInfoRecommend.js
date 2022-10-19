import { useEffect, useState, useRef } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import MoviePoster from "../../pages/recommendMoviePoster";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../Auth";
import Tabs from '@mui/material/Tabs';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


export default function MovieInfoRecommendation({mid}) {
    const [user] = useAuthState(auth);
    const [recommendedMovies, showRecommendedMovies] = useState([])


    const fetchRecommended = () => { 
		setIsLoading(true)
        fetch('http://localhost:8000/recommend/similar_movie_rec/?' 
        	+ new URLSearchParams({ uid: user.uid }).toString() + "&" 
			+ new URLSearchParams({ mid: mid }).toString() + "&" 
			+ new URLSearchParams({ limit: 16 }).toString() + "&" 
			+ new URLSearchParams({ similar_genre_flag: Number(genre) }).toString() + "&" 
			+ new URLSearchParams({ similar_director_flag: Number(director) }).toString() + "&" 
			+ new URLSearchParams({ similar_crew_flag: Number(crew) }).toString() + "&"
			+ new URLSearchParams({ similar_actor_flag: Number(actor) }).toString() + "&" 
			+ new URLSearchParams({ similar_reviews_flag: Number(review) }).toString()  
        )
        .then((response) => {
            return response.json()
        }) 
        .then((data) => {
            console.log(data)
            showRecommendedMovies(data) 
			setIsLoading(false)
        })   
    } 
      
    useEffect(() => {
        fetchRecommended()
    }, []) 

	
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }; 



	const [genre, setGenre] = useState(true);
    const handleGenreChange = () => {
		setGenre(!genre);
	};
    
	const [director, setDirector] = useState(true);
    const handleDirectorChange = () => {
		setDirector(!director);
	};

	const [crew, setCrew] = useState(true);
    const handleCrewChange = () => {
		setCrew(!crew);
	};

	const [actor, setActor] = useState(true);
    const handleActorChange = () => {
		setActor(!actor);
	};

	const [review, setReview] = useState(true);
    const handleReviewChange = () => {
		setReview(!review);
	};
    
	const [isLoading, setIsLoading] = useState(false);

	
  

    if (!user) {
      return ("Loading")
    }
    return (
        <div>
            
			<Box sx = {{color: 'white', position: "relative", left: 300, top: 50, width: 600}}> 
			<FormControl component="fieldset" >
				<FormGroup aria-label="position" row>
					<FormControlLabel
					control={<Checkbox style={{color:'white'}} checked = {genre} onChange = {handleGenreChange}/>}
					label="Genre"
					labelPlacement="top"
					/>
					<FormControlLabel
					control={<Checkbox style={{color:'white'}} checked = {director}  onChange = {handleDirectorChange}/>}
					label="Director"
					labelPlacement="top"
					/>
					<FormControlLabel
					control={<Checkbox style={{color:'white'}} checked = {crew} onChange = {handleCrewChange}/>}
					label="Crew"
					labelPlacement="top"
					/>
					<FormControlLabel
					control={<Checkbox style={{color:'white'}} checked = {actor} onChange = {handleActorChange}/>}
					label="Actor"
					labelPlacement="top"
					/>
					<FormControlLabel
					control={<Checkbox style={{color:'white'}} checked = {review} onChange = {handleReviewChange}/>}
					label="Review"
					labelPlacement="top"
					/>
					<Button 
						onClick={fetchRecommended}
						variant="contained"
						disabled={isLoading}
						sx={{
							bgcolor: '#5B5B5B',
							contrastText: '#fff',
							width: 126,
							height: 52,
							fontSize: 13,
							top: 3,
							':hover': {
								bgcolor: "#DDDDDD", // theme.palette.primary.main
								color: 'black',
							},
						}}
					> {!isLoading && <Box sx = {{position: "absolute"}}> Update </Box>} {isLoading && <div style = {{position:'absolute'}}>Loading...</div>}</Button>
				</FormGroup>
			</FormControl>

			</Box>

			<Button style={{height: 30}} 
                variant="text" 
                scrollButtonsscrollButtons
                sx={{ color: "white", position: "flex", top: 20, left: 60, fontWeight: '550', fontSize: 17 }}
            > Similar Titles 
            </Button>
			
            <Box
              display="flex"
              minHeight="0vh"
              flexDirection= "row"
            >     
              <ImageList sx={{ 
                width: "max-content", 
                maxHeight: 510,
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
                    aria-label="scrollable auto tabs example"
                    TabIndicatorProps={{style: {backgroundColor: "transparent"}}}
                >
              {recommendedMovies.map((item) => (
                <ImageListItem sx = {{padding: 2}} key={item.title}>
                    <MoviePoster title={item.title} id = {item.mid} uid = {user.uid}/>
                </ImageListItem>
              ))}
              </Tabs>
              </ImageList>
            </Box>
            </div>
    );
    
  }
  
