import React, { useEffect } from 'react'
import Dashboard from '../sidebar/Dashboard'
import { useState, useCallback, useMemo } from "react";
// import { FaStar, FaUser, FaCheck, FaImage } from "react-icons/fa";
import { format } from "date-fns";
import axios from '../axios'
import StarIcon from '@mui/icons-material/StarBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ImageIcon from '@mui/icons-material/Image';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useForm } from 'react-hook-form';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
function AddReviews() {

    // const [reviews, setReviews] = useState([
    //     {
    //       id: 1,
    //       name: "John Doe",
    //       rating: 4.5,
    //       comment: "Excellent product! Really satisfied with the quality.",
    //       timestamp: new Date(),
    //       helpful: 12,
    //       verified: true,
    //       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"
    //     },
    //     {
    //       id: 2,
    //       name: "Alice Smith",
    //       rating: 5,
    //       comment: "Perfect! Exceeded my expectations.",
    //       timestamp: new Date(),
    //       helpful: 8,
    //       verified: true,
    //       avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1"
    //     }
    //   ]);
    
      const [newReview, setNewReview] = useState({
        name: "",
        rating: 0,
        comment: "",
        image: null
      });
      const [showReviews, setShowReviews] = useState(false);
    
      const [playerReviews, setPlayerReviews] = useState([]);
      const [reviews, setReviews] = useState([]);
      const [averageRating, setAverageRating] = useState(0);
      const [sortBy, setSortBy] = useState("recent");
      const coach_id = localStorage.getItem("coach_record");
    
      const getPlayerRecord = async () => {
        try {
          const response = await axios.get(`rating_reviews/${coach_id}`);
          if (response.data && Array.isArray(response.data.reviews)) {
            setPlayerReviews(response.data.reviews);
            setReviews(response.data.reviews);
  
            // Calculate average rating
            const totalRating = response.data.reviews.reduce(
              (acc, review) => acc + review.rating,
              0
            );
            const avgRating = totalRating / response.data.reviews.length;
            setAverageRating(avgRating);
          } else if (response.data && response.data.reviews) {
            setPlayerReviews([response.data.reviews]);
          }
        } catch (error) {
          console.error("Error fetching player reviews:", error);
        }
      };

      useEffect(() => {
        getPlayerRecord();
      }, [coach_id]);


      const handleSort = (criteria) => {
        let sortedReviews = [...playerReviews];
        if (criteria === "recent") {
          sortedReviews.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        } else if (criteria === "rating") {
          sortedReviews.sort((a, b) => b.rating - a.rating);
        } else if (criteria === "helpful") {
          // Assuming you have a helpfulVotes property
          sortedReviews.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
        }
        setReviews(sortedReviews);
      };
    
     
    
      useEffect(() => {
        handleSort(sortBy);
      }, [sortBy]);
    
      const [loading,setLoading] = useState(false);
      const [hoveredRating, setHoveredRating] = useState(0);
      const [error, setError] = useState("");
    
      const handleRatingHover = (rating) => {
        setHoveredRating(rating);
      };
    
      const handleRatingClick = (rating) => {
        setNewReview(prev => ({ ...prev, rating }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!newReview.rating || !newReview.comment) {
          setError("Please provide both rating and comment");
          return;
        }
    
        const review = {
          id: Date.now(),
          ...newReview,
          timestamp: new Date(),
          helpful: 0,
          verified: Math.random() > 0.5
        };
    
        setReviews(prev => [review, ...prev]);
        setNewReview({ name: "", rating: 0, comment: "", image: null });
        setError("");
      };
    
      const handleHelpful = useCallback((id) => {
        setReviews(prev =>
          prev.map(review =>
            review.id === id ? { ...review, helpful: review.helpful + 1 } : review
          )
        );
      }, []);

      const player_id = localStorage.getItem('player_id');
      const coach_record = localStorage.getItem('coach_record');



      const Addreview = async () => {
        if (!newReview.rating || !newReview.comment) {
          setError("Please provide both a rating and a comment.");
          return;
        }
      
        setLoading(true);
        setError("");
      
        try {
          const response = await axios.post("/rating_reviews", {
            rating: newReview.rating,
            reviews: newReview.comment,
            player_id: player_id,
            coach_id: coach_record,
          });
      
          if (response.data.success) {
            // alert(response.data.message);
            setNewReview({ rating: 0, comment: "" });
            setHoveredRating(0);
          }
          getPlayerRecord();
        } catch (error) {
          setError(
            error.response?.data?.message || "An error occurred while submitting your review."
          );
        } finally {
          setLoading(false);
        }
      };
    return (
    <>
        <Dashboard>
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
        <div className="flex items-center gap-4 mb-2">
            {playerReviews.length > 0 && playerReviews[0].coach?.image ? (
                <img
                src={`http://127.0.0.1:8000/uploads/coach_image/${playerReviews[0].coach.image}`}
                alt="Coach"
                style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "5px",
                    padding: "5px",
                    border: "1px solid #ddd",
                }}
                />
            ) : (
                <span>No coach image available</span>
            )}
        </div>

        <div className="flex items-center gap-4">
        <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
        <div>
          <div className="flex text-yellow-400 mb-1">
            {[1, 2, 3, 4, 5].map((num) => (
              <StarIcon
                key={num}
                className={num <= averageRating ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">{reviews.length} reviews</div>
        </div>
        </div>
      </div>

      <form
    onSubmit={(e) => {
      e.preventDefault();
      Addreview();
    }}
    className="mb-8 p-6 bg-gray-50 rounded-lg"
  >
    <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

    {error && <div className="text-red-500 mb-4">{error}</div>}

    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Rating</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            onMouseEnter={() => handleRatingHover(num)}
            onMouseLeave={() => handleRatingHover(0)}
            onClick={() => handleRatingClick(num)}
            className="text-2xl transition-colors"
          >
            <StarIcon
              className={`${
                num <= (hoveredRating || newReview.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Review</label>
      <textarea
        value={newReview.comment}
        onChange={(e) =>
          setNewReview((prev) => ({ ...prev, comment: e.target.value }))
        }
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        rows="4"
        placeholder="Share your experience..."
        maxLength="500"
      ></textarea>
    </div>

    <button
      type="submit"
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
      disabled={loading}
    >
      {loading ? "Submitting..." : "Submit Review"}
    </button>
  </form>

  <div>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold">All Reviews</h3>
        <select
          value={showReviews ? "reviews" : "hide"}
          onChange={(e) => setShowReviews(e.target.value === "reviews")}
          className="p-2 border rounded"
        >
          <option value="hide">Hide</option>
          <option value="reviews">Reviews</option>
        </select>
      </div>

            <div
        className={`transition-all duration-500 ease-in-out ${
            showReviews ? "max-h-auto opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
        >

        <div className="space-y-4">
          {playerReviews.map((review, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              {/* Player Info */}
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={`http://127.0.0.1:8000/uploads/player_image/${review.player?.image}`}
                  alt="Player"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{review.player?.player_name}</div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(review.created_at), "MMM d, yyyy")}
                  </div>
                </div>
                <div className="ml-auto flex items-center text-green-600">
                  <CheckCircleIcon className="w-5 h-5 mr-1" />
                  <span className="text-sm">Verified Reviews</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex text-yellow-400 mb-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <StarIcon
                    key={num}
                    className={num <= review.rating ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-3">{review.reviews}</p>

              {/* Helpful Button */}
              <button className="text-sm text-gray-600 mt-2 hover:text-blue-600 transition-colors">
                Helpful (0)
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    
        </Dashboard>
    </>
  )
}

export default AddReviews