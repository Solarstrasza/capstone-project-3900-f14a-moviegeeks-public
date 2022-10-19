import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import "./stylesheets/profile.css";
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Reviews from "./userReviews";
import Button from '@mui/material/Button';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';


function PostInfo () {
    
    let {uid, name} = useParams();

    
    const [user] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState({
        uid: "",
        username: "",
        info: "",
    }); 
    
    const handleChange = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value});
    }; 

    const handleSubmit = (event) => {
        fetch(`http://localhost:8000/profile/description/add/`, {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: {"Content-type": "application/json"}
        })
        console.log(userInfo)
        setUserInfo({ uid: "", username: "", info: ""});
    }


    const [info, showInfo] = useState([])

    const fetchData = () => { 
          fetch(`http://localhost:8000/profile/description/show/${uid}`)
          .then((response) => {
              return response.json()
          })
          .then((data) => { 
              showInfo(data) 
          })   
      } 
        
      useEffect(() => {
          fetchData()
      }, [uid]) 


	const [count, showReviewCount] = useState([])

    const fetchReviewCount = () => { 
          fetch(`http://localhost:8000/review/count/${uid}`)
          .then((response) => {
              return response.json()
          })
          .then((data) => { 
              showReviewCount(data) 
          })   
      } 
        
      useEffect(() => {
          fetchReviewCount()
      }, [uid]) 
      

    

    const [selectedFile, setSelectedFile] = useState(null);
    const [setIsFilePicked] = useState(false);
  
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };
    
    const handleProfilePhotoSubmit = (event) => {
      const formData2 = new FormData();
      formData2.append(
        "file" , 
        selectedFile,
        selectedFile.name
      );
      
   
		fetch(`http://localhost:8000/profile-picture/upload/${user.uid}`, {
			method: "POST",
			body: formData2,
		})
		.then((response) => response.json())
		.then(function (response) {
			console.log(response)
		});
    }

    const SubmitButton = (props) => ( <button {...props} type='submit' /> );

	const PhotoUpload = (props) => ( <button {...props} type='submit' /> );


    const [img, setImgData] = useState('');

    const fetchImage = () => {
        fetch(`http://localhost:8000/profile-picture/${uid}?`+ new URLSearchParams({ time: Date.now() }).toString())
            .then(response => response.blob())
            .then((image) => {
                // Create a local URL of that image
                const localUrl = URL.createObjectURL(image);
                setImgData(localUrl);
            });
    } 

    useEffect(() => {
        fetchImage();
    }, [uid]) 


    const [average, showUserAverage] = useState([])
    const fetchUserAverage = () => {
        fetch(`http://localhost:8000/profile/rating/${uid}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => { 
                showUserAverage(data) 
            })
    }

    useEffect(() => {
        fetchUserAverage();
    }, [])


    
    if (!user) {
      return ("Sign in to add a profile description! ") 
    
    } else {
    	return (
			<div className = "user-info-container"> 
				
				<div className="profile-left">
					<div style={{display: 'flex', marginLeft: 16, marginRight: 16, padding: 10}}>
						<div> 
							<Avatar
								src={img}
								sx={{width: 67, height: 67, }}
							/>
							<form onSubmit={handleProfilePhotoSubmit} > 
								<Button sx={{fontSize:8, width:6, height:6, position: 'absolute', left:41, top: 90, color: 'white', border: 'white'}} disableRipple startIcon={<AddAPhotoRoundedIcon sx={{width:12, height: 12, color: 'white'}} />} component="label">
									<input style={{display:'none', cursor:'pointer'}} id = "upload" hidden accept=".jpeg, .png, .jpg" type="file" onChange={changeHandler} />
										<label style = {{cursor: 'pointer', color:'white', }} for="upload">
											Upload
										</label>
								</Button>
								<br />
								<Button 
									startIcon={<FileUploadRoundedIcon sx={{width:12, height: 12}}/>} 
									component={PhotoUpload}
									sx={{fontSize:8, width:6, height:6, position: 'absolute', left:40, top: 110, color: 'white', border: 'white'}}>
										Submit 
								</Button>
							</form>
						</div>
						<div style = {{position: 'relative', textAlign: 'center', marginLeft: 20, marginTop: 10, width: 300, paddingTop:10}}>
							<div style = {{fontSize: 20, color: 'white'}}>{name}'s Profile Description</div> 
						</div>
					</div>
					
					<form onSubmit={handleSubmit}> 
						<div style = {{ display: 'flex'}}>
							<TextField fullHeight
								className = "userInfoDisplay"
								type="text"
								name="info"
								value={info}
								multiline = {true}
								inputProps={{ style: { color: "white" } }}
								sx = {{marginTop: 2, backgroundColor: 'black', marginLeft: 1, marginRight: 0, maxWidth: 408
							}}
							/>
						</div>
						<br />
						{(uid == user.uid) && <hr />}
						<div>
						<input
							type="hidden"
							name="uid"
							placeholder="user ID"
							value={userInfo.uid = user.uid}
							onChange={handleChange}
						/>
						</div>

						<div>
						<input
							type="hidden"
							name="username"
							placeholder="username"
							value={userInfo.username = user.displayName}
							onChange={handleChange}
						/>
						</div>
						
						
						{(uid == user.uid) && <div style = {{display: 'flex'}}>
						<TextField
							className = "userInfoForm"
							type="text"
							multiline = {true}
							rows={3}
							name="info"
							placeholder="Type your updated profile description here!"
							value={userInfo.info}
							onChange={handleChange}
							inputProps={{ style: { color: "white" } }}
							sx = {{marginTop: 2, backgroundColor: '#5B5B5B', marginLeft: 2, marginRight: 2, width: 388}}
						/>
						</div>}
						{(uid == user.uid) && <div style = {{position: 'relative', top: 20}}>

							<Button 
								variant="contained" 
								component={SubmitButton}
								sx={{
									width: 388,
									marginLeft: 2,
									marginRight: 2,
									bgcolor: '#5B5B5B',
									contrastText: '#fff',
									':hover': {
										bgcolor: "#DDDDDD",
										color: 'black',
									},
								}}>
								Update Profile Description
							</Button>

						</div>}

					</form>
					 
				
					<div className = "average-rating" style = {{marginLeft: 15, color: 'white', position: 'relative', top: 10, width: 189, height: 70, padding: 7}}>
								Average rating: {Math.round(average*100)/100} 
							<br/>
							<Rating style={{color: "#FFD700"}} value={average} readOnly precision={0.1} size="large"/>
					</div>

					<div className = "post-count" style = {{marginLeft: 215, color: 'white', position: 'absolute', bottom: 21, width: 189, height: 70, padding: 10}}>
							Review Count 
							<br/>
							<font style = {{fontSize:21}}>{count}</font>
					</div>
					
				</div>

								

				<div className = "profile-right">
					<Reviews/>
					
				</div>

				
				
			</div>				
        );
    }
}

export default PostInfo