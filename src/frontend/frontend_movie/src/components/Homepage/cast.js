import { useEffect, useState} from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import Cast from "../../pages/castPhoto"
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';





export default function RecentMovies({title, id}) {
    const [cast, showCast] = useState([])

    const searchCast = async() => {
        await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c3479c45c6010dfb319659420dbf9c35&language=en-US`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { 
            showCast(data.cast) 
        })  
    } 

      useEffect(() => {
        searchCast() 
    }, [id]) 

  


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

   
    

    if (!cast.length) {
      return (<div> <br/> </div>)
    }
    return (
        
        <div className = "cast-list" style = {{marginTop:450, position: 'relative'}}>
            <Button style={{height: 30, pointerEvents: 'none'}} 
                variant="text" 
                scrollButtonsscrollButtons
                sx={{ color: "white", position: "flex", top: 20, left: 60, fontWeight: '550', fontSize: 17 }}
            > Cast of {title}
            </Button>
            <Box
              display="flex"
              minHeight="0vh"
              flexDirection= "row"
            >  

              <ImageList sx={{ 
                width: "max-content", 
                maxHeight: 600,
                margin: 1,
                display: "flex",
                flexDirection: "row",
                position: "flex",
                textAlign: "center",
                whiteSpace: "normal",
                fontSize: 12,
                }} cols={4} gap = {50}>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons = {true}
                    allowScrollButtonsMobile
                    aria-label="scrollable auto tabs example"
                    TabIndicatorProps={{style: {backgroundColor: "transparent"}}}
                >
              {cast.map((item) => (
                <ImageListItem sx = {{padding: 2}}key={item.profile_path}>
                    <Cast path = {item.profile_path} name = {item.original_name} char = {item.character}/>
                    
                </ImageListItem>
                ))}
                </Tabs>
              </ImageList>
            </Box>
            </div>
    );
    
  }
  
