import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../components/Auth";
import "./stylesheets/wishlistStyle.css";


function PostReview () {
    let {mid} = useParams();
    const [user] = useAuthState(auth);
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

    const [stars, setStars] = useState();

    var example = {
      size: 30,
      value: stars,
      onChange: (newValue) => {
        setStars(newValue);
      }
    };
    
    reviewInfo.rating = example.value
    if (!user) {
      return ("Sign in to leave a review! ") 
    } else {
      return (
          <div className="form-container">
            <form onSubmit={handleSubmit}> 
              <div>
                <h2>Add Review</h2>
              </div>
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

              <div className="App">
                <ReactStars {...example} />
              </div>
              
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
              <div>
                <input
                  className = "reviewForm"
                  type="text"
                  name="review"
                  placeholder="Type your review here"
                  value={reviewInfo.review}
                  onChange={handleChange}
                  text-align = "right"
                  rows={5}
                  cols={5}
                />
              </div>
              <div>
                <button>Submit Review</button>
              </div>
            </form>
          </div>
        );
    }
}

export default PostReview