import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import ReactPaginate from "react-paginate";
// Register necessary components and scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
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
import { ToastContainer, toast } from "react-toastify";
import ChangeRequest from "./ChangeRequest";
import { AppointmentProvider } from "../context/AppointmentContext";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';


const playerData = [
  { month: 'Jan', players: 30 },
  { month: 'Feb', players: 50 },
  { month: 'Mar', players: 80 },
  { month: 'Apr', players: 65 },
  { month: 'May', players: 90 },
  { month: 'Jun', players: 120 },
];

const bookingData = [
  { month: 'Jan', bookings: 10 },
  { month: 'Feb', bookings: 25 },
  { month: 'Mar', bookings: 35 },
  { month: 'Apr', bookings: 50 },
  { month: 'May', bookings: 70 },
  { month: 'Jun', bookings: 95 },
];

const reviewsData = [
  { rating: '1 Star', count: 5 },
  { rating: '2 Stars', count: 10 },
  { rating: '3 Stars', count: 20 },
  { rating: '4 Stars', count: 35 },
  { rating: '5 Stars', count: 50 },
];

const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#FF4444'];

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
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

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // const apiUrl = 'YOUR_API_URL_HERE'; // Replace with your actual API URL
      const coachId = 2; // Replace with the coach ID you want to fetch

      try {
        const response = await axios.get(`/showCoachBookings/${coachId}`);
        const data = response.data;

        if (data.success) {
          const bookings = data.coach;

          // Process data for Chart.js
          const labels = bookings.map(booking => booking.from_date + ' ' + booking.start_time);
          const startTimes = bookings.map(booking => parseTime(booking.start_time));
          const endTimes = bookings.map(booking => parseTime(booking.end_time));
          const playerNames = bookings.map(booking => booking.player.player_name);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Start Time',
                data: startTimes,
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                borderRadius: 10,
                barPercentage: 0.6,
              },
              {
                label: 'End Time',
                data: endTimes,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                borderRadius: 10,
                barPercentage: 0.6,
              },
            ],
          });
        } else {
          console.error('Failed to fetch data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Helper function to convert time (HH:mm:ss) to decimal hours
  const parseTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours + minutes / 60 + seconds / 3600;
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

  // const handleSort = (field) => {
  //   if (orderBy === field) {
  //     setOrder(order === "asc" ? "desc" : "asc");
  //   } else {
  //     setOrderBy(field);
  //     setOrder("asc");
  //   }
  // };

  // const sortedData = [...data].sort((a, b) => {
  //   if (order === "asc") {
  //     return a[orderBy] > b[orderBy] ? 1 : -1;
  //   } else {
  //     return a[orderBy] < b[orderBy] ? 1 : -1;
  //   }
  // });

  // const displayedData = sortedData.slice(
  //   currentPage * itemsPerPage,
  //   (currentPage + 1) * itemsPerPage
  // );

  // const pageCount = Math.ceil(data.length / itemsPerPage);

  // const handlePageClick = ({ selected }) => {
  //   setCurrentPage(selected);
  // };

  // Run the getData function on page load or when page/id changes
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get(`/PlayerRequests/${id}`);
  //       if (response.data?.CoachSchedule) {
  //         const scheduleData = Array.isArray(response.data.CoachSchedule)
  //           ? response.data.CoachSchedule
  //           : [response.data.CoachSchedule];
  //         setData(scheduleData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   getData();
  // }, [id,page]);
  

  // const accept = async (e) => {
  //   const aid = e.target.getAttribute("data-id");
  //   try {
  //     const response = await axios.get(`/AcceptRequest/${aid}`);
  //     if (response.status === 200) {
  //       toast.success("Status updated to 'Booked'");
  //       // setData((prevData) =>
  //       //   prevData.map((item) =>
  //       //     item.id === parseInt(aid) ? { ...item, status: "booked" } : item
  //       //   )
  //       // );
  //     }
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //     toast.error("Failed to update status");
  //   }
  // };

  // const reject = async (e) => {
  //   const rid = e.target.getAttribute("data-id");
  //   try {
  //     const response = await axios.get(`/RejectRequest/${rid}`);
  //     if (response.status === 200) {
  //       toast.success("Status updated to 'Reject'");
  //       setData((prevData) =>
  //         prevData.map((item) =>
  //           item.id === parseInt(rid) ? { ...item, status: "reject" } : item
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //     toast.error("Failed to update status");
  //   }
  // };
  
  
  
  
  
  
  

  return (
    <>
      {
        role === "coach" ? (
          <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {/* Player Analytics */}
      <div className="shadow-sm border border-gray-200 rounded-xl p-4 bg-white">
        <h2 className="text-md font-semibold mb-3">Monthly Player Growth</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={playerData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="players" stroke="#4F46E5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Booking Analytics */}
      <div className="shadow-sm border border-gray-200 rounded-xl p-4 bg-white">
        <h2 className="text-md font-semibold mb-3">Monthly Bookings</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="bookings" fill="#34D399" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Reviews Analytics */}
      <div className="shadow-sm border border-gray-200 rounded-xl p-4 bg-white">
        <h2 className="text-md font-semibold mb-3">Player Ratings</h2>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Tooltip />
            <Pie data={reviewsData} dataKey="count" nameKey="rating" cx="50%" cy="50%" outerRadius={70}>
              {reviewsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
        ) : null
      }

        {/* <ToastContainer /> */}

      <div class="container mx-auto p-4 w-[100%]">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
          <div className=" rounded-md shadow-lg bg-white text-black">
  
            <div className="overflow-x-auto">
              {role === "coach" ? (
                <div>
                  {/* <table className="w-[100%] divide-y divide-gray-200 hidden md:table">
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
                  </table> */}
                  {/* Mobile View */}
                  {/* <div className="block md:hidden">
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
                  </div> */}
                  {/* <ReactPaginate
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
                  /> */}
                 

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

      <div className="grid grid-cols-1 gap-4">
  {/* Calendar (80%) */}
  <div>
    {role === "coach" ? (
      <div className="w-full h-screen shadow shadow-indigo-300">
        <AppointmentProvider id={id}>
          <MyCalendar id={id} />
        </AppointmentProvider>
      </div>
    ) : null}
  </div>


    {/* Add graph component here */}
  </div>


  {/* <div style={{ height: '200px', width: '100%' }}>
  <h2 style={{ fontSize: '16px', marginBottom: '10px' }}>Time Graph</h2>
  {chartData ? (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw} hrs`;
              },
            },
          },
          legend: {
            display: false, // Hide legend for simplicity
          },
        },
        scales: {
          x: {
            title: {
              display: false, // Hide x-axis title for compact view
            },
            ticks: {
              display: false, // Hide labels for cleaner look
            },
          },
          y: {
            title: {
              display: false, // Hide y-axis title for compact view
            },
            min: 0,
            max: 24,
            ticks: {
              stepSize: 6,
            },
          },
        },
        barThickness: 10, // Reduce bar size
      }}
    />
  ) : (
    <p>Loading chart...</p>
  )}
</div> */}



      {/* <Notifications coachId={id} /> */}
                
      {/* <div className="">
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
      </div> */}
    </>
  );
}

export default DashboardGraph;
