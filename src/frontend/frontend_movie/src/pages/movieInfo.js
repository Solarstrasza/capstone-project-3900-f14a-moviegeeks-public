import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewList from "../components/Homepage/movieReviews"

import MovieInfoPoster from "./movieInfoPoster"
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, logout} from "../components/Auth";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';
import "./stylesheets/movieInfo.css";
import Cast from "../components/Homepage/cast.js"
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import MovieRecommendations from "../components/Homepage/movieInfoRecommend";



function MovieInfo() {
    let {uid, mid} = useParams();
    const [movieInfo, showMovieInfo] = useState([]);
    const [user] = useAuthState(auth);
    
    const fetchData = () => { 
        fetch(`http://localhost:8000/fetch_movie_detail_gen2/${uid}/${mid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            console.log(data)
            showMovieInfo(data) // passing in array movie_info_list
        })   
    }
    
    useEffect(() => {
        fetchData()
    }, []) 

    


    const addWishlist = () => { 
        fetch(`http://localhost:8000/profile/wishlist/add/${uid}/${mid}/`,{method: "POST"})
        .then((response) => {
            window.location.reload(false);
            console.log(uid)
            return response.json()
        })
    }

    const addFavourites = () => {
        fetch(`http://localhost:8000/favourite/add/${uid}/${mid}/`,{method: "POST"})
        .then((response) => {
            window.location.reload(false);
            console.log(uid)
            return response.json()
        })
    }

    const [movies, setMovies]=useState([]);

    const searchMovie = async() => {
        await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c3479c45c6010dfb319659420dbf9c35&query=${movieInfo.title}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            setMovies(data.results) // passing in array movie_info_list 
        })  
    } 

      useEffect(() => {
        searchMovie() 
    }, [movieInfo.title]) 


    const [modal, setModal] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);

    const openModal = () => {
        setModal(!modal);
    };

    const spinner = () => {
        setVideoLoading(!videoLoading);
    };

    const [trailerUrl, setTrailerUrl] = useState([]);

    const fetchTrailerUrl = () => { 
        fetch(`http://localhost:8000/trailer/${mid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            console.log(data)
            setTrailerUrl(data) // passing in array movie_info_list
        })   
    }
    
    useEffect(() => {
        fetchTrailerUrl()
    }, [mid])

    if (!user || !movies.length || !movieInfo.directors || !movieInfo.title || !movies[0]) {
        return ("") 
    }
    else if (movieInfo.rating == 0) {
        return (
            <div className = "movie-bg ">
                    
                    <div className = "movie-info-left">
                        <MovieInfoPoster style = {{ pointerEvents: 'none'}} title = { movieInfo.title } />
                    </div>

                    <div className = "movie-info-right">
                        <div id = "titleText"> 
                            <h1>{ movieInfo.title }</h1>
                            { movieInfo.start_year } &#8226; { movieInfo.runtime} minutes 
                            <br />
                        </div>
                        <br />

        
                        <div className = "rating-page"> 
                            <Stack direction="row" spacing={1}>

                            <div className = "rating"> 
                                Rating: 0 
                            </div>
                            <div className = "stars">
                                {movieInfo.rating == 0 && 
                                <Rating 
                                    emptyIcon={<StarIcon style={{ opacity: 1, color: "#D3D0D0"}} fontSize="inherit" />}
                                    style = {{color : "#FFD700"}} 
                                    value={0} 
                                    readOnly precision={0.1} 
                                    size="large"/>}
                            </div>
                            </Stack>
                        </div> 

                        <br />

                        <Stack direction="row" spacing={1.5}>
                            <Button 
                                onClick = {() => addWishlist(user.uid, movieInfo.mid)} 
                                variant="contained" 
                                startIcon={<AddRoundedIcon/>}
                                sx={{
                                    bgcolor: '#5B5B5B',
                                    contrastText: '#fff',
                                    ':hover': {
                                        bgcolor: "#DDDDDD",
                                        color: 'black',
                                    },
                                }}
                                >
                                Add to wishlist
                            </Button>
                            <Button 
                                onClick = {() => addFavourites(user.uid, movieInfo.mid)}
                                variant="contained" 
                                startIcon={<StarBorderRoundedIcon/>}
                                sx={{
                                    bgcolor: '#5B5B5B',
                                    contrastText: '#fff',
                                    ':hover': {
                                        bgcolor: "#DDDDDD",
                                        color: 'black',
                                    },
                                }}
                                >
                                Favourite
                            </Button>

                            <Button 
                                variant="contained" 
                                startIcon={<OndemandVideoIcon/>}
                                onClick={openModal}
                                sx={{
                                    bgcolor: '#5B5B5B',
                                    contrastText: '#fff',
                                    ':hover': {
                                        bgcolor: "#DDDDDD", 
                                        color: 'black',
                                    },
                                }}
                                >
                                Trailer
                                {/* Source for trailer embed style: https://dev.to/cesareuseche/how-to-build-a-react-video-modal-with-hooks-4on4 */}
                                 {modal ? (
                                <section className="modal__bg">
                                    <div className="modal__align">
                                        <div className="modal__content" modal={modal}>
                                            <IoCloseOutline
                                            className="modal__close"
                                            arial-label="Close modal"
                                            onClick={setModal}
                                            />
                                            <div className="modal__video-align">
                                            {videoLoading ? (
                                                <div className="modal__spinner">
                                                <BiLoaderAlt
                                                    className="modal__spinner-style"
                                                    fadeIn="none"
                                                />
                                                </div>
                                            ) : null}
                                            <iframe
                                                className="modal__video-style"
                                                onLoad={spinner}
                                                loading="lazy"
                                                width="1100"
                                                height="600"
                                                src={`https://www.youtube.com/embed/${trailerUrl}`} 
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen
                                            ></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                ) : null }
                            </Button>
                            
                        </Stack>
                        

                        <br />
                        <br />

                        <div className = "movie-description">
                            {movies[0].overview}
                        </div>
                        
                        <br />

                    

                        <div> 
                            <h3> <font color='#DDDDDD'>DIRECTED BY </font>  <font color='white'>&#8226; { movieInfo.directors[0].name }</font> </h3>
                        </div>

                        <div> 
                            <h3> <font color='#DDDDDD'>GENRES  </font>  <font color='white'>{ movieInfo.genres.map(item => 
                                <text> &#8226; {item} </text>) }</font> </h3>
                        </div>
                    </div>

                    <br />    
                    <br /> 
                    <br />    
                    <br /> 
                    <br />    
                    <br /> 
                    
                    <div>

                        <Cast title = {movieInfo.title} id = {movies[0].id}/>
                                            
                    </div>

                    <div>

                        <ReviewList title = {movieInfo.title} />

                    </div>

                    <div>
                        <MovieRecommendations mid = {movieInfo.mid} />
                    </div>
            </div>
        )
    
    } else {
        return (
            <div className = "movie-bg ">
                    
                    <div className = "movie-info-left">
                        <MovieInfoPoster style = {{ pointerEvents: 'none'}} title = { movieInfo.title } />
                    </div>

                    <div className = "movie-info-right">
                        <div id = "titleText"> 
                            <h1>{ movieInfo.title }</h1>
                            { movieInfo.start_year } &#8226; { movieInfo.runtime} minutes 
                            <br />
                        </div>
                        <br />

        
                        <div className = "rating-page"> 
                            <Stack direction="row" spacing={1}>

                            <div className = "rating"> 
                                Rating: { movieInfo.rating?.toFixed(2) } 
                            </div>
                            <div className = "stars">
                                {movieInfo.rating && 
                                <Rating 
                                    emptyIcon={<StarIcon style={{ opacity: 1, color: "#D3D0D0"}} fontSize="inherit" />}
                                    style = {{color : "#FFD700"}} 
                                    value={movieInfo.rating} 
                                    readOnly precision={0.1} 
                                    size="large"/>}
                            </div>
                            </Stack>
                        </div> 

                        <br />

                        <Stack direction="row" spacing={1.5}>
                            <Button 
                                onClick = {() => addWishlist(user.uid, movieInfo.mid)} 
                                variant="contained" 
                                startIcon={<AddRoundedIcon/>}
                                sx={{
                                    bgcolor: '#5B5B5B',
                                    contrastText: '#fff',
                                    ':hover': {
                                        bgcolor: "#DDDDDD", // theme.palette.primary.main
                                        color: 'black',
                                    },
                                }}
                                >
                                Add to wishlist
                            </Button>
                            <Button 
                                onClick = {() => addFavourites(user.uid, movieInfo.mid)}
                                variant="contained" 
                                startIcon={<StarBorderRoundedIcon/>}
                                sx={{
                                    bgcolor: '#5B5B5B',
                                    contrastText: '#fff',
                                    ':hover': {
                                        bgcolor: "#DDDDDD", // theme.palette.primary.main
                                        color: 'black',
                                    },
                                }}
                                >
                                Favourite
                            </Button>

                            <Button 
                                variant="contained" 
                                startIcon={<OndemandVideoIcon/>}
                                onClick={openModal}
                                sx={{
                                    bgcolor: '#5B5B5B',
                                    contrastText: '#fff',
                                    ':hover': {
                                        bgcolor: "#DDDDDD", 
                                        color: 'black',
                                    },
                                }}
                                >
                                Trailer
                                {/* Source for trailer embed style: https://dev.to/cesareuseche/how-to-build-a-react-video-modal-with-hooks-4on4 */}
                                 {modal ? (
                                <section className="modal__bg">
                                    <div className="modal__align">
                                        <div className="modal__content" modal={modal}>
                                            <IoCloseOutline
                                            className="modal__close"
                                            arial-label="Close modal"
                                            onClick={setModal}
                                            />
                                            <div className="modal__video-align">
                                            {videoLoading ? (
                                                <div className="modal__spinner">
                                                <BiLoaderAlt
                                                    className="modal__spinner-style"
                                                    fadeIn="none"
                                                />
                                                </div>
                                            ) : null}
                                            <iframe
                                                className="modal__video-style"
                                                onLoad={spinner}
                                                loading="lazy"
                                                width="1100"
                                                height="600"
                                                src={`https://www.youtube.com/embed/${trailerUrl}`} 
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen
                                            ></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                ) : null }
                            </Button>
                            
                        </Stack>
                        

                        <br />
                        <br />

                        <div className = "movie-description">
                            {movies[0].overview}
                        </div>
                        
                        <br />

                    

                        <div> 
                            <h3> <font color='#DDDDDD'>DIRECTED BY </font>  <font color='white'>&#8226; { movieInfo.directors[0].name }</font> </h3>
                        </div>

                        <div> 
                            <h3> <font color='#DDDDDD'>GENRES  </font>  <font color='white'>{ movieInfo.genres.map(item => 
                                <text> &#8226; {item} </text>) }</font> </h3>
                        </div>
                    </div>

                    <br />    
                    <br /> 
                    <br />    
                    <br /> 
                    <br />    
                    <br /> 
                    
                    <div>

                        <Cast title = {movieInfo.title} id = {movies[0].id}/>
                                            
                    </div>

                    <div>

                        <ReviewList title = {movieInfo.title} />

                    </div>

                    <div>
                        <MovieRecommendations mid = {movieInfo.mid} />
                    </div>

                   
            </div>
        )
    }
}
export default MovieInfo;


  
