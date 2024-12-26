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
import DirectionMap from './DirectionMap';
import Footer from './Footer'

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
            <div className="slider-container relative w-full sm:w-4/5 lg:w-3/4 xl:w-2/3 h-auto mt-10 p-4 rounded-xl border mx-auto hover:shadow-2xl transition-shadow duration-300 ease-out">
              {post.length > 1 ? (
                <Slider {...settings}>
                  {post.map((p) => (
                    <div key={p.id}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                        <div className="col-span-1 flex justify-center lg:justify-start">
                          <img
                            src={`http://127.0.0.1:8000/uploads/coach_posts/${p.post_image}`}
                            alt="Image Not Show"
                            className="object-cover w-full lg:w-96 h-48 rounded-xl"
                          />
                        </div>
                        <div className="col-span-1 p-4 rounded-lg bg-white">
                          <p className="font-medium text-2xl mb-2">{p.post_title}</p>
                          <p className="text-base text-gray-700 mb-4">{p.post_description}</p>
                          <div className="flex justify-between items-center border-t pt-2 mt-4">
                            <div className="flex items-center space-x-1 text-gray-600">
                              <AccessTimeIcon className="text-gray-500" />
                              <p>
                                {(() => {
                                  const postTime = new Date(p.post_time + ' UTC'); // Parse as UTC
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
                              <p>{p.post_location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                post.map((p) => (
                  <div key={p.id} className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                    <div className="col-span-1 flex justify-center lg:justify-start">
                      <img
                        src={`http://127.0.0.1:8000/uploads/coach_posts/${p.post_image}`}
                        alt="Image Not Show"
                        className="object-cover w-full lg:w-96 h-48 rounded-xl"
                      />
                    </div>
                    <div className="col-span-1 p-4 rounded-lg bg-white">
                      <p className="font-medium text-2xl mb-2">{p.post_title}</p>
                      <p className="text-base text-gray-700 mb-4">{p.post_description}</p>
                      <div className="flex justify-between items-center border-t pt-2 mt-4">
                        <div className="flex items-center space-x-1 text-gray-600">
                          <AccessTimeIcon className="text-gray-500" />
                          <p>
                            {(() => {
                              const postTime = new Date(p.post_time + ' UTC'); // Parse as UTC
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
                          <p>{p.post_location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                )}
            </div>
          </div>
        )
      }
      <div className='m-5'>
      <DirectionMap id={id} />
    </div>
                <div>

<MyCalendar />

                </div>
                <div className='mt-20 sm:mt-24 md:mt-28 lg:mt-32'>
                <div className="text-center mt-10">
          </div>
  <Footer />
</div>


                
    </>
  );
}

export default CoachDetail;
