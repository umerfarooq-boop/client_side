import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../../Dashboard";
import axios from "../../../axios";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";

function ShowCoach() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`/coach/${id}`);
        if (response.data && response.data.coach_record) {
          setData(response.data.coach_record);
          // console.log('Record is', response.data.coach_record);
        } else {
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
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index} className="p-6 bg-gray-100">
            <div className="grid grid-cols-1 gap-6">
              {/* Coach Details */}
              <div className="p-6 bg-white shadow-lg rounded-lg lg:col-span-2">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Coach Details
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm text-left">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2">Coach Name</th>
                        <th className="px-4 py-2">Level</th>
                        <th className="px-4 py-2">Experience</th>
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">Location</th>
                        <th className="px-4 py-2">Academy Name</th>
                        <th className="px-4 py-2">Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-2">
                          {item.name ?? "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.level ?? "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.experience ?? "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.phone_number ?? "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.coach_location ?? "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.single_academy?.academy_name ??
                            "Data Not Found"}
                        </td>
                        <td>
                          {item.image ? (
                            <img
                              src={`http://127.0.0.1:8000/uploads/coach_image/${item.image}`}
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
            {/* Academy Detial */}

            <div className="grid grid-cols-1 gap-6 mt-9">
              {/* Coach Details */}
              <div className="p-6 bg-white shadow-lg rounded-lg lg:col-span-full">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Academy Details
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm text-left">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2">Academy Name</th>
                        <th className="px-4 py-2">Location</th>
                        <th className="px-4 py-2">Address</th>
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">Coach Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-2">
                          {item.single_academy?.academy_name ??
                            "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.single_academy?.academy_location ??
                            "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.single_academy?.address ?? "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.single_academy?.academy_phonenumber ??
                            "Data Not Found"}
                        </td>
                        <td className="px-4 py-2">
                          {item.name ?? "Data Not Found"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Academic Information */}
              <div className="grid grid-cols-1 gap-6 mt-9">
                {/* Coach Details */}
                <div className="p-6 bg-white shadow-lg rounded-lg lg:col-span-full">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Certificate
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm text-left">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="px-4 py-2 place-content-evenly">Academy Certificate</th>
                          <th className="px-4 py-2 place-content-evenly">Coach Certificate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="px-4 py-2 place-content-evenly">
                            <button className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-all">
                              <a
                                href={`http://127.0.0.1:8000/api/DownloadFile/academy_certificate/${item.single_academy.academy_certificate}`}
                                download={
                                  item.single_academy.academy_certificate
                                }
                                className="flex items-center justify-center"
                              >
                                <DownloadForOfflineIcon
                                  className="mr-2 text-white"
                                  sx={{ fontSize: 24 }}
                                />
                                Academy Certificate
                              </a>
                            </button>
                          </td>
                          
                          <td className="px-4 py-2 place-content-evenly">
                            <button className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-all">
                              <a
                                href={`http://127.0.0.1:8000/api/DownloadFile/coach_certificate/${item.certificate}`}
                                download={
                                  item.single_academy.academy_certificate
                                }
                                className="flex items-center justify-center"
                              >
                                <DownloadForOfflineIcon
                                  className="mr-2 text-white"
                                  sx={{ fontSize: 24 }}
                                />
                                Coach Certificate
                              </a>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              {/* <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Academy Certificate
                </h2>
                <button className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-all">
                  <a
                    href={`http://127.0.0.1:8000/api/DownloadFile/academy_certificate/${item.single_academy.academy_certificate}`}
                    download={item.single_academy.academy_certificate}
                    className="flex items-center justify-center"
                  >
                    <DownloadForOfflineIcon
                      className="mr-2 text-white"
                      sx={{ fontSize: 24 }}
                    />
                    Academy Certificate
                  </a>
                </button>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Coach Certificate
                </h2>
                <button className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-all">
                  <a
                    href={`http://127.0.0.1:8000/api/DownloadFile/coach_certificate/${item.certificate}`}
                    download={item.single_academy.academy_certificate}
                    className="flex items-center justify-center"
                  >
                    <DownloadForOfflineIcon
                      className="mr-2 text-white"
                      sx={{ fontSize: 24 }}
                    />
                    Coach Certificate
                  </a>
                </button>
              </div> */}
            </div>

            {/* Placeholder Content */}
          </div>
        ))
      ) : (
        <p className="text-center p-5">No records found for this coach.</p>
      )}
    </Dashboard>
  );
}

export default ShowCoach;
