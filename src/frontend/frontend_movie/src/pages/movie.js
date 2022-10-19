import {useState } from 'react';
import { useNavigate } from "react-router-dom";
import './stylesheets/movies.css';
import Box from '@mui/material/Box';
import RecentReleases from "../components/Homepage/recentRelease.js";
import Trending from "../components/Homepage/trending.js";

function Movie() {

   
    return (
        <main style={{ padding: "1rem 0" }}>
        <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
        >   

        </Box>

        
        <RecentReleases/>
        <Trending/>
        
        

        </main>
    );

  let navigate = useNavigate();

  const [movies, setMovies] = useState([]);
    fetch(`http://localhost:8000/search/?uid=0&keyword_str=&genre_enum=1&order_enum=2&descend=1&limit=20&offset=0`).then((res) => {
        return res.json();
    }).then((data) => {
        setMovies(data.movie_info_list);
    })

  const nav = (movie) => {
    console.log("Test");
    navigate(`/movies/${movie.mid}`)
  }

  return (
    <div className = "screen">
      <div className = "box">
        <div className = "movieGrid">
          {movies.map(movie => <div className = "movie" onClick= {() => nav(movie)}>
            <div style = {{float: "right"}}>Rating: {movie.rating}</div>
            <div style = {{float: "left"}}>[Movie Poster here]</div>
            <div style = {{float: "left", marginLeft: "1em"}}>{movie.title} </div>
            <div style = {{float: "left", fontSize: "17pt", marginTop: "5px", marginLeft: "10px"}}> ({movie.start_year})</div>
          </div>)}
        </div>
      </div>
    </div>
  )
}
  
  export default Movie;
