import React from 'react';
import Nav from './Nav';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import Footer from './Footer';

function Testimonial() {
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

  return (
    <>
      <Nav />
      <section className="mt-12 mb-12">
        <div className="text-center mb-16 mt-16">
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
            What Our{" "}
            <span className="text-indigo-600">Users Say</span>
          </h3>
        </div>

        <div className="slider-container">
          <Slider {...settings}>
            {/* Slide 1 */}
            <div className="shadow-sm rounded-xl p-20">
              <blockquote className="overflow-hidden h-full flex flex-col bg-white shadow rounded-xl">
                <header className="p-6 space-y-4 flex flex-col flex-1">
                  <p className="text-xl">
                    "Choosing this platform was the best decision I made! It has streamlined our operations, saved time, and has been super easy to integrate into our workflow. Highly recommended!"
                  </p>
                  <p className="text-xl">“A must-have tool for modern businesses!”</p>
                </header>

                <footer className="flex items-center px-6 py-4 space-x-4 text-white bg-gradient-to-br from-indigo-700 to-indigo-500">
                  <img
                    className="w-10 h-10 rounded-full ring-2 ring-white"
                    loading="lazy"
                    src="https://picsum.photos/200"
                    alt="User 1"
                    width="460"
                    height="460"
                  />
                  <div>
                    <p className="text-lg font-bold">Ahmed Ali</p>
                    <a
                      href=""
                      rel="noopener"
                      className="text-sm text-blue-200"
                    >
                      CEO, TechPioneers
                    </a>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Slide 2 */}
            <div className="shadow-sm rounded-xl p-20">
              <blockquote className="overflow-hidden h-full flex flex-col bg-white shadow rounded-xl">
                <header className="p-6 space-y-4 flex flex-col flex-1">
                  <p className="text-xl">
                    "I’ve been using this system for several months, and it has dramatically improved how we collaborate and manage our team. The integration was smooth, and the support team was fantastic!"
                  </p>
                  <p className="text-xl">“Excellent service and support!”</p>
                </header>

                <footer className="flex items-center px-6 py-4 space-x-4 text-white bg-gradient-to-br from-indigo-700 to-indigo-500">
                  <img
                    className="w-10 h-10 rounded-full ring-2 ring-white"
                    loading="lazy"
                    src="https://picsum.photos/200"
                    alt="User 2"
                    width="460"
                    height="460"
                  />
                  <div>
                    <p className="text-lg font-bold">Fatima Khan</p>
                    <a
                      href=""
                      rel="noopener"
                      className="text-sm text-blue-200"
                    >
                      Product Manager, InnovateTech
                    </a>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Slide 3 */}
            <div className="shadow-sm rounded-xl p-20">
              <blockquote className="overflow-hidden h-full flex flex-col bg-white shadow rounded-xl">
                <header className="p-6 space-y-4 flex flex-col flex-1">
                  <p className="text-xl">
                    "This platform has helped us reduce our operational costs significantly. It is so intuitive, easy to use, and has made our workflow seamless. The best part? The amazing customer service!"
                  </p>
                  <p className="text-xl">“This tool is a game changer for small businesses!”</p>
                </header>

                <footer className="flex items-center px-6 py-4 space-x-4 text-white bg-gradient-to-br from-indigo-700 to-indigo-500">
                  <img
                    className="w-10 h-10 rounded-full ring-2 ring-white"
                    loading="lazy"
                    src="https://picsum.photos/200"
                    alt="User 3"
                    width="460"
                    height="460"
                  />
                  <div>
                    <p className="text-lg font-bold">Usman Shah</p>
                    <a
                      href=""
                      rel="noopener"
                      className="text-sm text-blue-200"
                    >
                      CEO, Green Innovators
                    </a>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Slide 4 */}
            <div className="shadow-sm rounded-xl p-20">
              <blockquote className="overflow-hidden h-full flex flex-col bg-white shadow rounded-xl">
                <header className="p-6 space-y-4 flex flex-col flex-1">
                  <p className="text-xl">
                    "I absolutely love this platform. It’s easy to use, flexible, and has allowed our team to collaborate more effectively. It’s an investment I would make again and again!"
                  </p>
                  <p className="text-xl">“Transforms the way teams work!”</p>
                </header>

                <footer className="flex items-center px-6 py-4 space-x-4 text-white bg-gradient-to-br from-indigo-700 to-indigo-500">
                  <img
                    className="w-10 h-10 rounded-full ring-2 ring-white"
                    loading="lazy"
                    src="https://picsum.photos/200"
                    alt="User 4"
                    width="460"
                    height="460"
                  />
                  <div>
                    <p className="text-lg font-bold">Ayesha Iqbal</p>
                    <a
                      href=""
                      rel="noopener"
                      className="text-sm text-blue-200"
                    >
                      Operations Head, Smart Solutions
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

      <Footer />
    </>
  );
}

export default Testimonial;
