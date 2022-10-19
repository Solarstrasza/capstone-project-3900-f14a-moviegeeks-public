import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Auth";
import { FormControlLabel, RadioGroup, Radio } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
// Import appropriate .css file for styling.
import "./Search.css";

function Search() {

    let { query } = useParams();
    const [user] = useAuthState(auth);

    const [movies, setMovies] = useState([]);                           // Returns a list of movies based on search.
    const [moviesToDisplay, setMoviesToDisplay] = useState([]);         // Returns list of movies to display.
    const [currentGenre, setCurrentGenre] = useState("");               // Returns the current genre.
    const [currentGenreNum, setCurrentGenreNum] = useState("0");        // Returns the current genre number.
    const [currentSearch, setCurrentSearch] = useState(`${query}`);     // Returns the current query.
    const [genreToggleOn, setGenreToggleOn] = useState(false);          // Determines whether genre is toggled.
    const [directorToggleOn, setDirectorToggleOn] = useState(false);    // Determines whether director is toggled.
    let navigate = useNavigate();

    useEffect(() => {
        setMoviesToDisplay(movies);
    }, [movies])

    /*
        Rendered when the search query is changed.
        Return type: null.
    */
    const changeSearch = (e) => {
        // Check if input is empty.
        if (e.trim().length == 0) {
            setMovies([]);
            navigate(`/query=`);
            return;
        }

        searchBackend(e);
        navigate(`/query=${e}`);
    }

    /*
        Searches the backend for the list of movies based on query e and current genre by number.
        Return type: list of movies.
    */
    const searchBackend = (e) => {
        fetch(`http://127.0.0.1:8000/search_gen2/?uid=0&keyword_str=${e}&genre_enum=${currentGenreNum}&order_enum=1&descend=0&limit=40&offset=0`).then((res) => {
            return res.json();
        }).then((data) => {
            //console.log(data);
            setMovies(data.movies);
        })
    }
    var i = 0;

    // Constant to return all genres
    // Hard coded because there are no functions in the backend to dynamically return the list of genres.
    const getGenres = [
        {0: "All"},
        {1: "Comedy"},
        {2: "Fantasy"},
        {3: "Romance"},
        {4: "Crime"},
        {5: "Film noir"},
        {6: "Thriller"},
        {7: "Drama"},
        {8: "Family"},
        {9: "Adventure"},
        {10: "Biography"},
        {11: "Musical"},
        {12: "Action"},
        {13: "Sci-fi"},
        {14: "Mystery"},
        {15: "War"},
        {16: "History"},
        {17: "Western"},
        {18: "Animation"},
        {19: "Sport"},
        {20: "Documentary"},
        {21: "Music"},
        {22: "Horror"},
        {23: "News"}
    ]

    /*
        Changes the current genre when toggled by the radio buttons.
        Return type: null.
    */
    const handleChange = (e) => {
        console.log(e);
        setCurrentGenre(e);
        //console.log(currentGenre);
    }

    /*
        Toggles appropriate menu given string e.
        Return type: null.
    */
    const toggleMenu = (e) => {
        if (e === "genre") {
            setGenreToggleOn(!genreToggleOn);
        } else if (e === "director") {
            setDirectorToggleOn(!directorToggleOn); 
        }
    }

    const returnDirector = (movieInfo) => {
        for (var k = 0; k < movieInfo.crew.length; k++) {
            if (movieInfo.crew[k].includes("director")) {
                let director = movieInfo.crew[k].split(" as");
                return director[0];
            }
        }
    }

    /*
        Finds list of movies directed by director.
        Return type: list of movies.
    */
    async function findMoviesByDirector(director) {

        if (director.length == 0) {
            console.log("Test");
            setMoviesToDisplay(movies);
            return;
        }

        director = director.toLowerCase();

        setMoviesToDisplay([]);
        for (let movie of movies) {
            fetch(`http://localhost:8000/fetch_movie_detail/${user.uid}/${movie.mid}`).then((res) => {
                return res.json();
            }).then((data) => {
                if (returnDirector(data).toLowerCase().includes(director)) {
                    if (!(moviesToDisplay.includes(movie.title)))
                        setMoviesToDisplay(old => [...old, movie]);
                }
            })
        };
    }

    useEffect((e) => {
        handleChange(e);
        var j = 0;
        getGenres.map(genre => {
            if (genre[j] === currentGenre) {
                setCurrentGenreNum(`${j}`);
            } else {
                j = j + 1;
            }
        })

        changeSearch(currentSearch);
    }, [currentGenre]);

    return(
        <div>
            <input placeholder = "Search in Movie Geeks..." value = {query} onChange = {(e) => {changeSearch(e.target.value); setCurrentSearch(e.target.value);}} />

            <div className = "wrap">
                <div className = "left_column">
                    {/* Filter results*/}
                    <div className = "filter_container">
                        <div className = "filter_text">Filter search results:</div>
                        <div className = "filter_text">
                            <div className = "filter_text_genre" onClick = {() => toggleMenu("genre")}>Search by genre &#9662;</div>
                            {genreToggleOn && <RadioGroup
                            onChange = {(e) => handleChange(e.target.value)}>
                            {getGenres.map(genre =>
                                <div><FormControlLabel value = {genre[i]} control = {<Radio />} label = {genre[i++]}></FormControlLabel></div>)}
                            </RadioGroup>}
                        </div>

                        <div className = "filter_text">
                            <div className = "filter_text_genre" onClick = {() => toggleMenu("director")}>Search by director &#9662;</div>
                            {directorToggleOn && <div className = "director_search_bar" contentEditable = "true" onInput = {(e) => findMoviesByDirector(e.currentTarget.textContent)} />}
                        </div>
                    </div>
                </div>

                <div className = "right_column">
                    <div className = "right_text_area">
                        Showing {moviesToDisplay.length} results <br />
                        {moviesToDisplay.length > 0 && <div className = "searchResults">
                        {moviesToDisplay.map(movie =>
                            <div>
                                <div className = "movie_search_result" onClick = {() => {navigate(`/fetch_movie_detail/${user.uid}/${movie.mid}`); window.location.reload();}}>
                                    <div className = "movie_search_text">{movie.start_year}</div>
                                    <div>{movie.title}</div>
                                    {(movie.rating!=0) && <div><StarIcon sx = {{position: 'relative', top: 5, right: 1, color:'gold'}}/>{movie.rating}</div>}
                                    {(movie.rating==0) && <div><StarIcon sx = {{position: 'relative', top: 5, color:'grey'}}/>{movie.rating}</div>}
                                </div>
                            </div>
                            )
                        }
                        </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Search;