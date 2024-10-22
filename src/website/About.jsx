import React, { useEffect, useState } from 'react'
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
// import { Coach } from '@mui/icons-material';
import Nav from './Nav';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import axios from '../axios'
import Footer from './Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function About() {

  // Testimonials

  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: current => setActiveSlide2(current),
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000, 
  };


  // Get Coach_record


  const [coaches,setCoach] = useState([]);
  useEffect(()=>{
    const getCoach = () =>{
      axios.get('/coach_record').then((response)=>{
        console.log("Record Get Successfully");
        setCoach(response.data.coach);
      })
    }
    getCoach();
  },[]);
  return (
    <>  
      <Nav />
      <div className="p-6 bg-gray-50">
      {/* <h1 className="text-3xl font-bold text-center mb-8">About Us</h1> */}
      
      {/* Mission Statement */}
      <section className="mb-12">
        <h2 className="text-2xl text-center font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 just">
        At Coach Club, our mission is to empower athletes and coaches by creating a dynamic platform that facilitates effective training and development. We strive to connect passionate coaches with dedicated athletes, ensuring that every individual receives the guidance they need to excel. Our commitment to fostering a supportive community encourages collaboration and growth in the sports arena.

We believe in providing top-notch resources, tools, and support to enhance athletic performance and promote well-being. Our goal is to cultivate an environment where athletes can unlock their full potential, regardless of their background or experience level. We aim to inspire confidence, resilience, and teamwork through comprehensive training programs and personalized coaching solutions.

By bridging the gap between coaches and athletes, we envision a future where sports excellence is accessible to all. Together, we are shaping the champions of tomorrow.
        </p>
      </section>

      {/* Team Section */}
      <section className="mb-12">
      <h2 className="text-2xl font-semibold text-center mb-4">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dynamic Team Member Rendering */}
        {
          coaches.map((coach, index) => (
            <div className="bg-white p-6 shadow rounded-lg flex flex-col items-center" key={index}>
              {/* <Coach className="text-blue-500 mb-2" style={{ fontSize: '48px' }} /> */}
              <img
                src={`http://127.0.0.1:8000/uploads/coach_image/${coach.image}`} 
                alt={`${coach.name}`}
                className="w-24 h-24 rounded-full mb-4"
                preserveAspectRatio="xMidYMid slice"
              />
              <h3 className="font-semibold">{coach.name}</h3>
              <p className="text-gray-600 font-medium">Members</p>
            </div>
          ))
        }
      </div>
    </section>

      {/* Services Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-7">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-100 p-4 flex flex-col items-center rounded-lg">
            <FitnessCenterIcon className="text-blue-500" style={{ fontSize: 50 }} />
            <h3 className="mt-2 font-semibold">Coach Management</h3>
          </div>
          <div className="bg-gray-100 p-4 flex flex-col items-center rounded-lg">
            <PeopleIcon className="text-green-500" style={{ fontSize: 50 }} />
            <h3 className="mt-2 font-semibold">Team Management</h3>
          </div>
          <div className="bg-gray-100 p-4 flex flex-col items-center rounded-lg">
            <AssignmentIcon className="text-yellow-500" style={{ fontSize: 50 }} />
            <h3 className="mt-2 font-semibold">Schedule & Booking</h3>
          </div>
          <div className="bg-gray-100 p-4 flex flex-col items-center rounded-lg">
            <ThumbUpIcon className="text-red-500" style={{ fontSize: 50 }} />
            <h3 className="mt-2 font-semibold">Payments & Invoicing</h3>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50">
        <div className="text-center font-medium text-2xl">What Our User Says</div>
      <div className="slider-container">
  <Slider {...settings}>
    {/* Slide 1 */}
    <div className="shadow-sm rounded-xl m-10">
    <blockquote className="overflow-hidden h-full  flex flex-col bg-white shadow rounded-xl">
        <header className="p-6 space-y-4 flex flex-col flex-1">
            <p className="text-xl">
               I would highly recommend ABC Company to anyone looking for [products/services]. They are a company that truly cares about their customers and delivers on their promises. Thank you, ABC Company, for your outstanding service!
            </p>
            <p className="text-xl">
                Huge time and cost saver!”
            </p>
        </header>

        <footer className="flex items-center px-6 py-4 space-x-4 text-white bg-gradient-to-br from-blue-700 to-blue-500">
            <img className="w-10 h-10 rounded-full ring-2 ring-white" loading="lazy" src="https://picsum.photos/200" alt="Lars Klopstra" width="460" height="460"/>

            <div>
                <p className="text-lg font-bold">Mich</p>
                <a href="" rel="noopener" className="text-sm text-blue-200">
                    Founder of GO USA
                </a>
            </div>
        </footer>
    </blockquote>
