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
    slidesToShow: 3,
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

        <div className="slider-container w-full px-10 sm:px-6 lg:px-8">
          <Slider {...settings}>
            {/* Slide 1 - Ahmed Ali */}

            <div style={{
              padding: '20px',
              height: '100%', // Ensure all cards same height
              boxSizing: 'border-box'
            }}>
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                {/* Nameplate - Top */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  gap: '12px',
                  color: 'white',
                  background: 'linear-gradient(135deg, #4338CA, #3730A3)'
                }}>
                  <img
                    src="https://picsum.photos/200"
                    alt="User"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px solid white'
                    }}
                  />
                  <div>
                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>
                      Ahmed Ali
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                      CEO, TechPioneers
                    </p>
                  </div>
                </div>

                {/* Text Content - Bottom */}
                <div style={{
                  padding: '16px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <p style={{
                    margin: '0 0 12px 0',
                    fontSize: '1rem',
                    lineHeight: 1.5
                  }}>
                    "Choosing this platform was the best decision I made! It has streamlined our operations."
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '1rem',
                    lineHeight: 1.5,
                    fontWeight: '500'
                  }}>
                    "A must-have tool for businesses!"
                  </p>
                </div>
              </div>
            </div>

            {/* Slide 2 - Fatima Khan */}
            <div style={{
              padding: '12px',
              height: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                {/* Nameplate - Top */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  gap: '12px',
                  color: 'white',
                  background: 'linear-gradient(135deg, #4338CA, #3730A3)'
                }}>
                  <img
                    src="https://picsum.photos/200"
                    alt="User"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px solid white'
                    }}
                  />
                  <div>
                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>
                      Fatima Khan
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                      Product Manager, InnovateTech
                    </p>
                  </div>
                </div>

                {/* Text Content - Bottom */}
                <div style={{
                  padding: '16px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <p style={{
                    margin: '0 0 12px 0',
                    fontSize: '1rem',
                    lineHeight: 1.5
                  }}>
                    "This system has dramatically improved how we collaborate and manage our team."
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '1rem',
                    lineHeight: 1.5,
                    fontWeight: '500'
                  }}>
                    "Excellent service and support!"
                  </p>
                </div>
              </div>
            </div>

            {/* Slide 3 - Usman Shah */}
            <div style={{
              padding: '12px',
              height: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                {/* Nameplate - Top */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  gap: '12px',
                  color: 'white',
                  background: 'linear-gradient(135deg, #4338CA, #3730A3)'
                }}>
                  <img
                    src="https://picsum.photos/200"
                    alt="User"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px solid white'
                    }}
                  />
                  <div>
                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>
                      Usman Shah
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                      CEO, Green Innovators
                    </p>
                  </div>
                </div>

                {/* Text Content - Bottom */}
                <div style={{
                  padding: '16px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <p style={{
                    margin: '0 0 12px 0',
                    fontSize: '1rem',
                    lineHeight: 1.5
                  }}>
                    "Helped us reduce operational costs significantly with intuitive workflow."
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '1rem',
                    lineHeight: 1.5,
                    fontWeight: '500'
                  }}>
                    "A game changer for small businesses!"
                  </p>
                </div>
              </div>
            </div>

            {/* Slide 4 - Ayesha Iqbal */}
            <div style={{
              padding: '12px',
              height: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                {/* Nameplate - Top */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  gap: '12px',
                  color: 'white',
                  background: 'linear-gradient(135deg, #4338CA, #3730A3)'
                }}>
                  <img
                    src="https://picsum.photos/200"
                    alt="User"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px solid white'
                    }}
                  />
                  <div>
                    <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>
                      Ayesha Iqbal
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                      Operations Head, Smart Solutions
                    </p>
                  </div>
                </div>

                {/* Text Content - Bottom */}
                <div style={{
                  padding: '16px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <p style={{
                    margin: '0 0 12px 0',
                    fontSize: '1rem',
                    lineHeight: 1.5
                  }}>
                    "Easy to use, flexible, and has allowed our team to collaborate more effectively."
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '1rem',
                    lineHeight: 1.5,
                    fontWeight: '500'
                  }}>
                    "Transforms the way teams work!"
                  </p>
                </div>
              </div>
            </div>
          </Slider>

          {/* Slider Container Styles */}
          <style jsx>{`
    .slider-container {
      width: 100%;
      max-width: 1600px;
      gap:2px
      padding: 20px;
    }
    
    /* Ensure all slides have equal height */
    .slick-slide > div {
      height: 100%;
    }
    
    /* Card height - adjust as needed */
    .slick-slide {
      height: 320px;
    }
  `}</style>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Testimonial;
