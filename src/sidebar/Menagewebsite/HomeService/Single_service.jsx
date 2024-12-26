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

          <div className="flex flex-col shadow-lg mt-5">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Text
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {data.map((item, key) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                      <img
                        src={`http://127.0.0.1:8000/uploads/service_image/${item.service_image}`}
                        alt="Service"
                        className="w-24 h-20 rounded-lg border border-gray-300 shadow-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black ">
                      {item.service_text}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
        )
     }
     </Dashboard>
    </>
  );
}


export default Single_service