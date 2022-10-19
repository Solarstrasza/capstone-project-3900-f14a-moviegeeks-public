import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import Avatar from '@mui/material/Avatar';
import "./stylesheets/posterStyles.css";
import Rating from '@mui/material/Rating';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import "./stylesheets/similarUsersStyle.css";

function SimilarUsersInfo(){

    const [user] = useAuthState(auth);
    const[similar, getSimilarUsers] = useState([])
    

    const fetchData = () => { 
        fetch(`http://localhost:8000/recommend/users/${user.uid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            console.log(data)
            getSimilarUsers(data)
        })   
    } 
    useEffect(() => {
        fetchData()
    }, []) 

    return (
        <main style={{ padding: "1rem 0" }}>
          
		  <br />
				{similar.map((similarUsersItem) => { 
					return(
						<SimilarUsers key = {similarUsersItem.uid}similarUsersItem={similarUsersItem}/>
					) 
				})}  
          
        </main>
      );
    }



const SimilarUsers = (props) => {
    const {similarUsersItem} = props;


    const [img, setImgData] = useState('');
        useEffect(() =>{
            fetch(`http://localhost:8000/profile-picture/${similarUsersItem.uid}?`+ new URLSearchParams({ time: Date.now() }).toString())
                .then(response => response.blob())
                .then(image => {
                    const localUrl = URL.createObjectURL(image);
                    setImgData(localUrl);
                });
        }, [similarUsersItem.uid]);

    useEffect(() => {
        setImgData();
    }, [similarUsersItem.uid]) 


    return (<ul className="similarUsersBox" key = {similarUsersItem.username}> 
    <div>
    <Link
      href={`/Profile/${similarUsersItem.uid}/${similarUsersItem.username}`}
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
			  marginBottom={5}
        marginLeft={5}
			  paddingBottom={3}
        paddingLeft={5}
        paddingTop={5}
        marginRight={10}
			  

            >
    
    <ListItemAvatar>
        <Avatar
            src={img}
            sx={{width: 80, height: 80}}
        />
    </ListItemAvatar>
            <li>
            <div className='usernameLink'>
            
            {similarUsersItem.username}
            
            </div>

              <div className='similarityText'>
                Similarity: {similarUsersItem.similarity.toFixed(1)}
                </div>
              <div className='starsRating'>
                  {similarUsersItem.similarity && 
                  <Rating style = {{color : "#FFD700"}} 
                  value={similarUsersItem.similarity} 
                  readOnly precision={0.1} 
                  size="large"/>}
              </div>  

              </li>
        </Box>
        </Link>
        </div>
    </ul>)
}

export default SimilarUsersInfo