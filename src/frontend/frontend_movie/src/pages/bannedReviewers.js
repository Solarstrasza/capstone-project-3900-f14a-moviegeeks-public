import {Container, WishlistBox, Text, Tile} from './stylesheets/movie'; 
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import "./stylesheets/bannedReviewersStyle.css";

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

// temp copy of the wishlist page
function BannedReviewersInfo() {
    const [bannedList, get_ban_list] = useState([])
    const [user] = useAuthState(auth);

	const fetchData = () => { 
        fetch(`http://localhost:8000/ban/show/${user.uid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            console.log(data)
            get_ban_list(data.banList_list)
        })   
    } 
      
    useEffect(() => {
        fetchData()
    }, []) 

	

    return (
        <main style={{ padding: "1rem 0" }}>
          
		  <br />
				{bannedList.map((bannedlistItem) => { 
					return(
						<BannedList key = {bannedlistItem.target}bannedlistItem={bannedlistItem}/>
					) 
				})}  
          
        </main>
      );
    }

	const BannedList = (props) => { 
        const {bannedlistItem} = props;
        const [user] = useAuthState(auth);
        let {uid} = useParams();
        const [img, setImgData] = useState('');
        useEffect(() =>{
            fetch(`http://localhost:8000/profile-picture/${bannedlistItem.target}?`+ new URLSearchParams({ time: Date.now() }).toString())
                .then(response => response.blob())
                .then(image => {
                    const localUrl = URL.createObjectURL(image);
                    setImgData(localUrl);
                });
        }, [bannedlistItem.target]);

        useEffect(() => {
            setImgData();
        }, [bannedlistItem.target]) 
		   
		const unbanReviewer = () => { 
			fetch(`http://localhost:8000/ban/remove_ban/${user.uid}/${bannedlistItem.target}`,{method: "POST"})
			.then((response) => {
				window.location.reload(false);
				return response.json()
			})
		}
        if(user.uid != uid){
            return(
                <div className='errorMessage'>
                <h1>You are not permitted to view other users' ban list</h1>
                </div>
            )
        } else {
		return (<li className="bannedReviewersBox" key = {bannedlistItem.target}>
            <div>
            <Link
            href={`/Profile/${bannedlistItem.target}/${bannedlistItem.username}`}
            underline="none"
            >
            <Box
              display="flex"
              justifyContent="left"
              minHeight="0vh"
              flexDirection= "row"
			  boxShadow="24"
			  bgcolor="#383838"
			  borderColor="white"
			  marginBottom={3}
              marginLeft={5}
			  paddingBottom={2}
              paddingLeft={5}
              paddingTop={6}
              marginRight={10}
			  
            >

            
            <ListItemAvatar>
                <Avatar
                    src={img}
                    sx={{width: 80, height: 80}}
                />
            </ListItemAvatar>    
            <li>
            <div className='nameLink'>
            
            {bannedlistItem.username}
                
            </div>
            
            <div className='userID'>
            
			User ID: {bannedlistItem.target} 
            
            </div>
            <Link
            href={``} underline="none" color="black"
            >
                {(uid == user.uid) &&
            <div className='unbanButton'
			    style={{margin:10, marginLeft:20, marginTop:10, marginRight:0}}  
                
                onClick={() => unbanReviewer(user.uid, bannedlistItem.target)}>
                    Unban User
            </div> }
            </Link> 
            </li>
            </Box>
            </Link>
            </div>
		</li>) 
	}
}

export default BannedReviewersInfo