import { useEffect, useState } from 'react';
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
        .then((data) => { // data is an object
            console.log(data)
            setMovies(data.results) // passing in array movie_info_list 
        })  
    } 

      useEffect(() => {
        searchMovie() 
    }, [title, id]) 

   
    if (!user || !movies.length) { 
        return("") 
    } 

    if (movies[0].title == 'Your Name') {
        return (
            <div>   
                
                <img id = "poster" src = "https://image.tmdb.org/t/p/w500//q719jXXEzOoYaps6babgKnONONX.jpg" style = {{maxHeight: 450}}></img>
            
            </div>
        )
    }

    if (movies[0].title == 'Kate') {
        return (
            <div>   
                
                <img id = "poster" src = "https://image.tmdb.org/t/p/w500//mUvikzKJJSg9khrVdxK8kg3TMHA.jpg" style = {{maxHeight: 450}}></img>
            
            </div>
        )
    } 

    if (!movies[0].poster_path) {
        return (
            <div>   
                
                <img id = "poster" src = {`http://image.tmdb.org/t/p/w500//${movies[1].poster_path}`} style = {{maxHeight: 450}}></img>
            
            </div>
        )
    }


    

    return (
        <div>   
                        
            <img id = "poster"src = {`http://image.tmdb.org/t/p/w500//${movies[0].poster_path}`} style = {{maxHeight: 450}}></img>
            
        </div>
    )
    
}

export default MovieInfoPoster
