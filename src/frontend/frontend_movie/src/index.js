import ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Register from "./pages/register";
import Movie from "./pages/movie";
import Navbar from "./components/Navbar/index";
import MovieInfo from "./pages/movieInfo";
import Reviews from "./pages/reviews";
import Profile from "./pages/profile";
import Recommended from "./pages/recommended";
import Users from "./pages/users";
import Reset from "./pages/reset";
import Search from "./components/Search/Search";
import SimilarUsers from "./pages/similarUsers";
import './pages/stylesheets/font.css';


const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="movies" element={<Movie/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="fetch_movie_detail/:uid/:mid" element={<MovieInfo/>}/>
            <Route path="/reviews/:mid" element={<Reviews/>}/>
            <Route path="recommended/:uid" element={<Recommended/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="reset" element={<Reset/>}/>
            <Route path="query=:query" element={<Search />}/>
            <Route path="query=" element={<Search />}/>
            <Route path="/profile/:uid/:name" element={<Profile/>}/>
            <Route path="similarUsers" element={<SimilarUsers/>}/>
        </Routes>
    </BrowserRouter>
);
