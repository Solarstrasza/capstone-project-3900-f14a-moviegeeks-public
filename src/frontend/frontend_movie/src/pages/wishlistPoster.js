import { useEffect, useState } from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import "./stylesheets/posterStyles.css";



function WishlistPoster({title, id}) {
    const [movies, setMovies]=useState([]);
    const [user] = useAuthState(auth);


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

   
    if (!user || !movies.length) { 
        return("") 
    } 

    if (!movies[0].poster_path) {
        return (
            <div>   
                
            <img src = {`http://image.tmdb.org/t/p/w500//${movies[1].poster_path}`} style = {{maxHeight: 200}}></img>
            
        </div>
        )
    }

    return (
        <div>   
                
            <img src = {`http://image.tmdb.org/t/p/w500//${movies[0].poster_path}`} style = {{maxHeight: 200}}></img>
            
        </div>
    )
    
}

export default WishlistPoster
