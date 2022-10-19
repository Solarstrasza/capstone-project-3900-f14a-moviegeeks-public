import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import "./stylesheets/movieInfo.css";




function MovieInfoPoster({title, id}) {
    const [movies, setMovies]=useState([]);
    const [user] = useAuthState(auth);


    const searchMovie = async() => {
        await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c3479c45c6010dfb319659420dbf9c35&query=${title}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { 
            setMovies(data.results) 
        })  
    } 

      useEffect(() => {
        searchMovie() 
    }, [title, id]) 

    let navigate = useNavigate();

    function changeLocation(placeToGo){
        navigate(placeToGo, { replace: true });
        window.location.reload();
    }

   
    if (!user || !movies.length) { 
        return("") 
    } 

    if (movies[0].title == 'Your Name') {
        return (
            <div>   
                <Link to={`/fetch_movie_detail/${user.uid}/${id}`} onClick={() => changeLocation(`/fetch_movie_detail/${user.uid}/${id}`)} ><img src = "https://image.tmdb.org/t/p/w500//q719jXXEzOoYaps6babgKnONONX.jpg" style = {{maxHeight: 181}}></img></Link>
            </div>
        )
    }

    if (movies[0].title == 'Kate') {
        return (
            <div>   
                
                <Link to={`/fetch_movie_detail/${user.uid}/${id}`} onClick={() => changeLocation(`/fetch_movie_detail/${user.uid}/${id}`)} ><img src = "https://image.tmdb.org/t/p/w500//mUvikzKJJSg9khrVdxK8kg3TMHA.jpg" style = {{maxHeight: 181}}></img></Link>
            
            </div>
        )
    } 

    if (!movies[0].poster_path) {
        return (
            <div>   
                
                <Link to={`/fetch_movie_detail/${user.uid}/${id}`} onClick={() => changeLocation(`/fetch_movie_detail/${user.uid}/${id}`)} ><img src = {`http://image.tmdb.org/t/p/w500//${movies[1].poster_path}`} style = {{maxHeight: 181}}></img></Link>
            
            </div>
        )
    }
    return (
        <div>   
                        
            <Link to={`/fetch_movie_detail/${user.uid}/${id}`} onClick={() => changeLocation(`/fetch_movie_detail/${user.uid}/${id}`)} ><img src = {`http://image.tmdb.org/t/p/w500//${movies[0].poster_path}`} style = {{maxHeight: 181}}></img></Link>
            
        </div>
    )
    
}

export default MovieInfoPoster
