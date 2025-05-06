import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { RotatingLines } from "react-loader-spinner";
import Footer from "./Footer";
import Map, { Marker } from "react-map-gl";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/StarBorder";
import { format } from "date-fns";

function CoachDetail() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [coordinates, setCoordinates] = useState({});
  const navigate = useNavigate();
  const [showReviews, setShowReviews] = useState(false);
  // Coach Reviews Rating

  const role = localStorage.getItem('role')
  const [playerReviews, setPlayerReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [sortBy, setSortBy] = useState("recent");
  // const {coach_id} = useParams(); 

  const getPlayerRecord = async () => {
    try {
      const response = await axios.get(`rating_reviews/${id}`);
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
  }, [id]);

  const handleSort = (criteria) => {
    let sortedReviews = [...playerReviews]; // Always use original data

    if (criteria === "recent") {
      sortedReviews.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (criteria === "rating") {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (criteria === "helpful") {
      sortedReviews.sort((a, b) => b.helpful - a.helpful);
    }

    setReviews(sortedReviews); // Update displayed reviews
  };

  useEffect(() => {
    if (sortBy) {
      handleSort(sortBy);
    }
  }, [sortBy, playerReviews]);


  const player_id = localStorage.getItem("player_id");
  const coach_record = localStorage.getItem("coach_record");

  // Coach Reviews Rating

  const getPost = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`/showBlogPost/${id}?page=${page}`);
      if (
        response.data &&
        response.data.post &&
        Array.isArray(response.data.post.data)
      ) {
        const postList = response.data.post.data;
        setPosts(postList);
        setPagination(response.data.post);
        // Initialize coordinates for each post
        const coordPromises = postList.map((post) =>
          fetchCoordinates(post.post_location)
        );

        // Resolve all coordinate promises and set state
        const allCoordinates = await Promise.all(coordPromises);
        const coordMap = postList.reduce((acc, post, index) => {
          acc[post.id] = allCoordinates[index];
          return acc;
        }, {});
        setCoordinates(coordMap);
      } else {
        console.error("Unexpected API response structure.");
      }
      setLoader(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoader(false);
    }
  };

  const fetchCoordinates = async (location) => {
    if (!location) return null;
    try {
      const apiKey =
        "pk.eyJ1IjoidW1lcndhbGkiLCJhIjoiY20ycGM0aWRrMGxmYjJtc2N2eWRvZHNpNiJ9._eLwWDk871QbnYrq8lcOkw";
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          location
        )}.json?access_token=${apiKey}`
      );
      const data = response.data;
      if (data && data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].geometry.coordinates;
        return { latitude: lat, longitude: lng };
      }
      console.error(`No results found for location: ${location}`);
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  useEffect(() => {
    getPost();
  }, [id, page]);

  const renderPaginationLinks = () => (
    <nav aria-label="Page navigation example">
      <ul className="flex float-right -space-x-px h-8 text-sm">
        {pagination.links?.map((link, index) => (
          <li key={index}>
            <button
              className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                link.active
                  ? "z-10 text-indigo-600 border-indigo-300 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700"
                  : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              } rounded-${index === 0 ? "s-lg" : index === pagination.links.length - 1 ? "e-lg" : ""}`}
              onClick={() => {
                if (link.url) {
                  const url = new URL(link.url);
                  const pageNum = url.searchParams.get("page");
                  setPage(Number(pageNum));
                }
              }}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );

  const loadingEvent = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate(`/schedule/${id}`);
    }, 1000);
  };

  return (
    <>
      {loader ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        <div>
          <Nav />

          <div className="text-center mt-10 mb-10">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Coach <span className="text-indigo-600">Events</span>
            </h3>
          </div>

          {posts.length > 0 ? (
            posts.map((post, key) => (  
              <div
  key={key}
  className="bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-5 gap-6 p-6 mt-10 items-center"
>
  {/* Image - smaller/medium size */}
  <div className="md:col-span-1 flex justify-center items-center">
    <img
      src={`http://127.0.0.1:8000/uploads/coach_posts/${post.post_image}`}
      alt="Coach Post"
      className="w-52 h-48 object-cover rounded-md"
    />
  </div>

  {/* Text content */}
  <div className="md:col-span-3 flex flex-col justify-between">
    <div>
      <h2 className="text-xl font-semibold mb-2">{post.post_title}</h2>
      <p className="text-gray-700 text-sm mb-4">{post.post_description}</p>
    </div>

    <div className="flex justify-between items-center border-t pt-3 text-sm text-gray-600">
      <div className="flex items-center space-x-1">
        <AccessTimeIcon className="text-gray-500" fontSize="small" />
        <span>
          {(() => {
            const postTime = new Date(post.post_time + " UTC");
            const timeDiff = Date.now() - postTime.getTime();
            const seconds = Math.floor(timeDiff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const weeks = Math.floor(days / 7);
            if (seconds < 60) return "Just now";
            if (minutes < 60)
              return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
            if (hours < 24)
              return `${hours} hour${hours > 1 ? "s" : ""} ago`;
            if (days < 7)
              return `${days} day${days > 1 ? "s" : ""} ago`;
            return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
          })()}
        </span>
      </div>

      <div className="flex items-center space-x-1">
        <LocationOnSharpIcon className="text-gray-500" fontSize="small" />
        <span>
          {post.post_location
            ? post.post_location.split(",")[0]
            : "Location not available"}
        </span>
      </div>
    </div>
  </div>

  {/* Map - compact width but same height */}
  <div className="md:col-span-1 h-40 w-full rounded-md overflow-hidden">
    {coordinates[post.id] ? (
      <Map
        initialViewState={{
          latitude: coordinates[post.id].latitude,
          longitude: coordinates[post.id].longitude,
          zoom: 10,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken="pk.eyJ1IjoidW1lcndhbGkiLCJhIjoiY20ycGM0aWRrMGxmYjJtc2N2eWRvZHNpNiJ9._eLwWDk871QbnYrq8lcOkw"
      >
        <Marker
          latitude={coordinates[post.id].latitude}
          longitude={coordinates[post.id].longitude}
          color="red"
        />
      </Map>
    ) : (
      <p className="text-center text-sm text-gray-500 mt-6">
        Location not available
      </p>
    )}
  </div>
</div>

            ))
          ) : (
            <p>No posts available</p>
          )}
          <div className="m-4 flex justify-end">{renderPaginationLinks()}</div>

          {/* Coach Reviews */}
            {
              playerReviews.length > 0 ? (
                <div>
          <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Player Reviews</h2>
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
                <div className="text-4xl font-bold">
                  {averageRating.toFixed(1)}
                </div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <StarIcon
                      key={num}
                      className="h-2 w-2"
                      fill={num <= averageRating ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="1"
                      style={{
                        color: num <= averageRating ? "#facc15" : "#d1d5db", // Tailwind colors for yellow and gray
                      }}
                    />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    {reviews.length} reviews
                  </div>
                </div>
              </div>
            </div>

          {
            role === 'admin' ? (
              <div>
                <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold">All Reviews</h3>
              {/* <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rated</option>
                <option value="helpful">Most Helpful</option>
              </select> */}

              <select
              value={showReviews ? "reviews" : "hide"}
              onChange={(e) => setShowReviews(e.target.value === "reviews")}
              className="p-2 border rounded"
            >
              <option value="hide">Hide</option>
              <option value="reviews">Reviews</option>
            </select>
            </div>

            <div className="space-y-4">
              <div
                className={`transition-all duration-500 ease-in-out ${
                  showReviews ? "max-h-auto opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
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
                      <div className="font-medium">
                        {review.player?.player_name}
                      </div>
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
                        className={
                          num <= review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 mb-3">{review.reviews}</p>

                  {/* Helpful Button */}
                  <button className="text-sm text-gray-600 mt-2 hover:text-blue-600 transition-colors"></button>
                </div>
              ))}
              </div>
            </div>
              </div>
            ) : (
              <div></div>
            )
          }


          </div>
                </div>
              ) : (
                <div>
                  {/* <h1>No Reviews</h1> */}
                </div>
              )
            }
          {/* Coach Reviews */}

          {
            role === 'player' ? (
              <div>
                <button
            onClick={loadingEvent}
            className="justify-center m-auto items-center flex text-black bg-cyan-500 rounded-md font-medium p-3 text-xl mt-24"
          >
            {loader ? (
              <Bars
                height="40"
                width="40"
                color="black"
                className="item-center "
                ariaLabel="bars-loading"
                visible={true}
              />
            ) : (
              <p className="text-medium text-md ">Book Appointment</p>
            )}
          </button>
              </div>
            ) : (
              <div></div>
            )
          }

          <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32">
            <div className="text-center mt-10"></div>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
}

export default CoachDetail;
