import React, { useEffect, useMemo, useState } from "react";
import axios from "../../axios";
import { MaterialReactTable } from "material-react-table";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Show_EditAppointment() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  let role = localStorage.getItem("role");
  role = "player"; // for now

  const getData = async () => {
    try {
      const response = await axios.get(`/edit_appointment/${id}`);
      if (response.data?.showAppointment) {
        const scheduleData = Array.isArray(response.data.showAppointment)
          ? response.data.showAppointment
          : [response.data.showAppointment];
        setData(scheduleData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "player.player_name",
        header: "Name",
      },
      {
        accessorKey: "player.player_dob",
        header: "Age",
        Cell: ({ row }) => {
          const dob = row.original.player?.player_dob;
          if (!dob) return "N/A";
          const age = new Date().getFullYear() - new Date(dob).getFullYear();
          return age;
        },
      },
      {
        accessorKey: "sportcategory.name",
        header: "Sport",
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
        },
      },
      {
        accessorKey: "date_range",
        header: "Date Range",
        Cell: ({ row }) => {
          const from = new Date(row.original.from_date).toLocaleDateString();
          const to = new Date(row.original.to_date).toLocaleDateString();
          return `${from} - ${to}`;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
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
    ],
    []
  );

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

  return (
    <>
      <ToastContainer />
      <div className="p-6 rounded-md shadow-lg bg-white text-black">
        <div className="overflow-x-auto">
          {role === "player" && (
            <>
              {data.length > 0 ? (
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
                <p className="text-center text-gray-500">No appointment requests found.</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Show_EditAppointment;
