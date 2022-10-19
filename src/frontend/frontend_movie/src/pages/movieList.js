import { useEffect, useState } from 'react';

import { Link} from 'react-router-dom';

import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";



const MovieList = () => {
    const [movies, showMovies] = useState([])
    const [user] = useAuthState(auth);

    const fetchData = () => { 
        fetch('http://localhost:8000/movies/')
        .then((response) => {
            return response.json()
        }) 
        .then((data) => { // data is an object
            console.log(data)
            showMovies(data.movie_info_list) // passing in array movie_info_list  
        })   
    } 

      
    useEffect(() => {
        fetchData()
    }, [])
    

    if (!user) {
        return ("Sign in to see the movie list! ") 
    } else {
        return (
        
                <div> <ul>
                <h1>Movie List</h1>
                    {movies.map((movie) => { 
                        return(
                            <li key = {movie.mid}> Id: {movie.mid} | 
                            Movie Title: <Link to={`/fetch_movie_detail/${user.uid}/${movie.mid}`}>{movie.title}</Link>  </li>
                        ) 
                    })} 
                </ul></div>
                
            
        );
    }
    
  }
  export default MovieList;
