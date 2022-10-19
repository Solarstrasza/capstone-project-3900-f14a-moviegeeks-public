import {Text} from './stylesheets/movie';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import SimilarUsersList from "./similarUsersList";

export default function SimilarUsers() {
    let {uid} = useParams();
    const [user] = useAuthState(auth);
    const[showSimilarUsers] = useState([])
    const fetchData = () => { 
        fetch(`http://localhost:8000/recommend/users/${user.uid}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => { // data is an object
            console.log(data)
            showSimilarUsers(data) // passing in array movie_info_list 
        })   
    } 
    
    useEffect(() => {
        fetchData()
    }, []) 

    return (
        <main style={{ padding: "1rem 0" }}>
          
              <Text>Similar Users</Text>
              <SimilarUsersList/>  
          
        </main>
      );
  }