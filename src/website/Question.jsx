import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

function Question() {
  return (
    <>
    <Nav />
    <section className=" shadow-slate-300 shadow-md rounded-lg">
        <div className="py-5 max-w-screen-sm mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Frequently Asked{" "}
              <span className="text-indigo-600">Questions</span>
            </h3>
          </div>

          <div className="px-10 sm:px-16">
            {/* Technical Section */}
            <div className="py-3 uppercase text-sm text-gray-500 font-medium">
              Technical
            </div>

            <div className="ml-5">
              <div className="flex items-start my-8">
                <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                  <svg
                    width="24px"
                    fill="white"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g data-name="Layer 2">
                      <g data-name="menu-arrow">
                        <rect
                          width="24"
                          height="24"
                          transform="rotate(180 12 12)"
                          opacity="0"
                        />
                        <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z" />
                        <circle cx="12" cy="19" r="1" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="text-md">
                  <h1 className="text-gray-900 font-semibold mb-2">
                    What might be your first question?
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores impedit perferendis suscipit eaque, iste dolor
                    cupiditate blanditiis ratione.
                  </p>
                </div>
              </div>

              {/* Duplicate as needed */}
            </div>

            {/* Billings Section */}
            <div className="py-3 uppercase text-sm text-gray-500 font-medium">
              Billings
            </div>

            <div className="ml-5">
              <div className="flex items-start my-8">
                <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                  <svg
                    width="24px"
                    fill="white"
                    height="24px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g data-name="Layer 2">
                      <g data-name="menu-arrow">
                        <rect
                          width="24"
                          height="24"
                          transform="rotate(180 12 12)"
                          opacity="0"
                        />
                        <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z" />
                        <circle cx="12" cy="19" r="1" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="text-md">
                  <h1 className="text-gray-900 font-semibold mb-2">
                    What might be your first question?
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maiores impedit perferendis suscipit eaque, iste dolor
                    cupiditate blanditiis ratione.
                  </p>
                </div>
              </div>

              {/* Duplicate as needed */}
            </div>
          </div>

          {/* Footer with credit */}
          <a
            href="https://componentity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="https://i.pinimg.com/736x/18/08/85/180885efdec78b8b6e3c75784aaff905.jpg"
              alt="Componentity Logo"
              className="w-48 mx-auto my-5 object-contain bg-transparent"
            />
          </a>
        </div>
        </section>

        <Footer />
    </>
  )
}

export default Question