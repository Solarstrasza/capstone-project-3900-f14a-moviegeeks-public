import React, { useState } from 'react';
import {useNavigate, useParams } from 'react-router';

import "./index.css";

// check for user
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, logout} from "../Auth";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

const Navbar = () => {

    const nav = useNavigate();
    const [user] = useAuthState(auth);
    const [userDropdown, setUserDropdown] = useState(false);
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");


    const revealUserDropdown = () => {
        setUserDropdown(true);
    }

    const hideUserDropdown = () => {
        setUserDropdown(false);
    }

    const sign_out = () => {
        setUserDropdown(false);
        logout();
    }

    const changeSearch = (e) => {
        // Check if input is empty.
        if (e.trim().length == 0) {
            setMovies([]);
            return;
        }

        setQuery(e);

        searchBackend(e);
    }

    const searchBackend = (e) => {
        fetch(`http://localhost:8000/search/?uid=1&keyword_str=${e}&genre_enum=0&order_enum=1&descend=0&limit=8&offset=0`).then((res) => {
            return res.json();
        }).then((data) => {
            setMovies(data.movie_info_list);
            movies.sort(function(a, b) {return a.rating - b.rating})
        })
    }

    const disableScroll = () => {
        document.body.style.overflow = "hidden";
    }

    const enableScroll = () => {
        document.body.style.overflow = "unset";
    }

    const handleKeyPress = (key) => {
        if (key.key == 'Enter') {
            nav(`/query=${query}`);
            window.location.reload();
        }
    }

    console.log(user)
    if (!user) {
        return(
            <div className = "container">
                <div className = "button" onClick = {() => nav("/login")}>Sign in</div>
                <div>
                    <div className = "navbarElement" onClick = {() => nav("/movies")}>Browse movies</div>

                    <div className = "search-navbar">Test</div>
                </div>
            </div>
        )
    } else {
        return(
            <div className = "container">
                <div className = "user_profile" onMouseEnter = {revealUserDropdown} onMouseLeave = {hideUserDropdown}>
                    { user.displayName } &#9662;
                    {userDropdown &&
                    <div className = "user_profile_container">
                        <div className = "user_profile_dropdown_top" onClick = {() => {nav(`/profile/${user.uid}/${user.displayName}`);}} >View my profile</div>
                        <div className = "user_profile_dropdown_bottom" onClick = {() => {logout(); window.location.reload()}}>Sign out</div>
                    </div>
                    }
                </div>
                <div onMouseEnter = {() => enableScroll()}>
                    <MovieFilterIcon onClick = {() => {nav("/");}} sx = {{color: 'white', width: 32, height: 32, left: 12, top: 9, position: 'relative', cursor: 'pointer'}}/>
                    <div className = "navbarElement" onClick = {() => {nav("/movies");}}>Browse Movies</div>
                    <div className = "navbarElement" onClick = {() => {nav(`/recommended/${user.uid}`); }}>Recommended</div>
                    <div className = "navbarElement" onClick = {() => nav("/similarUsers")}>Similar Users</div>
                    <div className = "search-bar"> 
                        <input placeholder = "Search..." style = {{width: "24vw", height: "1px", outlineColor: "white"}} onChange = {(e) => changeSearch(e.target.value)} onKeyDown = {handleKeyPress} />
                        {movies.length > 0 &&
                        <div className = "search-results-navbar">
                            <div className = "search-results-container-navbar" onMouseEnter = {() => disableScroll()} onMouseLeave = {() => enableScroll()}>
                                <div className = "search-grid-navbar">
                                    {movies.map(movie =>
                                        <div className = "search-result-navbar" onClick = {() => {nav(`/fetch_movie_detail/${user.uid}/${movie.mid}`); window.location.reload()}}>{movie.title}</div>)}
                                    <div className = "search-result-navbar" onClick = {() => {nav(`/query=${query}`); window.location.reload()}}>See more...</div>
                                </div>
                            </div>
                        </div>
                        }
                    </div> 
                </div>
            </div>  
        )
    }
}

export default Navbar;