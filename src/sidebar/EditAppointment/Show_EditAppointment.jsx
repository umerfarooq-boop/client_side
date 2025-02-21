import React, { useEffect, useMemo, useState } from "react";
import axios from "../../axios";
import { MaterialReactTable } from "material-react-table";
import { format } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Dashboard from "../Dashboard";
import { ToastContainer, toast } from "react-toastify";

function Show_EditAppointment() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5); // Set items per page
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [player_id,setPlayerid] = useState("");
  let role = localStorage.getItem("role");
  role = "player";
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
        const response = await axios.get(
          `/edit_appointment/${id}`
        );
        if (response.data?.showAppointment) {
          const scheduleData = Array.isArray(response.data.showAppointment)
            ? response.data.showAppointment
            : [response.data.showAppointment];
          setData(scheduleData);
          //   setPagination(response.data.CoachSchedule);]
          console.log("That is Schedule Data of PLAYER ID")
          console.log(scheduleData.player_id)
          console.log(scheduleData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [page, id, role]);

  const AcceptPlayerRequest = async (playerid) => {
    try {
        const response = await axios.get(`/AcceptEditAppointment/${playerid}`);
    if(response){
        toast.success("Appointment Update Successfully");
    }else{
        toast.error("Something Went Wrong");
    }
    } catch (error) {
        console.log(error)
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: "player.player_name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "player.player_dob",
        header: "Age",
        size: 150,
        Cell: ({ row }) => {
          const player = row.original.player; // Safely access player object
      
          if (!player || !player.player_dob) {
            return <span>N/A</span>; // Handle null or undefined player/player_dob
          }
      
          // Function to calculate age from DOB
          const calculateAge = (dob) => {
            const birthDate = new Date(dob);
            const ageDifMs = Date.now() - birthDate.getTime();
            const ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
          };
      
          const age = calculateAge(player.player_dob);
      
          return <span>{age}</span>;
        },
      },
      

      {
        accessorKey: "sportcategory.name",
        header: "Sport",
        size: 150,
      },
      {
        header: "Time",
        size: 150,
        cell: ({ row }) => {
          const { start_time, end_time } = row.original; // Access the actual row data

          const formatTime = (time) => {
            // Convert the 24-hour time (HH:mm:ss) into a Date object
            const [hour, minute, second] = time.split(":").map(Number);
            const date = new Date(1970, 0, 1, hour, minute, second); // Create a Date object for time
            return format(date, "h:mm a"); // Format the Date object into 12-hour format with AM/PM
          };

          // If both start_time and end_time are available, format them into the range
          if (start_time && end_time) {
            return `${formatTime(start_time)} - ${formatTime(end_time)}`;
          }

          return ""; // Return empty string if times are missing
        },
        accessorFn: (row) => `${row.start_time} - ${row.end_time}`, // Combine times into a single string for better mapping
      },
      {
        accessorKey: "date_range", // This can be any unique key; it's not directly used here
        header: "Date Range",
        size: 150,
        Cell: ({ row }) => {
          const { to_date, from_date } = row.original;

          // Check if the dates exist and are valid
          const formattedFromDate = from_date
            ? new Date(from_date).toLocaleDateString()
            : "N/A";
          const formattedToDate = to_date
            ? new Date(to_date).toLocaleDateString()
            : "N/A";

          return (
            <span>
              {formattedFromDate} - {formattedToDate}
            </span>
          );
        },
      },

      {
        accessorKey: "status",
        header: "Status",
        size: 5,
        Cell: ({ row }) => {
          const status = row.original.status; // Extracting status from row data
          const playerId = row.original.player_id || row.original.coach_schedule?.player_id; // Check both sources
          return (
            <div style={{ display: "flex", gap: "20px" }}>
              
                <div className="">
                  
                  <button
                    className="bg-green-600 text-black font-semibold py-1.5 px-3 rounded shadow hover:bg-orange-500 transition duration-300"
                    onClick={() => AcceptPlayerRequest(playerId)}
                  >
                    Accept
                  </button>
                  &nbsp;
                  <Link
                    className="bg-red-600 text-black font-semibold py-1.5 px-3 rounded shadow hover:bg-orange-500 transition duration-300"
                    to={`/editplayer_appointment/${row.original.id}`}
                  >
                    Reject
                  </Link>
                </div>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
        <Dashboard>
            <ToastContainer />
            <div>
                <div className="p-6 rounded-md shadow-lg bg-white text-black">
                <div className="text-center">
                    <h3 className="text-3xl sm:text-2xl leading-normal font-extrabold italic tracking-tight text-gray-900">
                    Edit Boo<span className="text-indigo-600">king Requests</span>
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    {role === "player" ? <div></div> : null}
                </div>

                {role === "player" ? (
                    <div>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-screen">
                        <RotatingLines
                            visible={true}
                            height="96"
                            width="96"
                            color="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                        />
                        </div>
                    ) : (
                        <MaterialReactTable
                        columns={columns}
                        data={data}
                        muiTableBodyCellProps={{
                            style: { wordWrap: "break-word", maxWidth: "200px" },
                        }}
                        muiTableContainerProps={{
                            style: { overflowX: "auto" }, // Horizontal scrolling for smaller screens
                        }}
                        />
                    )}
                    </div>
                ) : null}
                </div>
            </div>
        </Dashboard>
    </>
  );
}
export default Show_EditAppointment;
