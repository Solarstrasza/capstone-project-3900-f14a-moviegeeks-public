import {useParams} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import "./stylesheets/wishlistStyle.css";
import Box from '@mui/material/Box';
import WishlistPoster from "./wishlistPoster"
import Link from '@mui/material/Link';


function WishlistInfo() {
	let {uid} = useParams();
	const [wishlist, showWishlist] = useState([])

	const fetchData = () => { 
        fetch(`http://localhost:8000/profile/wishlist/show/${uid}/`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            console.log(data)
            showWishlist(data.wishlist_list) // passing in array movie_info_list
        })   
    } 
      
    useEffect(() => {
        fetchData()
    }, [uid]) 
	
	

    return (
        <main style={{ padding: "1rem 0" }}>
		  <br />
				{wishlist.map((wishlistItem) => { 
					return(
						<Wishlist key = {wishlistItem.mid}wishlistItem={wishlistItem}/>
					) 
				})}
        </main>
      );
    }

	const Wishlist = (props) => { 
		let {uid} = useParams();
    	const [user] = useAuthState(auth);
		const [showRecommendedMovies] = useState([])
		const {wishlistItem} = props;

		const fetchData = () => { 
			fetch('http://localhost:8000/recent/')
			.then((response) => {
				return response.json()
			})
			.then((data) => { // data is an object
				showRecommendedMovies(data.movie_poster_list)
			})   
		}
		const deleteWishlist = () => { 
			fetch(`http://localhost:8000/profile/wishlist/remove/${wishlistItem.uid}/${wishlistItem.mid}/`,{method: "POST"})
			.then((response) => {
				window.location.reload(false);
				return response.json()
			})
		}
		useEffect(() => {
			fetchData()
		}, []) 

		return (
			<div>
			<Link href={`/fetch_movie_detail/${user.uid}/${wishlistItem.mid}`} underline="none" color="black">
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
			  href={`/fetch_movie_detail/${user.uid}/${wishlistItem.mid}`}
            >   
			  <div className='poster'>
			  <WishlistPoster style = {{ pointerEvents: 'none'}} title = { wishlistItem.title } />
			  </div>
			  
			  
		<li 
		className="wishlistBox" 
		key = {wishlistItem.title}
		> 
			<div className='title'>
			{wishlistItem.title} <br />
			</div>
			<h3>
				<div className='rating-button'>
			Rating: {wishlistItem.rating}
			</div>
			</h3>
			<Link href={``} underline="none" color="black">
			{(uid == user.uid) && <div className='removeWishlist-button' style={{margin:10}} onClick={() => deleteWishlist(wishlistItem.uid, wishlistItem.mid)}>Delete from Wishlist</div>}
			</Link>
		</li>
		</Box>
		</Link>
		</div>
		) 
	}

export default WishlistInfo
