<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
// import React, { useEffect, useMemo, useState } from "react";
// import axios from "../../axios";
// import { MaterialReactTable } from "material-react-table";
// import { format } from "date-fns";
// import { Link, useParams } from "react-router-dom";
// // import loadingAnimation from '../../loader/Animation - 1747181954747.json';
// // import Lottie from 'lottie-react';
// import { ToastContainer, toast } from "react-toastify";

// function Show_EditAppointment() {
//   const { id } = useParams();
//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage] = useState(5);
//   const [orderBy, setOrderBy] = useState("name");
//   const [order, setOrder] = useState("asc");
//   const [data, setData] = useState([]);
//   // const [loader, setLoading] = useState(true);
//   let role = localStorage.getItem("role");
//   role = "player"; // hardcoded for now

//   const handleSort = (field) => {
//     if (orderBy === field) {
//       setOrder(order === "asc" ? "desc" : "asc");
//     } else {
//       setOrderBy(field);
//       setOrder("asc");
//     }
//   };

//   const sortedData = [...data].sort((a, b) => {
//     if (order === "asc") {
//       return a[orderBy] > b[orderBy] ? 1 : -1;
//     } else {
//       return a[orderBy] < b[orderBy] ? 1 : -1;
//     }
//   });

//   const displayedData = sortedData.slice(
//     currentPage * itemsPerPage,
//     (currentPage + 1) * itemsPerPage
//   );

//   const pageCount = Math.ceil(data.length / itemsPerPage);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };
//   const getData = async () => {
//     try {
//       const response = await axios.get(`/edit_appointment/${id}`);
//       if (response.data?.showAppointment) {
//         const scheduleData = Array.isArray(response.data.showAppointment)
//           ? response.data.showAppointment
//           : [response.data.showAppointment];
//         setData(scheduleData);
//         setLoading(false);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   useEffect(() => {
//     getData();
//   }, [id]);

//   const AcceptPlayerRequest = async (playerid) => {
//     try {
//       const response = await axios.get(`/AcceptEditAppointment/${playerid}`);
//       if (response) {
//         getData();
//         toast.success("Appointment Updated Successfully");
//       } else {
//         toast.error("Something Went Wrong");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("An error occurred while accepting the request.");
//     }
//   };

//   const Reject = async (id) =>{
//     const response = await axios.get(`/reject_edit_appointment/${id}`);
//     if(response.data.success){
//       toast.success(response.data.message);
//       getData();      
//     }else{
//       toast.error('Record Not Delete');
//     }
//   }

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "player.player_name",
//         header: "Name",
//         size: 150,
//       },
//       {
//         accessorKey: "player.player_dob",
//         header: "Age",
//         size: 150,
//         Cell: ({ row }) => {
//           const player = row.original.player;
//           if (!player?.player_dob) return <span>N/A</span>;

//           const calculateAge = (dob) => {
//             const birthDate = new Date(dob);
//             const ageDifMs = Date.now() - birthDate.getTime();
//             const ageDate = new Date(ageDifMs);
//             return Math.abs(ageDate.getUTCFullYear() - 1970);
//           };

//           return <span>{calculateAge(player.player_dob)}</span>;
//         },
//       },
//       {
//         accessorKey: "sportcategory.name",
//         header: "Sport",
//         size: 150,
//       },
//       {
//         header: "Time",
//         size: 150,
//         accessorFn: (row) => `${row.start_time} - ${row.end_time}`,
//         Cell: ({ row }) => {
//           const { start_time, end_time } = row.original;

//           const formatTime = (time) => {
//             const [hour, minute, second] = time.split(":").map(Number);
//             const date = new Date(1970, 0, 1, hour, minute, second);
//             return format(date, "h:mm a");
//           };

//           return start_time && end_time
//             ? `${formatTime(start_time)} - ${formatTime(end_time)}`
//             : "";
//         },
//       },
//       {
//         accessorKey: "date_range",
//         header: "Date Range",
//         size: 150,
//         Cell: ({ row }) => {
//           const { from_date, to_date } = row.original;
//           const formattedFromDate = from_date
//             ? new Date(from_date).toLocaleDateString()
//             : "N/A";
//           const formattedToDate = to_date
//             ? new Date(to_date).toLocaleDateString()
//             : "N/A";
//           return <span>{formattedFromDate} - {formattedToDate}</span>;
//         },
//       },
//       {
//         accessorKey: "status",
//         header: "Status",
//         size: 150,
//         Cell: ({ row }) => {
//           const playerId = row.original.player_id || row.original.coach_schedule?.player_id;
//           const appointmentId = row.original.id;

