import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useParams} from 'react-router-dom';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import Favourites from "./favourites"
import Wishlist from "./wishlist"
import UserInfo from "./userInfo"
import BannedReviewers from "./bannedReviewers"
import "./stylesheets/profile.css"; 

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Profile() {

    let {uid, name} = useParams();

    const [value, setValue] = React.useState(0);

    const [user] = useAuthState(auth);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [showUserAverage] = useState([])
      



    const fetchUserAverage = () => {
        fetch(`http://localhost:8000/profile/rating/${uid}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => { // data is an object
                showUserAverage(data) // passing in array movie_info_list
            })
    }

    useEffect(() => {
        fetchUserAverage();
    }, [])


    if (!user) {
        return ("Loading")
    }
    else if(user.uid != uid){
        return (
            <Box sx={{width: '100%'}}>

                <Box sx={{borderBottom: 1, borderColor: 'divider', paddingTop: 1}}>
                    

                    <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        aria-label="basic tabs example" centered
                        TabIndicatorProps={{style: {background: "white", textColor: "white"}}}
                        >
                        <Tab disableRipple sx = {{color: "white"}} label={<span style={{ color: 'white' }}>Profile</span>} {...a11yProps(0)} />
                        <Tab disableRipple sx = {{color: "white"}} label={<span style={{ color: 'white' }}>Wishlist</span>} {...a11yProps(1)} />
                        <Tab disableRipple sx = {{color: "white"}} label={<span style={{ color: 'white' }}>Favourites</span>} {...a11yProps(2)} />
                        
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <UserInfo/>
                </TabPanel>
                <TabPanel value={value} index={0}>
                </TabPanel>

                <TabPanel value={value} index={0}>
                    
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className='profileTitle'>
                    <h1 style = {{color: 'white'}}>{name}'s Wishlist </h1>
                    </div>
                    <Wishlist/>
                </TabPanel>
                
                <TabPanel value={value} index={2}>
                    <div className='profileTitle'>
                    <h1 style = {{color: 'white'}}>{name}'s Favourites </h1>
                    </div>
                    <Favourites/>
                </TabPanel>
                
                
            </Box>
        );
    } else {
        return (
            <Box sx={{width: '100%'}}>

                <Box sx={{borderBottom: 1, borderColor: 'divider', paddingTop: 1}}>
                    

                    <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        aria-label="basic tabs example" centered
                        TabIndicatorProps={{style: {background: "white", textColor: "white"}}}
                        >
                        <Tab disableRipple sx = {{color: "white"}} label={<span style={{ color: 'white' }}>Profile</span>} {...a11yProps(0)} />
                        <Tab disableRipple sx = {{color: "white"}} label={<span style={{ color: 'white' }}>Wishlist</span>} {...a11yProps(1)} />
                        <Tab disableRipple sx = {{color: "white"}} label={<span style={{ color: 'white' }}>Favourites</span>} {...a11yProps(2)} />
                        <Tab disableRipple sx = {{color: "white"}} label={<span style={{ color: 'white' }}>Banned Reviewers</span>} {...a11yProps(3)}/>
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <UserInfo/>
                </TabPanel>
                <TabPanel value={value} index={0}>
                    
                </TabPanel>

                <TabPanel value={value} index={0}>
                    
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className='profileTitle'>
                    <h1 style = {{color: 'white'}}>{name}'s Wishlist </h1>
                    </div>
                    <Wishlist/>
                </TabPanel>
                
                <TabPanel value={value} index={2}>
                    <div className='profileTitle'>
                    <h1 style = {{color: 'white'}}>{name}'s Favourites </h1>
                    </div>
                    <Favourites/>
                </TabPanel>
                
                <TabPanel value={value} index={3}>
                    <div className='profileTitle'>
                   <h1 style = {{color: 'white'}}>{name}'s Banned Reviewers</h1>
                   </div>
                   <BannedReviewers/>
                </TabPanel>
            </Box>
        );
    }
}

