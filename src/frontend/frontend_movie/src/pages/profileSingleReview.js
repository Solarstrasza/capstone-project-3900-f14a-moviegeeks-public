import { useEffect, useState } from 'react';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';

import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import IconButton from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import MovieInfoPoster from "./profileMoviePoster";


function SingleReview({rid}) {

    const [review, showMovieReviews] = useState([])
    const [user] = useAuthState(auth);
    
    const fetchData = () => { 
        fetch(`http://localhost:8000/review/get/${rid}`)
        .then((response) => {
            return response.json()
        }) 
        .then((data) => { // data is an objectf
            console.log(data)
            showMovieReviews(data) // passing in array movie_info_list 
        })   
    } 
    
    useEffect(() => {
        fetchData()
    }, [rid]) 
    
    
    const [movieInfo, showMovieInfo] = useState([]);
    
    const fetchMovieData = () => { 
        if (!review.mid) {
            return ""
        }
        fetch(`http://localhost:8000/fetch_movie_detail_gen2/1/${review.mid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { 
            console.log(data)
            showMovieInfo(data) 
        })   
    }
    
    useEffect(() => {
        fetchMovieData()
    }, [review.mid]) 

    
    const deleteData = () => { 
        fetch(`http://localhost:8000/deleteReview/${review.rid}`,{method: "DELETE"})
        .then((response) => {
            window.location.reload(false);
            return response.json()
        })
    }

    const Upvote = () => { 
        fetch(`http://localhost:8000/upvote/${review.mid}/${review.rid}/${review.upvote+1}/${review.downvote}/${user.uid}`,{method: "POST"})
        .then((response) => { 
            window.location.reload(false);
            return response.json()
        })
        
    }

    const Downvote = () => { 
        fetch(`http://localhost:8000/downvote/${review.mid}/${review.rid}/${review.downvote+1}/${review.upvote}/${user.uid}`,{method: "POST"})
        .then((response) => {
            window.location.reload(false);
            return response.json()
        })
    }

    const [upvoted, checkUpvoted] = useState([])

    const checkUpvote = () => {
        fetch(`http://localhost:8000/checkUpvote/${rid}/${user.uid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { 
            checkUpvoted(data) 
        })   
    } 
    
    useEffect(() => {
        checkUpvote()
    }, []) 


    const [downvoted, checkDownvoted] = useState([])

    const checkDownvote = () => {
        fetch(`http://localhost:8000/checkDownvote/${rid}/${user.uid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { 
            checkDownvoted(data) 
        })   
    } 
    
    useEffect(() => {
        checkDownvote()
    }, []) 

    const [img, setImgData] = useState('');
    useEffect(() =>{
        fetch(`http://localhost:8000/profile-picture/${review.uid}?`+ new URLSearchParams({ time: Date.now() }).toString())
            .then(response => response.blob())
            .then(image => {
                const localUrl = URL.createObjectURL(image);
                setImgData(localUrl);
            });
    }, [review.uid]);


    while (!review) {
        return "d"
    }

    if (!review.rating || !img ) {
        return ""
    }
        

    return(
        <Box className = "reviewContainer">
            <Card sx={{ 
                height: 180, 
                width: 440,
                bgcolor: '#000000',
                boxShadow: 1,
                borderRadius: 2,
                position: 'relative',
            }}>
            <CardContent>
                <Box sx= {{position: 'absolute', left: 320, top: 0}}>
                    <MovieInfoPoster title = { movieInfo.title } id = {review.mid} />
                </Box>
                <Box> 
                    <Avatar
                        src={img}
                        sx={{width: 40, height: 40, position: 'relative'}}
                    />

                    <Box style = {{textDecoration: 'none', position: 'absolute', left: 69, top: 10}}>
                        <Link style = {{textDecoration: 'none'}} to={`/profile/${review.uid}/${review.name}`}>
                            <Typography sx={{ fontSize: 18}} color='#FFFFFF' gutterBottom>
                                {review.name} 
                            </Typography>
                        </Link>
                    </Box>

                    <Box style = {{position: 'absolute', left: 66, top: 35}} > 
                        <Rating 
                            style = {{color : "#FFD700"}} 
                            value={review.rating} 
                            readOnly precision={0.1} 
                            size="small" 
                            emptyIcon={<StarIcon style={{ opacity: 1, color: "#D3D0D0"}} 
                            fontSize="inherit" />}/>
                    </Box>
                </Box>
                

                <Box style = {{
                    position: 'relative', left: 54, top: 20, overflow: 'scroll', whiteSpace: 'pre-line', wordWrap: 'break-word',
                        width: 235, height: 87
                }}>
                    <Typography variant="body2" color='#FFFFFF'>
                        {review.review}
                    </Typography>
                </Box> 


                <Box style = {{position: 'absolute', left: 16, top: 75}}> 
                    {upvoted && <IconButton 
                    className = "upvoteButton"
                    onClick = {() => 
                        Upvote(review.rid, review.upvote+1)
                    } 

                    sx={{
                        "&:hover": {
                        backgroundColor: '#a4f7a4',
                        }
                    }}
                    style={{ 
                        color: '#32CD32',
                        maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
                    }}
                    
                    ><KeyboardArrowUpRoundedIcon/></IconButton>}
                

                    {!upvoted && <IconButton 
                    className = "upvoteButton"
                    onClick = {() => 
                        Upvote(review.rid, review.upvote+1)
                    } 

                    sx={{
                        "&:hover": {
                        backgroundColor: '#a4f7a4',
                        }
                    }}
                    style={{ 
                        color: 'white', 
                        maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
                    }}
                    
                    ><KeyboardArrowUpRoundedIcon/></IconButton>}
                </Box> 

                {downvoted && <Box style = {{position: 'absolute', left: 16, top: 105}}> 
                    <Avatar sx={{color: '#f44336', width: 30, height: 30, fontSize: "1rem", backgroundColor: 'transparent'}}>{review.upvote - review.downvote}</Avatar>
                </Box>}
                {upvoted && <Box style = {{position: 'absolute', left: 16, top: 105}}> 
                    <Avatar sx={{color: '#32CD32', width: 30, height: 30, fontSize: "1rem", backgroundColor: 'transparent'}}>{review.upvote - review.downvote}</Avatar>
                </Box>}

                {!upvoted && !downvoted && <Box style = {{position: 'absolute', left: 16, top: 105}}> 
                    <Avatar sx={{color: 'white', width: 30, height: 30, fontSize: "1rem", backgroundColor: 'transparent'}}>{review.upvote - review.downvote}</Avatar>
                </Box>}

                <Box style = {{position: 'absolute', left: 16, top: 135}}>
                    {!downvoted && <IconButton
                    className = "downvoteButton"
                    onClick = {() => Downvote(review.rid, review.downvote+1)} 

                    sx={{
                        "&:hover": {
                        backgroundColor: '#f5928a',
                        }
                    }}
                    style={{ 
                        color: 'white',
                        maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
                    }}

                    ><KeyboardArrowDownRoundedIcon/></IconButton>}

                    {downvoted && <IconButton
                    className = "downvoteButton"
                    onClick = {() => Downvote(review.rid, review.downvote+1)}

                    sx={{
                        "&:hover": {
                        backgroundColor: '#f5928a',
                        }
                    }} 
                    style={{ 
                        color: '#f44336',
                        maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
                    }}

                    ><KeyboardArrowDownRoundedIcon/></IconButton>} 
                </Box> 

                <Box style = {{position: 'absolute', left: 290, top: 0}}> 
                    {(review.uid == user.uid) && <IconButton 
                        onClick={() => deleteData(review.rid)}
                        sx={{
                            "&:hover": {
                            backgroundColor: '#f5928a',
                            }
                        }} 
                        style={{ 
                            color: '#f44336',
                            maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
                        }}
                    ><DeleteForeverIcon/></IconButton>}

                    
    
                </Box>

            </CardContent>
            </Card>
        </Box>
    ) 
} 

export default SingleReview