//           return (
//             <div className="flex gap-2">
//               <button
//                 className="bg-green-600 text-black font-semibold py-1 px-3 rounded shadow hover:bg-green-700 transition duration-300"
//                 onClick={() => AcceptPlayerRequest(playerId)}
//               >
//                 Accept
//               </button>
//               <button
//                 className="bg-red-600 text-black font-semibold py-1 px-3 rounded shadow hover:bg-red-700 transition duration-300"
//                 onClick={() => Reject(row.original.id)}
//               >
//                 Reject
//               </button>
//             </div>
//           );
//         },
//       },
//     ],
//     []
//   );

//   return (
//     <>
//       <ToastContainer />
//       <div className="p-6 rounded-md shadow-lg bg-white text-black">
//         <div className="overflow-x-auto">
//           {role === "player" && (
//             <div>
//              {/* {loader ? (
//         <div style={{ width: 200, height: 200, margin: 'auto' }}>
//           <Lottie animationData={loadingAnimation} loop={true} />
//         </div>
//       ): */}
//        (): data.length > 0 ? 
//        (
//                 <div>
//                   <div className="text-center mb-6">
//                     <h3 className="text-3xl font-extrabold italic tracking-tight text-gray-900">
//                       Edit Boo<span className="text-indigo-600">king Requests</span>
//                     </h3>
//                   </div>
//                   <MaterialReactTable
//                     columns={columns}
//                     data={data}
//                     muiTableBodyCellProps={{
//                       style: { wordWrap: "break-word", maxWidth: "200px" },
//                     }}
//                     muiTableContainerProps={{
//                       style: { overflowX: "auto" },
//                     }}
//                   />
//                 </div>
//               ) : (
//                 <p className="text-center"></p>
//               )
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Show_EditAppointment;
 


