import { useEffect, useState } from 'react';
import * as React from 'react';
import { Link, useParams} from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../components/Auth";
import IconButton from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BlockIcon from '@mui/icons-material/Block';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import "../../pages/stylesheets/movieInfo.css"


function SingleReview({rid}) {

    const [review, showMovieReviews] = useState([])
    const [user] = useAuthState(auth);
    
    const fetchData = () => { 
        fetch(`http://localhost:8000/review/get/${rid}`)
        .then((response) => {
            return response.json()
        }) 
        .then((data) => { // data is an object
            console.log(data)
            showMovieReviews(data) // passing in array movie_info_list 
        })   
    } 
    
    useEffect(() => {
        fetchData()
    }, []) 

    
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
    const banReviewer = () => { 
        fetch(`http://localhost:8000/ban/add_ban/${user.uid}/${review.uid}/${review.name}`,{method: "POST"})
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
        .then((data) => { // data is an object
            checkUpvoted(data) // passing in array movie_info_list 
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
        .then((data) => { // data is an object
            checkDownvoted(data) // passing in array movie_info_list 
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
                // Create a local URL of that image
                const localUrl = URL.createObjectURL(image);
                setImgData(localUrl);
            });
    }, [review.uid]);





    let {mid} = useParams();
    const [reviewInfo, setReviewInfo] = useState({
        rid: "",
        name: "",
        uid: "",
        mid: "",
        rating: "",
        upvote: "",
        downvote: "",
        review_date: "",
        review: "",
    }); 

    const handleChange = (event) => {
        setReviewInfo({ ...reviewInfo, [event.target.name]: event.target.value});
    }; 

    const handleSubmit = (event) => {
        fetch(`http://localhost:8000/addReview/`, {
            method: "POST",
            body: JSON.stringify(reviewInfo),
            headers: {"Content-type": "application/json"}
        })
        console.log(reviewInfo)
        setReviewInfo({ rid: "", name: "", uid: "", mid: "", rating: "", upvote: "", downvote: "", review_date: "", review: ""});
    } 

  
    
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    reviewInfo.review_date = date;
    reviewInfo.upvote = 0;
    reviewInfo.downvote = 0; 

    const UUID = require('uuid-int');
    const id = 0;
    const generator = UUID(id);
    const uuid = generator.uuid();

    const [setLoading] = React.useState(true);
    function handleClick() {
        setLoading(true);
    }


    const [stars, setStars] = useState();

    var example = {
      size: 20,
      value: stars,
      onChange: (newValue) => {
        setStars(newValue);
      }
    };
    reviewInfo.rating = example.value

    if (rid == 0) {
        return (
            <Box className = "reviewContainer">
            <Card sx={{ 
                height: 180, 
                width: 340,
                bgcolor: '#000000',
                boxShadow: 1,
                borderRadius: 2,
                position: 'relative',
            }}>
            <CardContent>
                

                <Box style = {{
                    position: 'absolute', left: 27, top: 9, 
                        width: 295, height: 215
                }}>
                    <Box style = {{textDecoration: 'none', position: 'absolute', left: 2, top: 0}}>
                            <Typography sx={{ fontSize: 18}} color='#FFFFFF' gutterBottom>
                                Add Review
                            </Typography>
                    </Box>
                    <Typography variant="body2" color='#FFFFFF'>
                    <form onSubmit={handleSubmit}> 
                        <div>
                            <input
                            type="hidden"
                            name="rid"
                            placeholder="Review ID"
                            value={reviewInfo.rid = uuid}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                            type="hidden"
                            name="name"
                            placeholder="Name"
                            value={reviewInfo.name = user.displayName}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                            type="hidden"
                            name="uid"
                            placeholder="User ID"
                            value={reviewInfo.uid = user.uid}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                            type="hidden"
                            name="mid"
                            placeholder="Movie ID"
                            value={reviewInfo.mid = mid}
                            onChange={handleChange}
                            />
                        </div>

                        <Box style = {{
                            position: 'relative', left: 189, top: 0
                                
                        }}>
                            <ReactStars {...example} />
                        </Box>
                        
                        <div>
                            <input
                            type="hidden"
                            name="upvote"
                            placeholder="Upvote"
                            value={reviewInfo.upvote}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                            type="hidden"
                            name="downvote"
                            placeholder="Downvote"
                            value={reviewInfo.downvote}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                            type="hidden"
                            name="review_date"
                            placeholder="Review Date"
                            value={reviewInfo.review_date}
                            onChange={handleChange}
                            />
                        </div>
                        
                        <Box style = {{position:'relative', top: 0}}>

                                <TextField
                                className = "userInfoForm"
                                    multiline = {true}
                                    rows={2.9}
                                    inputProps={{ style: { color: "white" } }}
                                    className = "reviewForm"
                                    style = {{background: '#5B5B5B', width: 286}}
                                    id = "reviewinput"
                                    type="textarea"
                                    name="review"
                                    placeholder="Type your review here"
                                    value={reviewInfo.review}
                                    onChange={handleChange}
                                    text-align = "right"
                                />
                        </Box>

                        <Box style = {{position:'absolute', top: 138}} >
                            <Button
                                variant="contained"
                                type = "submit"
                                sx={{
                                    bgcolor: '#5B5B5B',
                                    contrastText: '#fff',
                                    width: 286,
                                    height: 22,
                                    fontSize: 12,
                                    ':hover': {
                                        bgcolor: "#DDDDDD", // theme.palette.primary.main
                                        color: 'black',
                                    },
                                }}
                                >
                                Submit Review
                            </Button>
                        </Box>
                    </form>
                    </Typography>
                </Box> 


                

            </CardContent>
            </Card>
        </Box>
        )
    }    

    if (!review.rating || !img ) {
        return "loading reviews"
    }
        

    return(
        <Box className = "reviewContainer">
            <Card sx={{ 
                height: 180, 
                width: 340,
                bgcolor: '#000000',
                boxShadow: 1,
                borderRadius: 2,
                position: 'relative',
            }}>
            <CardContent>

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

                <Box style = {{position: 'absolute', left: 300, top: 10}}> 
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

                    {(review.uid != user.uid) && <IconButton 
                        onClick={() => banReviewer(user.uid, review.uid, review.name)}
                        sx={{
                            "&:hover": {
                            backgroundColor: '#f5928a',
                            }
                        }} 
                        style={{ 
                            color: '#f44336',
                            maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'
                        }}
                    ><BlockIcon/></IconButton>}
    
                </Box>

            </CardContent>
            </Card>
        </Box>
    ) 
} 

export default SingleReview
