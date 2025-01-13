import React, { useEffect, useState } from 'react'
import axios from '../axios'
import ReactPaginate from "react-paginate";
import Nav from './Nav';

function PlayerRequest() {

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5); // Set items per page
    const [orderBy, setOrderBy] = useState("name");
    const [order, setOrder] = useState("asc");
    const [page, setPage] = useState(0);
    const [data,setData] = useState([]);
    const player_id = localStorage.getItem('player_id');
    let role = localStorage.getItem('role');
    role = 'player';
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
            const response = await axios.get(`/SinglePlayerRequest/${player_id}/${role}`);
            if (response.data?.SinglePlayerRequest) {
              const scheduleData = Array.isArray(response.data.SinglePlayerRequest)
                ? response.data.SinglePlayerRequest
                : [response.data.SinglePlayerRequest];
              setData(scheduleData);
            //   setPagination(response.data.CoachSchedule);
              console.log(scheduleData);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        getData();
      }, [page,player_id,role]);
  return (
    <>
        <Nav />
        <div>
        <div className="p-6 rounded-md shadow-lg bg-white text-black">
      <h1 className="text-xl font-bold mb-4">Your Bookings</h1>
      <div className="overflow-x-auto">
        {
          role === 'player' ? (
            <div>
              <table className="min-w-full divide-y divide-gray-200 hidden md:table">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name {orderBy === "name" ? (order === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("age")}
              >
                Age {orderBy === "age" ? (order === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("sport")}
              >
                Sport {orderBy === "sport" ? (order === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
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
                        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // Approximate years
                      })()
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  {item.sport_category?.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  {item.start_time
                    ? new Date(`1970-01-01T${item.start_time}`).toLocaleTimeString(
                        [],
                        { hour: "numeric", hour12: true }
                      )
                    : "N/A"}
                  &nbsp;<b>-</b>&nbsp;
                  {item.end_time
                    ? new Date(`1970-01-01T${item.end_time}`).toLocaleTimeString(
                        [],
                        { hour: "numeric", hour12: true }
                      )
                    : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  {item.to_date} &nbsp; {item.from_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                  <div className="flex space-x-2">
                    {
                        item.status === 'processing' ? (
                            <button className="bg-lime-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300">
                                Processing
                            </button>
                        ) : item.status === 'booked' ? (
                            <button className="bg-red-600 text-black font-semibold py-1 px-2 rounded shadow hover:bg-red-500 transition duration-300">
                             Rejected
                            </button>
                        ) : null
                    }
                    
                  </div>
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
                <span className="font-semibold">Name:</span> {item.player?.player_name || "N/A"}
              </p>
              <p className="text-sm font-medium text-gray-500">
                <span className="font-semibold">Age:</span>{" "}
                {item.player?.player_dob
                  ? (() => {
                      const dob = new Date(item.player.player_dob);
                      const diff = new Date() - dob;
                      return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // Approximate years
                    })()
                  : "N/A"}
              </p>
              <p className="text-sm font-medium text-gray-500">
                <span className="font-semibold">Sport:</span> {item.sport_category?.name || "N/A"}
              </p>
              <p className="text-sm font-medium text-gray-500">
                <span className="font-semibold">Time:</span>{" "}
                {item.start_time
                  ? new Date(`1970-01-01T${item.start_time}`).toLocaleTimeString([], {
                      hour: "numeric",
                      hour12: true,
                    })
                  : "N/A"}
                &nbsp;<b>-</b>&nbsp;
                {item.end_time
                  ? new Date(`1970-01-01T${item.end_time}`).toLocaleTimeString([], {
                      hour: "numeric",
                      hour12: true,
                    })
                  : "N/A"}
              </p>
              <p className="text-sm font-medium text-gray-500">
                <span className="font-semibold">Date:</span> {item.to_date} &nbsp; {item.from_date}
              </p>
              <div className="mt-2">
                <button className="bg-lime-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300 mr-2">
                  Accept
                </button>
                <button className="bg-red-600 text-black font-semibold py-1 px-2 rounded shadow hover:bg-red-500 transition duration-300">
                  Decline
                </button>
              </div>
              
            </div>
            
          ))}
        </div>
            </div>
          ) : null
        }
      </div>
      <ReactPaginate
                className="flex items-center justify-center mt-4 space-x-3"
                previousLabel={
                  <button className="">
                    Previous
                  </button>
                }
                nextLabel={
                  <button className="">
                    Next
                  </button>
                }
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName="flex items-center space-x-3"
                pageLinkClassName="px-3 py-2 bg-white border rounded shadow-md transition duration-300 ease-in-out hover:bg-indigo-100 hover:text-indigo-700"
                previousLinkClassName="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded shadow-md"
                nextLinkClassName="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded shadow-md"
                disabledClassName="opacity-50 cursor-not-allowed"
                activeClassName="bg-indigo-500 text-white border-indigo-500 shadow-lg"
              />

      




          </div>
        </div>
    </>
  )
}

export default PlayerRequest