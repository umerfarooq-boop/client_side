import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../../Dashboard";
import axios from "../../../axios";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { RotatingLines } from "react-loader-spinner";

function Show_player() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`/player/${id}`);
        if (response.data && Array.isArray(response.data.player_record)) {
          setData(response.data.player_record);
          
        } else if(response.data && response.data.player_record){
            setData([response.data.player_record]);
            setLoading(false);
        }
        
        else {
          console.error("Unexpected response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching coach record:", error);
      }
    };
    fetchRecord();
  }, [id]);

  return (
    <Dashboard>
      {
        loading ? (
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
          <div>
            {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="p-6 bg-gray-100">
            <div className="grid grid-cols-1 gap-6">
              {/* Coach Details */}
              <div className="p-6 bg-white shadow-lg rounded-lg lg:col-span-2">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Player Details
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm text-left">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2">Player Name</th>
                        <th className="px-4 py-2">Sport</th>
                        <th className="px-4 py-2">Gender</th>
                        <th className="px-4 py-2">Address</th>
                        <th className="px-4 py-2">Location</th>
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-2">
                          {item.player_name ?? "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.sport_category?.name ?? "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.player_gender ?? "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.player_address ?? "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.player_location ?? "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.player_phonenumber ?? "Data Not Found"}
                        </td>
                        <td>
                          {item.image ? (
                            <img
                              src={`http://127.0.0.1:8000/uploads/player_image/${item.image}`}
                              alt="Coach"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "5px",
                                padding: "5px",
                              }}
                            />
                          ) : (
                            <p className="text-gray-600 mt-4">
                              Coach image not available
                            </p>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Parent Detial */}

            <div className="grid grid-cols-1 gap-6 mt-9">
              {/* Coach Details */}
              <div className="p-6 bg-white shadow-lg rounded-lg lg:col-span-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Parent  Details
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm text-left">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2">Parent Name</th>
                        <th className="px-4 py-2">CNIC</th>
                        <th className="px-4 py-2">Phone Number</th>
                      </tr>
                    </thead>
                    <tbody>
                        {item.player_parent && item.player_parent.length > 0 ? (
                            item.player_parent.map((parent, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2">{parent.name ?? "Data Not Found"}</td>
                                <td className="px-4 py-2">{parent.cnic ?? "Data Not Found"}</td>
                                <td className="px-4 py-2">{parent.phone_number ?? "Data Not Found"}</td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td className="px-4 py-2" colSpan="3">
                                Parent Data Not Found
                            </td>
                            </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        ))
      ) : (
        <p className="text-center p-5">No records found for this coach.</p>
      )}
          </div>
        )
      }

      
    </Dashboard>
  );
}




export default Show_player