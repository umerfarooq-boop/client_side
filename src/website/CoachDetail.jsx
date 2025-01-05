import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "../axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { RotatingLines } from "react-loader-spinner";
import MyCalendar from "./MyCalendar";
import DirectionMap from "./DirectionMap";
import Footer from "./Footer";
import { Bars } from "react-loader-spinner";
function CoachDetail() {
  // Get Coach Post Record

  const { id } = useParams();
  const [post, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);


  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const getPost = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`/showBlogPost/${id}?page=${page}`);
      setPosts(response.data.post.data); // Use `data` to fetch the array of posts
      setPagination(response.data.post); // Set the entire pagination object
      setLoader(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoader(false);
    }
  };
  

    

  

  const renderPaginationLinks = () => {
    return (
      <nav aria-label="Page navigation example">
        <ul className="flex float-right -space-x-px h-8 text-sm">
          {pagination.links?.map((link, index) => (
            <li key={index}>
              <button
                className={`flex items-center justify-center px-3 h-8 leading-tight border 
                  ${
                    link.active
                      ? "z-10 text-indigo-600 border-indigo-300 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700"
                      : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }
                  rounded-${index === 0 ? "s-lg" : index === pagination.links.length - 1 ? "e-lg" : ""}`}
                onClick={() => {
                  if (link.url) {
                    const url = new URL(link.url);
                    const pageNum = url.searchParams.get("page");
                    setPage(Number(pageNum)); // Convert to number and update page
                  }
                }}
                dangerouslySetInnerHTML={{ __html: link.label }} // Render label safely
              />
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  
  useEffect(() => {
    getPost();
  }, [page, id]);
  
  const loadingEvent = () => {
    setLoader(true); // Show loader
    setTimeout(() => {
      setLoader(false); // Hide loader
      navigate(`/schedule/${id}`); // Navigate to the next component
    }, 1000); // 1-second delay
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
          {post.length > 0 ? (
            post.map((p, key) => (
              <div className="shadow  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-14 p-4">
                <div key={key}>
                  <div className="transition-all duration-1000 hover:scale-100 scale-110">
                    <img
                      src={`http://127.0.0.1:8000/uploads/coach_posts/${p.post_image}`}
                      alt="Image Not Show"
                      className="object-contain w-full h-72"
                    />
                  </div>
                </div>

                <div>
                  <p className="font-medium text-2xl mb-2">{p.post_title}</p>
                  <p className="text-base text-gray-700 mb-4">
                    {p.post_description}
                  </p>

                  <div className="flex justify-between items-center border-t pt-2 mt-4">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <AccessTimeIcon className="text-gray-500" />
                      <p>
                        {(() => {
                          const postTime = new Date(p.post_time + " UTC"); // Parse as UTC
                          const currentTime = new Date();
                          const timeDiff = currentTime - postTime;

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
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                      <LocationOnSharpIcon className="text-gray-500" />
                      <p>{p.post_location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No Posts Available</p>
          )}
        </div>
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
    </>
  );
}

export default CoachDetail;















