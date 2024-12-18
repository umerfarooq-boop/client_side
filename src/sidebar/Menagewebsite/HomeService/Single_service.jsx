import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Dashboard from "../../Dashboard";

function Single_service() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [loading,setLoading] = useState(true);
useEffect(() => {
    const getSlidderRecord = async () => {
        try {
            const response = await axios.get(`/homeservice/${id}`);
            if (response.data && Array.isArray(response.data.service)) {
                setData(response.data.service);
            } else if(response.data && response.data.service){
                setData([response.data.service]);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching slider data:", error);
        }
    };
    getSlidderRecord();
}, [id]);

  return (
    <>
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

            <div className="p-4 col-12 gap-12">
              <div class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                <table class="w-full text-left table-auto min-w-max">
                  <thead>
                    <tr>
                      <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Text
                        </p>
                      </th>
                      <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Image
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((index, key) => (
                      <tr key={index.id || index}>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {index.service_text}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <img
                            src={`http://127.0.0.1:8000/uploads/service_image/${index.service_image}`}
                            alt={index.service_image || "Service Image"}
                            className="w-20 h-auto rounded-md"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        )
     }
     </Dashboard>
    </>
  );
}


export default Single_service