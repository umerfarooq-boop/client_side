// import React, { useEffect, useState } from "react";
// import {
//   Navbar,
//   MobileNav,
//   Typography,
//   Button,
//   IconButton,
// } from "@material-tailwind/react";
// // import { Coach } from '@mui/icons-material';
// import Nav from "./Nav";
// import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// import PeopleIcon from "@mui/icons-material/People";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import axios from "../axios";
// import Footer from "./Footer";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import About_Section_Mission from "./About_Section_Mission";

// function About() {
//   // Testimonials

//   const [oldSlide, setOldSlide] = useState(0);
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [activeSlide2, setActiveSlide2] = useState(0);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 1000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     beforeChange: (current, next) => {
//       setOldSlide(current);
//       setActiveSlide(next);
//     },
//     afterChange: (current) => setActiveSlide2(current),
//     autoplay: true,
//     arrows: false,
//     autoplaySpeed: 3000,
//   };

//   const fax = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   // Get Coach_record

//   const [coaches, setCoach] = useState([]);
//   useEffect(() => {
//     const getCoach = () => {
//       axios.get("/coach_record").then((response) => {
//         console.log("Record Get Successfully");
//         setCoach(response.data.coach);
//       });
//     };
//     getCoach();
//   }, []);
//   return (
//     <>
//       <Nav />
//       <div className="p-6">
//         {/* <h1 className="text-3xl font-bold text-center mb-8">About Us</h1> */}

//         {/* Mission Statement */}
//         {/* <section className="mb-12">
//           <h2 className="text-2xl text-center font-semibold mb-4">
//             Our Mission
//           </h2>
//           <p className="text-gray-700 just">
//             At Coach Club, our mission is to empower athletes and coaches by
//             creating a dynamic platform that facilitates effective training and
//             development. We strive to connect passionate coaches with dedicated
//             athletes, ensuring that every individual receives the guidance they
//             need to excel. Our commitment to fostering a supportive community
//             encourages collaboration and growth in the sports arena. We believe
//             in providing top-notch resources, tools, and support to enhance
//             athletic performance and promote well-being. Our goal is to
//             cultivate an environment where athletes can unlock their full
//             potential, regardless of their background or experience level. We
//             aim to inspire confidence, resilience, and teamwork through
//             comprehensive training programs and personalized coaching solutions.
//             By bridging the gap between coaches and athletes, we envision a
//             future where sports excellence is accessible to all. Together, we
//             are shaping the champions of tomorrow.
//           </p>
//         </section> */}

//         <div className="flex flex-1 items-center rounded-3xl shadow-inner justify-center">
//           <About_Section_Mission />
//         </div>

//         {/* Team Section */}
//         <section className="mb-12">
//           <div className="text-center mb-16 mt-16">
//               <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
//                 Team{" "}
//                 <span className="text-indigo-600">Members</span>
//               </h3>
//           </div>

//           <div className="max-w-full px-4 sm:px-6 lg:px-8">
//             <Slider {...fax}>
//               {coaches.map((coach, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-6 shadow rounded-lg flex flex-col items-center justify-center"
//                 >
//                   <center>
//                     <img
//                       src={`http://127.0.0.1:8000/uploads/coach_image/${coach.image}`}
//                       alt={`${coach.name}`}
//                       className="w-24 h-24 rounded-full mb-4"
//                       preserveAspectRatio="xMidYMid slice"
//                     />
//                   </center>
//                   <h3 className="font-semibold text-center">{coach.name}</h3>
//                   <p className="text-gray-600 font-medium text-center">
//                     Members
//                   </p>
//                 </div>
//               ))}
//             </Slider>
//           </div>
//         </section>

//         {/* FAQ */}


//         {/* FAQ */}

//         {/* Services Section */}
//         <section className="mt-20">
//         <div className="text-center mb-16 mt-16">
//             <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
//               What we{" "}
//               <span className="text-indigo-600">Offer</span>
//             </h3>
//         </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             <div className="bg-gray-100 p-4 flex flex-col items-center rounded-lg">
//               <FitnessCenterIcon
//                 className="text-blue-500"
//                 style={{ fontSize: 50 }}
//               />
//               <h3 className="mt-2 font-semibold">Coach Management</h3>
//             </div>
//             <div className="bg-gray-100 p-4 flex flex-col items-center rounded-lg">
//               <PeopleIcon className="text-green-500" style={{ fontSize: 50 }} />
//               <h3 className="mt-2 font-semibold">Team Management</h3>
//             </div>
//             <div className="bg-gray-100 p-4 flex flex-col items-center rounded-lg">
//               <AssignmentIcon
//                 className="text-yellow-500"
//                 style={{ fontSize: 50 }}
//               />
//               <h3 className="mt-2 font-semibold">Schedule & Booking</h3>
//             </div>
//             <div className="bg-gray-100 p-4 flex flex-col items-center rounded-lg">
//               <ThumbUpIcon className="text-red-500" style={{ fontSize: 50 }} />
//               <h3 className="mt-2 font-semibold">Payments & Invoicing</h3>
//             </div>
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         {/* Testimonials Section */}

//       </div>

//       <Footer />
//     </>
//   );
// }

// export default About;


import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
// import { Coach } from '@mui/icons-material';
import Nav from "./Nav";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "../axios";
import Footer from "./Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About_Section_Mission from "./About_Section_Mission";
import Service from "./Service";

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
    afterChange: (current) => setActiveSlide2(current),
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
  };

  const fax = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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

  // Get Coach_record

  const [coaches, setCoach] = useState([]);
  useEffect(() => {
    const getCoach = () => {
      axios.get("/coach_record").then((response) => {
        console.log("Record Get Successfully");
        setCoach(response.data.coach);
      });
    };
    getCoach();
  }, []);
  return (
    <>
      <Nav />
      <div className="p-1">
        {/* <h1 className="text-3xl font-bold text-center mb-8">About Us</h1> */}

        {/* Mission Statement */}
        {/* <section className="mb-12">
          <h2 className="text-2xl text-center font-semibold mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 just">
            At Coach Club, our mission is to empower athletes and coaches by
            creating a dynamic platform that facilitates effective training and
            development. We strive to connect passionate coaches with dedicated
            athletes, ensuring that every individual receives the guidance they
            need to excel. Our commitment to fostering a supportive community
            encourages collaboration and growth in the sports arena. We believe
            in providing top-notch resources, tools, and support to enhance
            athletic performance and promote well-being. Our goal is to
            cultivate an environment where athletes can unlock their full
            potential, regardless of their background or experience level. We
            aim to inspire confidence, resilience, and teamwork through
            comprehensive training programs and personalized coaching solutions.
            By bridging the gap between coaches and athletes, we envision a
            future where sports excellence is accessible to all. Together, we
            are shaping the champions of tomorrow.
          </p>
        </section> */}


        <div className="flex flex-1 items-center justify-center rounded-3xl  bg-white">
          <About_Section_Mission />
        </div>

        {/* Team Section */}
        <section >
          <div className="text-center mb-12 mt-12">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Our Best <span className="text-indigo-600">Coaches</span>
            </h3>
          </div>

          <div className="max-w-full px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-4">
              {coaches.map((coach, index) => (
                <div
                  key={index}
                  className="min-w-[250px] bg-white p-6 shadow rounded-lg flex flex-col items-center justify-center"
                >
                  <img
                    src={`http://127.0.0.1:8000/uploads/coach_image/${coach.image}`}
                    alt={`${coach.name}`}
                    className="w-24 h-24 rounded-full mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-center">{coach.name}</h3>
                  <p className="text-gray-600 font-medium text-center">Members</p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* FAQ */}


        {/* FAQ */}

        {/* Services Section */}
        <div className="mb-12" > <Service /></div>
        {/* <section className="mt-20">
          <div className="text-center mb-16 mt-16">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              What we{" "}
              <span className="text-indigo-600">Offer</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-100 p-4 flex flex-col items-center rounded-lg">
              <FitnessCenterIcon
                className="text-blue-500"
                style={{ fontSize: 50 }}
              />
              <h3 className="mt-2 font-semibold">Coach Management</h3>
            </div>
            <div className="bg-gray-100 p-4 flex flex-col items-center rounded-lg">
              <PeopleIcon className="text-green-500" style={{ fontSize: 50 }} />
              <h3 className="mt-2 font-semibold">Team Management</h3>
            </div>
            <div className="bg-gray-100 p-4 flex flex-col items-center rounded-lg">
              <AssignmentIcon
                className="text-yellow-500"
                style={{ fontSize: 50 }}
              />
              <h3 className="mt-2 font-semibold">Schedule & Booking</h3>
            </div>
            <div className="bg-gray-100 p-4 flex flex-col items-center rounded-lg">
              <ThumbUpIcon className="text-red-500" style={{ fontSize: 50 }} />
              <h3 className="mt-2 font-semibold">Payments & Invoicing</h3>
            </div>
          </div>
        </section> */}

        {/* Testimonials Section */}
        {/* Testimonials Section */}

      </div>

      <Footer />
    </>
  );
}

export default About;