</div>
    
    {/* Slide 2 */}
    <div className="shadow-sm rounded-xl m-10">
    <blockquote className="overflow-hidden h-full  flex flex-col bg-white shadow rounded-xl">
        <header className="p-6 space-y-4 flex flex-col flex-1">
            <p className="text-xl">
               I would highly recommend ABC Company to anyone looking for [products/services]. They are a company that truly cares about their customers and delivers on their promises. Thank you, ABC Company, for your outstanding service!
            </p>
            <p className="text-xl">
                Huge time and cost saver!”
            </p>
        </header>

        <footer className="flex items-center px-6 py-4 space-x-4 text-white bg-gradient-to-br from-blue-700 to-blue-500">
            <img className="w-10 h-10 rounded-full ring-2 ring-white" loading="lazy" src="https://picsum.photos/200" alt="Lars Klopstra" width="460" height="460"/>

            <div>
                <p className="text-lg font-bold">Mich</p>
                <a href="" rel="noopener" className="text-sm text-blue-200">
                    Founder of GO USA
                </a>
            </div>
        </footer>
    </blockquote>
</div>

    {/* Slide 3 */}
    <div className="shadow-sm rounded-xl m-10">
    <blockquote className="overflow-hidden h-full  flex flex-col bg-white shadow rounded-xl">
        <header className="p-6 space-y-4 flex flex-col flex-1">
            <p className="text-xl">
               I would highly recommend ABC Company to anyone looking for [products/services]. They are a company that truly cares about their customers and delivers on their promises. Thank you, ABC Company, for your outstanding service!
            </p>
            <p className="text-xl">
                Huge time and cost saver!”
            </p>
        </header>

        <footer className="flex items-center px-6 py-4 space-x-4 text-white bg-gradient-to-br from-blue-700 to-blue-500">
            <img className="w-10 h-10 rounded-full ring-2 ring-white" loading="lazy" src="https://picsum.photos/200" alt="Lars Klopstra" width="460" height="460"/>

            <div>
                <p className="text-lg font-bold">Mich</p>
                <a href="" rel="noopener" className="text-sm text-blue-200">
                    Founder of GO USA
                </a>
            </div>
        </footer>
    </blockquote>
</div>

    {/* Add more slides as needed */}
    {/* ... */}

  </Slider>

  {/* Custom styles for the slider */}
  <style jsx>{`
    .slider-container {
      width: 100%;
      max-width: 1920px;
      margin: 0 auto;
    }

    .slider-image {
      width: 100%;
      height: auto;
    }

    @media (max-width: 1200px) {
      .slider-image {
        height: auto;
      }
    }

    @media (max-width: 768px) {
      .slider-image {
        height: auto;
        max-height: 300px; /* Reduce height for smaller screens */
      }
    }

    @media (max-width: 480px) {
      .slider-image {
        height: auto;
        max-height: 200px; /* Further reduce height for very small screens */
      }
    }
  `}</style>
</div>

</section>

    </div>

    <Footer />
    </>
  )
}

export default About