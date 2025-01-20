import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../axios'
import { ToastContainer,toast } from 'react-toastify';
import { useAppointments } from '../context/AppointmentContext';

function ChangeRequest({id}) {

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(5); // Set items per page
    const [orderBy, setOrderBy] = useState("name");
    const [order, setOrder] = useState("asc");
    const [page, setPage] = useState(0);
    const role = localStorage.getItem("role");
    const [data,setData] = useState([])
    const { updateStatus,fetchAppointments } = useAppointments();
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

   

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(`/PlayerRequests/${id}`);
            if (response.data?.CoachSchedule) {
              const scheduleData = Array.isArray(response.data.CoachSchedule)
                ? response.data.CoachSchedule
                : [response.data.CoachSchedule];
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        getData();
      }, [id,setData]);

        
      
        useEffect(() => {
          const getData = async () => {
            try {
              const response = await axios.get(`/PlayerRequests/${id}`);
              if (response.data?.CoachSchedule) {
                setData(response.data.CoachSchedule);
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
      
          getData();
        }, [id]);
      
        const handleStatusChange = async (aid, newStatus) => {
            if (!aid || !newStatus) return; // Validate input
          
            try {
              const endpoint =
                newStatus === "booked"
                  ? `/AcceptRequest/${aid}`
                  : newStatus === "reject"
                  ? `/RejectRequest/${aid}`
                  : null;
          
              if (!endpoint) throw new Error("Invalid status or endpoint");
          
              const response = await axios.get(endpoint);
          
              if (response.status === 200 || response.status === 201) {
                toast.success(`Status updated to '${newStatus}'`);
                
                updateStatus(aid, newStatus); // Update the calendar context
                fetchAppointments(); // Refetch appointments to ensure the calendar is accurate
              } else {
                toast.error("Failed to update status");
              }
            } catch (error) {
              console.error("Error updating status:", error);
              toast.error("Failed to update status");
            }
          };
          
          
      

    return (
    <>
    <ToastContainer />
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
  {item.status === "processing" ? (
    <div className="flex space-x-2">
      <button
        onClick={() => handleStatusChange(item.id, "booked")}
        className="bg-lime-400 text-black font-semibold py-1 px-2 rounded shadow"
      >
        Accept
      </button>
      <button
        onClick={() => handleStatusChange(item.id, "reject")}
        className="bg-red-600 text-black font-semibold py-1 px-2 rounded shadow"
      >
        Decline
      </button>
    </div>
  ) : item.status === "booked" ? (
    <button className="bg-green-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300">
      Booked
    </button>
  ) : item.status === "reject" ? (
    <button className="bg-red-600 text-black font-semibold py-1 px-2 rounded shadow hover:bg-red-500 transition duration-300">
      Reject
    </button>
  ) : null}
</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
    </>
  )
}

export default ChangeRequest