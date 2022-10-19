
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import "./stylesheets/movieInfo.css";




function CastPhoto({path, name, char}) {
    if (path == null) {
        return (
            <div>                   
                <img id = "castPhoto" src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"></img>
                <div id = "castInfo">
                    <p id = "castName">{name}</p>
                    <p id = "castCharacter">{char}</p>
                    
                </div>
            </div>
        )
    }

    return (
        <div>                   
            <img id = "castPhoto" src = {`http://image.tmdb.org/t/p/w500//${path}`} ></img>
            <div id = "castInfo">
                <p id = "castName">{name}</p>
                <p id = "castCharacter">{char}</p>
                
            </div>
        </div>
    )
    
}

export default CastPhoto
