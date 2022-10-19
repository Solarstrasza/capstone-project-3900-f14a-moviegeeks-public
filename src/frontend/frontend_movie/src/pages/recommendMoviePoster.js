import { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import "./stylesheets/posterStyles.css"; 
import ImageButton from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';






function MoviePoster({title, id, uid}) {
    const [movieInfo, showMovieInfo] = useState([])
    const [movies, setMovies]=useState([]);
    const [user] = useAuthState(auth);

    const fetchMovieData = () => { 
        fetch(`http://localhost:8000/fetch_movie_detail/${uid}/${id}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            console.log(data) 
            showMovieInfo(data) // passing in array movie_info_list 
        })   
    } 
    
    useEffect(() => {
        fetchMovieData()
    }, []) 


    const searchMovie = async() => {
        await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c3479c45c6010dfb319659420dbf9c35&query=${title}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            setMovies(data.results) // passing in array movie_info_list 
        })  
    } 

      useEffect(() => {
        searchMovie() 
    }, [title, id]) 

    const [setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    let navigate = useNavigate();

    function changeLocation(placeToGo){
        navigate(placeToGo, { replace: true });
        window.location.reload();
    }

    
   
    if (!user || !movies.length) { 
        return("") 
    } 

    if (!movies[0].poster_path) {
        return (
            <div>   
            <ImageButton onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
            class = "darken"
                disableRipple
                sx={{
                    "&:hover": {
                        color: 'black',
                    }
                }}
            >
            <div class = "img__wrap">
            <Link to={`/fetch_movie_detail/${user.uid}/${id}`} onClick={() => changeLocation(`/fetch_movie_detail/${user.uid}/${id}`)}><img src = {`http://image.tmdb.org/t/p/w500//${movies[1].poster_path}`} style = {{maxHeight: 400}}></img>
            {movieInfo.rating != 0 && <div class="img__description_layer_rating_recommend">
                <Rating style = {{color : "#FFD700", padding: 10}} value={Math.round(movieInfo.rating)} readOnly precision={0.1} size="large"emptyIcon={<StarIcon style={{ color: "#B0ADAC" }} fontSize="inherit" />}/>
                <h3>{Math.round(movieInfo.rating)}</h3> 
            </div>}
            {movieInfo.rating == 0 && <div class="img__description_layer_rating_recommend">
                <Rating style = {{color : "#B0ADAC", padding: 10}} value={5} readOnly precision={0.1} size="large" />
                <h3>{movieInfo.rating}</h3> 
            </div>}
            <div class="img__description_layer_title_recommend">
                <h3>{title}</h3>
            </div>
            </Link>
            
            </div>
            </ImageButton>
            
        </div>
        )
    }

    return (
        <div>   
            <ImageButton onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
            class = "darken"
                disableRipple
                sx={{
                    "&:hover": {
                        color: 'black',
                    }
                }}
            >
            <div class = "img__wrap">
            <Link to={`/fetch_movie_detail/${user.uid}/${id}`} onClick={() => changeLocation(`/fetch_movie_detail/${user.uid}/${id}`)} ><img src = {`http://image.tmdb.org/t/p/w500//${movies[0].poster_path}`} style = {{maxHeight: 420}}></img>
            {movieInfo.rating != 0 && <div class="img__description_layer_rating_recommend">
                <Rating style = {{color : "#FFD700", padding: 10}} value={Math.round(movieInfo.rating)} readOnly precision={0.1} size="large"emptyIcon={<StarIcon style={{ color: "#B0ADAC" }} fontSize="inherit" />}/>
                <h3>{Math.round(movieInfo.rating)}</h3> 
            </div>}
            {movieInfo.rating == 0 && <div class="img__description_layer_rating_recommend">
                <Rating style = {{color : "#B0ADAC", padding: 10}} value={5} readOnly precision={0.1} size="large" />
                <h3>{movieInfo.rating}</h3> 
            </div>}
            
            <div style = {{
                    whiteSpace: 'pre-line', wordWrap: 'break-word'
                }} class="img__description_layer_title_recommend">
                <h3>{title}</h3>
            </div>
            </Link>
            
            </div>
            </ImageButton>
            
        </div>
    )
    
}

export default MoviePoster