import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Chart, Bar, Line } from "react-chartjs-2";
import ReactPaginate from "react-paginate";
// Register necessary components and scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement, // Required for Line chart points
  LineElement // Required for Line chart lines
);
import { Star, StarBorder } from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TypeAnimation } from "react-type-animation";
import img from "../../public/umer.jpg";
import hateem from "../../public/h.jpg";
import axios from "../axios";
import { useParams } from "react-router-dom";
import Notifications from "../website/Notifications";
import MyCalendar from "../website/MyCalendar";

function DashboardGraph() {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setOldSlide(current); // Track the previous slide
      setActiveSlide(next); // Track the active slide before the change
    },
    afterChange: (current) => setActiveSlide2(current), // Track the active slide after the change
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
  };

  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Performance",
        data: [30, 15, 62, 65, 61, 6],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} units`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#4285F4",
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: "#f44242",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Growth",
        data: [15, 30, 45, 50, 70, 90],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} growth points`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#4285F4",
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: "#f44242",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const { id } = useParams();
  const [data, setData] = useState([]);
  // const [pagination, setPagination] = useState({});
  // const [page, setPage] = useState(1);

  // Fetch data on page load or when page or id changes

  // Handle rendering pagination links
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5); // Set items per page
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const role = localStorage.getItem("role");

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(field);
      setOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const displayedData = sortedData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Run the getData function on page load or when page/id changes
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/PlayerRequests/${id}`);
        if (response.data?.CoachSchedule) {
          const scheduleData = Array.isArray(response.data.CoachSchedule)
            ? response.data.CoachSchedule
            : [response.data.CoachSchedule];
          setData(scheduleData);
          // setPagination(response.data.CoachSchedule);
          console.log(scheduleData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [id, page]);

  const accept = async (e) => {
    const cid = e.target.getAttribute('data-id');
    const response = await axios.get(`/AcceptRequest/${cid}`);
    alert('Status Will be Updated');
  }

  const reject = async (e) => {
    const rid = e.target.getAttribute('data-id');
    const response = await axios.get(`/RejectRequest/${rid}`);
    alert('Status Updated Successfully');
  }

  return (
    <>
      <div className="container mx-auto p-4"></div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"> */}

      {/* First Grid */}

      {/* First Grid */}

      {/* </div> */}

      {/* 
      <div class="bg-blue-200 p-6 rounded-md shadow-lg">
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
              <ul
                className="flex flex-wrap -mb-px text-sm font-medium text-center"
                role="tablist"
              >
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "profile" ? "text-purple-600 border-purple-600" : "text-black font-medium border-transparent hover:text-gray-600"}`}
                    onClick={() => handleTabClick("profile")}
                    role="tab"
                    aria-selected={activeTab === "profile"}
                  >
                    Profile
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "dashboard" ? "text-purple-600 border-purple-600" : "text-black font-medium border-transparent hover:text-gray-600 "}`}
                    onClick={() => handleTabClick("dashboard")}
                    role="tab"
                    aria-selected={activeTab === "dashboard"}
                  >
                    Password
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "settings" ? "text-purple-600 border-purple-600" : "text-black font-medium border-transparent hover:text-gray-600"}`}
                    onClick={() => handleTabClick("settings")}
                    role="tab"
                    aria-selected={activeTab === "settings"}
                  >
                    Instruction
                  </button>
                </li>
                <li role="presentation">
                  <button
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "contacts" ? "text-purple-600 border-purple-600" : "text-black font-medium border-transparent hover:text-gray-600"}`}
                    onClick={() => handleTabClick("contacts")}
                    role="tab"
                    aria-selected={activeTab === "contacts"}
                  >
                    Reviews
                  </button>
                </li>
              </ul>
            </div>
            <div id="default-styled-tab-content">
              <div
                className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-900 ${activeTab === "profile" ? "" : "hidden"}`}
                id="styled-profile"
                role="tabpanel"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 ">
                  <div class="bg-blue-500 text-white p-4 text-sm md:text-base lg:text-lg">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="Network Error"
                      srcset=""
                    />
                  </div>
                  <div class="bg-blue-500 text-white p-4 text-sm md:text-base lg:text-lg">
                    <b>Name</b>
                    <p className="font-medium text-xl italic bg-gradient-to-r from-orange-700 to-purple-500 mt-4">Umer Farooq</p>
                    <b>Location</b>
                    <p className="font-medium text-xl italic bg-gradient-to-r from-orange-700 to-purple-500 mt-4">Rawalpindi</p>
                  </div>
                  <div class="bg-blue-500 text-white p-4 text-sm md:text-base lg:text-lg">
                    <p className="text-sm font-medium">Coach Level</p>
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                      Level 1
                    </span>
                  </div>
                  <div class="bg-blue-500 text-white p-4 text-sm md:text-base lg:text-lg">
                    <p className="text-sm font-medium">Coach Experience</p>
                    <span class="bg-indigo-800 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                      1 Year
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`p-4 rounded-lg  ${activeTab === "dashboard" ? "" : "hidden"}`}
                id="styled-dashboard"
                role="tabpanel"
              >
                <div className="bg-white border shadow sm:rounded-lg max-w-md max-h-screen mx-auto p-8">
                  <h1 className="text-2xl font-bold text-blue-900 text-center">
                    Update Password
                  </h1>
                  <form className="mt-6 flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="New Password"
                      className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white placeholder-gray-600 text-sm font-medium"
                    />

                    <input
                      type="password"
                      placeholder="R-enter Password"
                      className="block w-full p-3 mb-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:bg-white placeholder-gray-600 text-sm font-medium"
                    />

                    
                    <button
                      type="submit"
                      className="w-full p-3 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-800 transition duration-300"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
              <div
                className={`p-4 rounded-lg ${activeTab === "settings" ? "" : "hidden"}`}
                id="styled-settings"
                role="tabpanel"
              >
                <div className="grid sm:grid-cols-1 gap-4">
                  <p className="italic font-medium text-center">
                    Coach Instruction
                  </p>
                  <p className="font-medium italic">
                    As a coach, always treat players with kindness and respect.
                    Keep their records well-organized and up-to-date. When a
                    player requests a training session, only accept it if you
                    are available during that time. Use the chat feature to
                    communicate directly with the player. You can discuss and
                    negotiate the session price. For example, if the session is
                    normally 100 Rs per hour, you can ask for 150 Rs and agree
                    to 120 Rs if the player accepts. Remember, 3%{" "}
                    <WarningIcon className="text-violet-950 mr-1" /> of the
                    total payment will go to the company, and the remaining 97%
                    will be your earnings. Always aim to provide a good
                    experience for the players and maintain a professional
                    attitude.
                  </p>
                </div>
              </div>
              <div
                className={`rounded-2xl ${activeTab === "contacts" ? "" : "hidden"}`}
                id="styled-contacts"
                role="tabpanel"
              >
                      <p className="text-center font-medium italic text-lg pt-3 ">Customer Reviews</p>
                <div className="slider-container rounded-e-full">
                  <Slider {...settings}>
                    



                    <div className="max-w-sm w-full lg:max-w-full lg:flex ">
                      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 mt-11 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 flex items-center">
                            <svg
                              className="fill-current text-gray-500 w-3 h-3 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                            </svg>
                            Members only
                          </p>
                          <div className="text-gray-900 font-bold text-xl mb-2">
                            
                          </div>
                          <p className="text-gray-700 text-base">
                          I can't thank Coach enough for all the guidance, support, and motivation they've given me throughout the season. From day one, they believed in my potential and pushed me to reach new heights, both on and off the field
                          </p>
                        </div>
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 rounded-full mr-4"
                            src={img}
                            alt="Avatar of Jonathan Reinink"
                          />
                          <div className="text-sm">
                            <p className="text-gray-900 leading-none">
                              Umer Farooq
                            </p>
                            <p className="text-gray-600">Dec 18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="max-w-sm w-full lg:max-w-full lg:flex ">
                      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 mt-11 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 flex items-center">
                            <svg
                              className="fill-current text-gray-500 w-3 h-3 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                            </svg>
                            Members only
                          </p>
                          <div className="text-gray-900 font-bold text-xl mb-2">
                            
                          </div>
                          <p className="text-gray-700 text-base">
                          I can't thank Coach enough for all the guidance, support, and motivation they've given me throughout the season. From day one, they believed in my potential and pushed me to reach new heights, both on and off the field
                          </p>
                        </div>
                        <div className="flex items-center">
                          <img
                            className="w-10 h-10 rounded-full mr-4"
                            src={hateem}
                            alt="Avatar of Jonathan Reinink"
                          />
                          <div className="text-sm">
                            <p className="text-gray-900 leading-none">
                              Hateem Gulzaar
                            </p>
                            <p className="text-gray-600">Dec 18</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    
                  </Slider>
                </div>
              </div>

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
                    max-height: 300px; 
                  }
                }

                @media (max-width: 480px) {
                  .slider-image {
                    height: auto;
                    max-height: 200px; 
                  }
                }
              `}</style>
            </div>
          </div>
      
      */}

      <div class="container mx-auto p-4 w-[100%]">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
          <div className=" rounded-md shadow-lg bg-white text-black">
            <div className="p-4 text-center mt-1 mb-1">
              <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Player 
                <span className="text-indigo-600">&nbsp;Requests</span>
              </h3>
            </div>
            <div className="overflow-x-auto">
              {role === "coach" ? (
                <div>
                  <table className="w-[100%] divide-y divide-gray-200 hidden md:table">
                    <thead className="bg-gray-100 ">
                      <tr>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                          onClick={() => handleSort("name")}
                        >
                          Name{" "}
                          {orderBy === "name"
                            ? order === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                          onClick={() => handleSort("age")}
                        >
                          Age{" "}
                          {orderBy === "age"
                            ? order === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                          onClick={() => handleSort("sport")}
                        >
                          Sport{" "}
                          {orderBy === "sport"
                            ? order === "asc"
                              ? "↑"
                              : "↓"
                            : ""}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Request
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {displayedData.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                            {item.player?.player_name || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                            {item.player?.player_dob
                              ? (() => {
                                  const dob = new Date(item.player.player_dob);
                                  const diff = new Date() - dob;
                                  return Math.floor(
                                    diff / (1000 * 60 * 60 * 24 * 365.25)
                                  ); // Approximate years
                                })()
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                            {item.sport_category?.name || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                            {item.start_time
                              ? new Date(
                                  `1970-01-01T${item.start_time}`
                                ).toLocaleTimeString([], {
                                  hour: "numeric",
                                  hour12: true,
                                })
                              : "N/A"}
                            &nbsp;<b>-</b>&nbsp;
                            {item.end_time
                              ? new Date(
                                  `1970-01-01T${item.end_time}`
                                ).toLocaleTimeString([], {
                                  hour: "numeric",
                                  hour12: true,
                                })
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                            {item.to_date} &nbsp; {item.from_date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                            {
                              item.status === 'processing' ? (
                                <div className="flex space-x-2">
                              <button onClick={accept} data-id={item.id} className="bg-lime-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300">
                                Accept
                              </button>
                              <button onClick={reject} data-id={item.id} className="bg-red-600 text-black font-semibold py-1 px-2 rounded shadow hover:bg-red-500 transition duration-300">
                                Decline
                              </button>
                            </div>
                              ) : item.status === 'booked' ? (
                                <button className="bg-green-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300">
                                Booked
                              </button>
                              ) : item.status === 'reject' ? (
                                <button  className="bg-red-600 text-black font-semibold py-1 px-2 rounded shadow hover:bg-red-500 transition duration-300">
                                Reject
                              </button>
                              ) : null
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Mobile View */}
                  <div className="block md:hidden">
                    {displayedData.map((item, index) => (
                      <div
                        key={index}
                        className="mb-4 p-4 border border-gray-200 rounded shadow-md bg-white"
                      >
                        <p className="text-sm font-medium text-gray-500">
                          <span className="font-semibold">Name:</span>{" "}
                          {item.player?.player_name || "N/A"}
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                          <span className="font-semibold">Age:</span>{" "}
                          {item.player?.player_dob
                            ? (() => {
                                const dob = new Date(item.player.player_dob);
                                const diff = new Date() - dob;
                                return Math.floor(
                                  diff / (1000 * 60 * 60 * 24 * 365.25)
                                ); // Approximate years
                              })()
                            : "N/A"}
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                          <span className="font-semibold">Sport:</span>{" "}
                          {item.sport_category?.name || "N/A"}
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                          <span className="font-semibold">Time:</span>{" "}
                          {item.start_time
                            ? new Date(
                                `1970-01-01T${item.start_time}`
                              ).toLocaleTimeString([], {
                                hour: "numeric",
                                hour12: true,
                              })
                            : "N/A"}
                          &nbsp;<b>-</b>&nbsp;
                          {item.end_time
                            ? new Date(
                                `1970-01-01T${item.end_time}`
                              ).toLocaleTimeString([], {
                                hour: "numeric",
                                hour12: true,
                              })
                            : "N/A"}
                        </p>
                        <p className="text-sm font-medium text-gray-500">
                          <span className="font-semibold">Date:</span>{" "}
                          {item.to_date} &nbsp; {item.from_date}
                        </p>
                        <div className="mt-2">
                            {
                              item.status === 'processing' ? (
                                <div className="flex space-x-2">
                              <button onClick={accept} data-id={item.id} className="bg-lime-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300">
                                Accept
                              </button>
                              <button onClick={reject} data-id={item.id} className="bg-red-600 text-black font-semibold py-1 px-2 rounded shadow hover:bg-red-500 transition duration-300">
                                Decline
                              </button>
                            </div>
                              ) : item.status === 'booked' ? (
                                <button className="bg-green-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300">
                                Booked
                              </button>
                              ) : item.status === 'reject' ? (
                                <button  className="bg-red-600 text-black font-semibold py-1 px-2 rounded shadow hover:bg-red-500 transition duration-300">
                                Reject
                              </button>
                              ) : null
                            }
                        </div>
                      </div>
                    ))}
                  </div>
                  <ReactPaginate
                    className="flex items-center justify-center p-6 space-x-3"
                    previousLabel={<button className="">Previous</button>}
                    nextLabel={<button className="">Next</button>}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName="flex items-center space-x-3"
                    pageLinkClassName="px-3 py-2 bg-white text-black border rounded shadow-md transition duration-300 ease-in-out hover:bg-indigo-100 hover:text-indigo-700"
                    previousLinkClassName="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded shadow-md"
                    nextLinkClassName="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded shadow-md"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    activeClassName="bg-indigo-500 text-white border-indigo-500 shadow-lg"
                  />
                </div>
              ) : role === "player" ? (
                <div>
                  <p>Player</p>
                </div>
              ) : role === "admin" ? (
                <div>
                  <p>umer</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
  <div className="w-full">
    {
      role === 'coach' ? (
        <div className="w-auto lg:h-[140vh] xl:h-screen md:h-[140vh] shadow shadow-indigo-300">
          <MyCalendar id={id} />
        </div>
      ) : null
    }
  </div>
</div>


      {/* <Notifications coachId={id} /> */}
                
      <div className="">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="shadow-lg rounded-lg p-4 bg-white">
              <div className="h-72">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
            <div className="shadow-lg rounded-lg p-4 bg-white">
              <div className="h-72">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 shadow-lg rounded-lg mt-4">
            <div className="w-full h-96">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardGraph;
