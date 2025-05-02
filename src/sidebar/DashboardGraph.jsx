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

import {
  AreaChart,
  Area,
} from 'recharts';


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

const performanceData = [
  { month: 'Jan', performance: 70 },
  { month: 'Feb', performance: 75 },
  { month: 'Mar', performance: 80 },
  { month: 'Apr', performance: 85 },
];

const scoreData = [
  { month: 'Jan', score: 50 },
  { month: 'Feb', score: 60 },
  { month: 'Mar', score: 70 },
  { month: 'Apr', score: 65 },
];

const avgData = [
  { month: 'Jan', avg: 60 },
  { month: 'Feb', avg: 67 },
  { month: 'Mar', avg: 73 },
  { month: 'Apr', avg: 68 },
];

const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#FF4444','#4F46E5', '#34D399', '#F59E0B', '#EF4444'];

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function DashboardGraph() {
  const [activeTab, setActiveTab] = useState("profile");



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
  const role = localStorage.getItem("role");

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
        ) : role === 'player' ? (

          <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">

      
          {/* Performance Graph */}
          <div className="shadow-sm border border-gray-200 rounded-xl p-4 bg-white">
            <h2 className="text-md font-semibold mb-3">Performance Graph</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="performance" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
      
          {/* Score Graph */}
          <div className="shadow-sm border border-gray-200 rounded-xl p-4 bg-white">
            <h2 className="text-md font-semibold mb-3">Score Graph</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#EF4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
      
          {/* Monthly Average Graph */}
          <div className="shadow-sm border border-gray-200 rounded-xl p-4 bg-white">
            <h2 className="text-md font-semibold mb-3">Monthly Average</h2>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={avgData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="avg" stroke="#10B981" fill="#D1FAE5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
        </div>
        ) : null
      }

        {/* <ToastContainer /> */}


      <div className="grid grid-cols-1 gap-4">
  {/* Calendar (80%) */}
  <div>
    {role === "coach" || role === 'player' ? (
      <div className="w-full h-screen shadow shadow-indigo-300">
        <AppointmentProvider id={id}>
          <MyCalendar id={id} />
        </AppointmentProvider>
      </div>
    ) : null}
  </div>


    {/* Add graph component here */}
  </div>


    </>
  );
}

export default DashboardGraph;
