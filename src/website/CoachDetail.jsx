import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { RotatingLines } from "react-loader-spinner";
import Footer from "./Footer";
import Map, { Marker } from "react-map-gl";

function CoachDetail() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [coordinates, setCoordinates] = useState({});
  const navigate = useNavigate();

  const getPost = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`/showBlogPost/${id}?page=${page}`);
      if (response.data && response.data.post && Array.isArray(response.data.post.data)) {
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

          <div className="text-center mt-10">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Coach <span className="text-indigo-600">Events</span>
            </h3>
          </div>

          {posts.length > 0 ? (
            posts.map((post, key) => (
              <div
                key={key}
                className="shadow grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-14 p-4"
              >
                <div>
                  <img
                    src={`http://127.0.0.1:8000/uploads/coach_posts/${post.post_image}`}
                    alt="Image Not Show"
                    className="object-contain w-full h-72"
                  />
                </div>
                <div>
                  <p className="font-medium text-2xl mb-2">{post.post_title}</p>
                  <p className="text-base text-gray-700 mb-4">{post.post_description}</p>
                  <div className="flex justify-between items-center border-t pt-2 mt-4">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <AccessTimeIcon className="text-gray-500" />
                      <p>
                        {(() => {
                          const postTime = new Date(post.post_time + " UTC");
                          const timeDiff = Date.now() - postTime.getTime();
                          const seconds = Math.floor(timeDiff / 1000);
                          const minutes = Math.floor(seconds / 60);
                          const hours = Math.floor(minutes / 60);
                          const days = Math.floor(hours / 24);
                          const weeks = Math.floor(days / 7);
                          if (seconds < 60) return "Just now";
                          if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
                          if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
                          if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
                          return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
                        })()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <LocationOnSharpIcon className="text-gray-500" />
                      <p>{post.post_location.split(',')[0]}</p>
                    </div>
                  </div>
                </div>
                <div >
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
                    <p>Location not available</p>
                  )}
                </div>
                
              </div>
              
            ))
          ) : (
            <p>No posts available</p>
          )} 
         <div className="m-4 flex justify-end">{renderPaginationLinks()}</div>
      

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
      ) : <p className="text-medium text-md ">Book Appointment</p>}
    </button>
      
      <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32">
        <div className="text-center mt-10"></div>
        <Footer />
      </div>
      
      <Footer />
        </div>
      )}
    </>
  );
}

export default CoachDetail;
