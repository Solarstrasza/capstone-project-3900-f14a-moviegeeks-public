import "./stylesheets/homepage.css";
import { useNavigate } from "react-router-dom";

function Homepage() {

    let navigate = useNavigate();

    return(
        <div className = "home">
            <div className = "grid">
                <div className = "tile-background">
                    <h1>Deciding what to watch?</h1><br />
                    Browse and discover from over 10,000 movies!<br />

                    <div className = "button-homepage" onClick = {() => navigate("/movies")}>START EXPLORING!</div>
                </div>
                <div className = "tile">
                    <div className = "grid-columns">
                        <div className = "text-homepage">
                            <h3>Tired of bad recommendations?</h3>
                            Tons of websites offer recommendations but fail to provide good ones. Instead of picking movies for you, we make it super easy to discover great stuff yourself.
                        </div>
                        <div className = "text-homepage">
                            <h3>There's a better way to discover.</h3>
                            We've collected movie data from around the web so you don't have to. Just tell us what kind of movies you're looking for and we'll give you the best there are.
                        </div>
                        <div className = "text-homepage">
                            <h3>Switching to Movie Geeks is easy.</h3>
                            Just tell us what kind of movies you're looking for and we'll give you the best there are.
                        </div>
                    </div>
                </div>

                <div className = "tile-style">
                    <div>
                        <h1 className = "tile-text">
                            One list to rule them all.
                        </h1>
                        <p className = "tile-text-p">See something you like? Save it to your wishlist in one click!</p>
                    </div>
                    <div className = "text-homepage-wishlist" />
                </div>
            </div>
        </div>
    )
}

export default Homepage;