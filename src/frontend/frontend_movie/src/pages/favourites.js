import {Container, WishlistBox, Text, Tile} from './stylesheets/movie'; 
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import "./stylesheets/favouritesStyle.css";
import WishlistPoster from "./wishlistPoster"
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';


function FavouritesInfo() {
	let {uid} = useParams();
	const [favourites, get_favourite] = useState([])

	const fetchData = () => { 
        fetch(`http://localhost:8000/favourite/show/${uid}/`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            console.log(data)
            get_favourite(data)
        })   
    } 
      
    useEffect(() => {
        fetchData()
    }, [uid]) 

	

    return (
        <main style={{ padding: "1rem 0" }}>
		  <br />
				{favourites.map((favouritesItem) => { 
					return(
						<Favourites key = {favouritesItem.mid}favouritesItem={favouritesItem}/>
					) 
				})}
        </main>
      );
    }

	const Favourites = (props) => { 
		const {favouritesItem} = props;
		const [user] = useAuthState(auth);
		const [showRecommendedMovies] = useState([])
		let {uid} = useParams();

		const fetchData = () => { 
			fetch('http://localhost:8000/recent/')
			.then((response) => {
				return response.json()
			})
			.then((data) => { // data is an object
				console.log(data)
				// passing in array movie_info_list
				showRecommendedMovies(data.movie_poster_list)
			})   
		}

		const deleteFavourites = () => { 
			fetch(`http://localhost:8000/favourite/remove/${user.uid}/${favouritesItem.mid}`,{method: "POST"})
			.then((response) => {
				window.location.reload(false);
				return response.json()
			})
		}

		return (
		<div>
		<Link href={`/fetch_movie_detail/${user.uid}/${favouritesItem.mid}`} underline="none" color="black">
		<Box
              display="flex"
              justifyContent="left"
              minHeight="0vh"
              flexDirection= "row"
			  boxShadow="24"
			  bgcolor="#383838"
			  borderColor="white"
			  marginBottom={3}
			  paddingBottom={-1}
			  href={`/fetch_movie_detail/${user.uid}/${favouritesItem.mid}`}

            > 
			 <div className='wishlistPoster'>
			<WishlistPoster style = {{ pointerEvents: 'none'}} title = { favouritesItem.title } />
			</div>
		<li 
		className="favouritesBox" 
		key = {favouritesItem.title}
		> 

			<div className='favouriteTitle'>
				{favouritesItem.title} <br />
			</div>
			<Link href={``} underline="none" color="black">
			{(uid == user.uid) && <div className='removeFavourite-button' style={{margin:10}}  onClick={() => deleteFavourites(uid, favouritesItem.mid)}>Delete from Favourites</div>} 
			</Link> 

		</li>
		</Box>
		</Link>
		</div>
		) 
	}

export default FavouritesInfo
