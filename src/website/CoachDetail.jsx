import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { RotatingLines } from "react-loader-spinner";
import MyCalendar from './MyCalendar';


function CoachDetail() {

    // Get Coach Post Record

    const { id } = useParams();
    const [post, setPosts] = useState([]);
    const [loader,setLoader] = useState(true);
  
    useEffect(() => {
      const getPost = async () => {
        try {
          const response = await axios.get(`/showBlogPost/${id}`);
          setPosts(response.data.post);
          setLoader(false);
        //   console.log(response.data.post);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
  
      if (id) {
        getPost();
      }
    }, [id]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {
        loader ? (
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
                <div className="slider-container relative mt-10 p-4 rounded-xl border mx-auto sm:max-w-xl lg:max-w-5xl xl:max-w-5xl hover:shadow-xl transition-shadow duration-1000 ease-out">


        {
            post.map((p) => (
                p.coach.level === 'level 1' ? (
                    <span className="absolute top-0 left-4 transform -translate-y-1/2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 shadow-md">
                        {p.coach.level}
                    </span>
                ) : p.coach.level === 'level 2' ? (
                    <span className="absolute top-0 left-4 transform -translate-y-1/2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 shadow-md">
                        {p.coach.level}
                    </span>
                ) : p.coach.level === 'level 3' ? (
                    <span className="absolute top-0 left-4 transform -translate-y-1/2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 shadow-md">
                        {p.coach.level}
                    </span>
                ) : null
            ))
        }


        <Slider {...settings}>
          {post.map((index) => (
            <div key={index.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                {/* First Column */}
                <div className="col-span-1 flex justify-center lg:justify-start">
                  <img
                    src={`http://127.0.0.1:8000/uploads/coach_posts/${index.post_image}`}
                    alt="Image Not Show"
                    className="object-cover w-full lg:w-96 h-48 rounded-xl"
                  />
                </div>

                {/* Second Column */}
                <div className="col-span-1 p-4 rounded-lg bg-white">
                    <p className="font-medium text-2xl mb-2">{index.post_title}</p>
                    <p className="text-base text-gray-700 mb-4">{index.post_description}</p>
                <div className="flex justify-between items-center border-t pt-2 mt-4">
                    <div className="flex items-center space-x-1 text-gray-600">
                    <AccessTimeIcon className="text-gray-500" />
                    <p>
                        {(() => {
                            const postTime = new Date(index.post_time + ' UTC'); // Parse as UTC
                            const currentTime = new Date();
                            const timeDiff = currentTime - postTime;

                            const seconds = Math.floor(timeDiff / 1000);
                            const minutes = Math.floor(seconds / 60);
                            const hours = Math.floor(minutes / 60);
                            const days = Math.floor(hours / 24);
                            const weeks = Math.floor(days / 7);

                            if (seconds < 60) return "Just now";
                            if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                            if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
                            if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
                            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
                        })()}
                    </p>

                    </div>
                    <div className="flex items-center space-x-1 text-gray-600">
                    <LocationOnSharpIcon className="text-gray-500" />
                    <p>{index.post_location}</p>
                    </div>
                </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
<MyCalendar />
            </div>


        )
      }
    </>
  );
}

export default CoachDetail;
