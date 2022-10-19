import { useState } from "react";


function Movie_ID() {


    const [setDetails] = useState({
        title: "",
        year: ""
    });

    // Fetch the details of the movie.
    const fetchDetails = (mid) => {
        fetch(`http://localhost:8000/fetch_movie_detail/0/${mid}`).then((res) => {
            return res.json();
        }).then((data) => {
            setDetails(details => ({...details, title: data.title, year: data.start_year}));
        })
    }

    return (
        <div>

        </div>
    )
}

export default Movie_ID;