>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
>>>>>>> b9fc2e00330dce2c3587629aee8748f26d476ae4
import React, { useEffect, useMemo, useState } from "react";
import axios from "../../axios";
import { MaterialReactTable } from "material-react-table";
import { format } from "date-fns";
<<<<<<< HEAD
import { Link, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

function Show_EditAppointment() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let role = localStorage.getItem("role");
  role = "player"; // hardcoded for now

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
=======
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Show_EditAppointment() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  let role = localStorage.getItem("role");
  role = "player"; // for now

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  const getData = async () => {
    try {
      const response = await axios.get(`/edit_appointment/${id}`);
      if (response.data?.showAppointment) {
        const scheduleData = Array.isArray(response.data.showAppointment)
          ? response.data.showAppointment
          : [response.data.showAppointment];
        setData(scheduleData);
<<<<<<< HEAD
        setLoading(false);
=======
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
<<<<<<< HEAD
=======

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  useEffect(() => {
    getData();
  }, [id]);

<<<<<<< HEAD
  const AcceptPlayerRequest = async (playerid) => {
    try {
      const response = await axios.get(`/AcceptEditAppointment/${playerid}`);
      if (response) {
        getData();
        toast.success("Appointment Updated Successfully");
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while accepting the request.");
    }
  };

  const Reject = async (id) =>{
    const response = await axios.get(`/reject_edit_appointment/${id}`);
    if(response.data.success){
      toast.success(response.data.message);
      getData();      
    }else{
      toast.error('Record Not Delete');
    }
  }

  const NotifyToPlayer = async (id) => {
    try {
      const response = await axios.post('/NotifyEditPlayertoPayment', { id });
  
      if (response.data && response.data.success) {
        toast.success(response.data.message || 'Notification sent successfully!');
        getData();
      } else {
        toast.error(response.data.message || 'Failed to send notification.');
      }
    } catch (error) {
      console.error('Error notifying player:', error);
      toast.error('An error occurred while sending the notification.');
    }
  };

=======
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  const columns = useMemo(
    () => [
      {
        accessorKey: "player.player_name",
        header: "Name",
<<<<<<< HEAD
        size: 150,
=======
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
      },
      {
        accessorKey: "player.player_dob",
        header: "Age",
<<<<<<< HEAD
        size: 150,
        Cell: ({ row }) => {
          const player = row.original.player;
          if (!player?.player_dob) return <span>N/A</span>;

          const calculateAge = (dob) => {
            const birthDate = new Date(dob);
            const ageDifMs = Date.now() - birthDate.getTime();
            const ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
          };

          return <span>{calculateAge(player.player_dob)}</span>;
=======
        Cell: ({ row }) => {
          const dob = row.original.player?.player_dob;
          if (!dob) return "N/A";
          const age = new Date().getFullYear() - new Date(dob).getFullYear();
          return age;
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
        },
      },
      {
        accessorKey: "sportcategory.name",
        header: "Sport",
<<<<<<< HEAD
        size: 150,
      },
      {
        header: "Time",
        size: 150,
        accessorFn: (row) => `${row.start_time} - ${row.end_time}`,
        Cell: ({ row }) => {
          const { start_time, end_time } = row.original;

          const formatTime = (time) => {
            const [hour, minute, second] = time.split(":").map(Number);
            const date = new Date(1970, 0, 1, hour, minute, second);
            return format(date, "h:mm a");
          };

          return start_time && end_time
            ? `${formatTime(start_time)} - ${formatTime(end_time)}`
            : "";
=======
      },
      {
        header: "Time",
        accessorFn: (row) => `${row.start_time} - ${row.end_time}`,
        Cell: ({ row }) => {
          const formatTime = (t) => {
            const [h, m] = t.split(":");
            return `${+h % 12 || 12}:${m} ${+h < 12 ? "AM" : "PM"}`;
          };
          return `${formatTime(row.original.start_time)} - ${formatTime(row.original.end_time)}`;
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
        },
      },
      {
        accessorKey: "date_range",
        header: "Date Range",
<<<<<<< HEAD
        size: 150,
        Cell: ({ row }) => {
          const { from_date, to_date } = row.original;
          const formattedFromDate = from_date
            ? new Date(from_date).toLocaleDateString()
            : "N/A";
          const formattedToDate = to_date
            ? new Date(to_date).toLocaleDateString()
            : "N/A";
          return <span>{formattedFromDate} - {formattedToDate}</span>;
=======
        Cell: ({ row }) => {
          const from = new Date(row.original.from_date).toLocaleDateString();
          const to = new Date(row.original.to_date).toLocaleDateString();
          return `${from} - ${to}`;
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
        },
      },
      {
        accessorKey: "status",
        header: "Status",
<<<<<<< HEAD
        size: 150,
        Cell: ({ row }) => {
          const playerId = row.original.player_id || row.original.coach_schedule?.player_id;
          const appointmentId = row.original.id;

          return (
            <div className="flex gap-2">
              <button
                className="bg-green-600 text-black font-semibold py-1 px-3 rounded shadow hover:bg-green-700 transition duration-300"
                onClick={() => AcceptPlayerRequest(playerId)}
              >
                Accept
              </button>
              <button
                className="bg-red-600 text-black font-semibold py-1 px-3 rounded shadow hover:bg-red-700 transition duration-300"
                onClick={() => Reject(row.original.id)}
              >
                Reject
              </button>
            </div>
          );
        },
      },


      {
        accessorKey: 'edit_payment_status',
        header: 'Payment Status',
        size: 12,
        Cell: ({ row }) => {
          const item = row.original; // Extracting status from row data
      
          return (
            <div style={{ display: 'flex', gap: '20px' }}>
             {item.edit_payment_status === "unpaid" ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => NotifyToPlayer(item.id)}
                  className="bg-lime-400 text-black font-semibold py-1 px-2 rounded shadow"
                >
                  send
                </button>
              </div>
            ) : item.edit_payment_status === "paid" ? (
              <button className="bg-green-400 text-black font-semibold py-1 px-2 rounded shadow hover:bg-lime-500 transition duration-300">
                Paid
              </button>
            ): null}
            </div>
          );
        },
      },

=======
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={() => AcceptPlayerRequest(row.original.player_id)}
            >
              Accept
            </button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => Reject(row.original.id)}
            >
              Reject
            </button>
          </div>
        ),
      },
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
    ],
    []
  );

<<<<<<< HEAD
=======
  const AcceptPlayerRequest = async (playerid) => {
    try {
      await axios.get(`/AcceptEditAppointment/${playerid}`);
      toast.success("Appointment Updated Successfully");
      getData();
    } catch {
      toast.error("Failed to accept request");
    }
  };

  const Reject = async (id) => {
    try {
      const response = await axios.get(`/reject_edit_appointment/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        getData();
      } else {
        toast.error("Record not deleted");
      }
    } catch {
      toast.error("An error occurred");
    }
  };

>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
  return (
    <>
      <ToastContainer />
      <div className="p-6 rounded-md shadow-lg bg-white text-black">
        <div className="overflow-x-auto">
          {role === "player" && (
<<<<<<< HEAD
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
              ) : data.length > 0 ? (
=======
            <>
              {data.length > 0 ? (
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                <div>
                  <div className="text-center mb-6">
                    <h3 className="text-3xl font-extrabold italic tracking-tight text-gray-900">
                      Edit Boo<span className="text-indigo-600">king Requests</span>
                    </h3>
                  </div>
                  <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto max-h-[600px]">
                    <MaterialReactTable
                      columns={columns}
                      data={data}
                      muiTableBodyCellProps={{
                        style: { wordWrap: "break-word", whiteSpace: "normal" },
                      }}
                      muiTableContainerProps={{
                        style: { overflowX: "auto" },
                      }}
                    />
                  </div>
                </div>
              ) : (
<<<<<<< HEAD
                <p className="text-center"></p>
              )}
            </div>
=======
                <p className="text-center text-gray-500">No appointment requests found.</p>
              )}
            </>
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
          )}
        </div>
      </div>
    </>
  );
}

export default Show_EditAppointment;
<<<<<<< HEAD
 
=======
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
