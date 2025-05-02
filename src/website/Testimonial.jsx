import React from 'react'
import Nav from './Nav'
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
        <section className="mt-20 mb-5 ">
          <div className="text-center mb-16 mt-16">
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                What Our{" "}
                <span className="text-indigo-600">User Says</span>
              </h3>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {/* Slide 1 */}
              <div className="shadow-sm rounded-xl">
                <blockquote className="overflow-hidden h-full  flex flex-col bg-white shadow rounded-xl">
                  <header className="p-6 space-y-4 flex flex-col flex-1">
                    <p className="text-xl">
                      I would highly recommend ABC Company to anyone looking for
                      [products/services]. They are a company that truly cares
                      about their customers and delivers on their promises.
                      Thank you, ABC Company, for your outstanding service!
                    </p>
                    <p className="text-xl">Huge time and cost saver!”</p>
                  </header>

                  <footer className="flex items-center px-6 py-4 space-x-4 text-white bg-gradient-to-br from-indigo-700 to-indigo-500">
                    <img
                      className="w-10 h-10 rounded-full ring-2 ring-white"
                      loading="lazy"
                      src="https://picsum.photos/200"
                      alt="Lars Klopstra"
                      width="460"
                      height="460"
                    />

                    <div>
                      <p className="text-lg font-bold">Mich</p>
                      <a
                        href=""
                        rel="noopener"
                        className="text-sm text-blue-200"
                      >
                        Founder of GO USA
                      </a>
                    </div>
                  </footer>
                </blockquote>
              </div>

              {/* Slide 2 */}
              <div className="shadow-sm rounded-xl">
                <blockquote className="overflow-hidden h-full  flex flex-col bg-white shadow rounded-xl">
                  <header className="p-6 space-y-4 flex flex-col flex-1">
                    <p className="text-xl">
                      I would highly recommend ABC Company to anyone looking for
                      [products/services]. They are a company that truly cares
                      about their customers and delivers on their promises.
                      Thank you, ABC Company, for your outstanding service!
                    </p>
                    <p className="text-xl">Huge time and cost saver!”</p>
                  </header>

                  <footer className="flex items-center px-6 py-4 space-x-4 text-white bg-gradient-to-br from-indigo-700 to-indigo-500">
                    <img
                      className="w-10 h-10 rounded-full ring-2 ring-white"
                      loading="lazy"
                      src="https://picsum.photos/200"
                      alt="Lars Klopstra"
                      width="460"
                      height="460"
                    />

                    <div>
                      <p className="text-lg font-bold">Mich</p>
                      <a
                        href=""
                        rel="noopener"
                        className="text-sm text-blue-200"
                      >
                        Founder of GO USA
                      </a>
                    </div>
                  </footer>
                </blockquote>
              </div>

              {/* Slide 3 */}
              <div className="shadow-sm rounded-xl">
                <blockquote className="overflow-hidden h-full  flex flex-col bg-white shadow rounded-xl">
                  <header className="p-6 space-y-4 flex flex-col flex-1">
                    <p className="text-xl">
                      I would highly recommend ABC Company to anyone looking for
                      [products/services]. They are a company that truly cares
                      about their customers and delivers on their promises.
                      Thank you, ABC Company, for your outstanding service!
                    </p>
                    <p className="text-xl">Huge time and cost saver!”</p>
                  </header>

                  <footer className="flex items-center px-6 py-4 space-x-4 text-white bg-gradient-to-br from-indigo-700 to-indigo-500">
                    <img
                      className="w-10 h-10 rounded-full ring-2 ring-white"
                      loading="lazy"
                      src="https://picsum.photos/200"
                      alt="Lars Klopstra"
                      width="460"
                      height="460"
                    />

                    <div>
                      <p className="text-lg font-bold">Mich</p>
                      <a
                        href=""
                        rel="noopener"
                        className="text-sm text-blue-200"
                      >
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

        <Footer/> 
    </>
  )
}

export default Testimonial