import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import { useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Dashboard from "../../Dashboard";

function SingleSlidder() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [loading,setLoading] = useState(true);
useEffect(() => {
    const getSlidderRecord = async () => {
        try {
            const response = await axios.get(`/homeslidder/${id}`);
            if (response.data && Array.isArray(response.data.slide)) {
                setData(response.data.slide);
            } else if(response.data && response.data.slide){
                setData([response.data.slide]);
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

          <div className="flex justify-center items-center mt-5">
          {
            data.map((index,key) =>(
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 p-5 shadow-xl border border-gray-200 rounded-lg bg-white w-full max-w-4xl transform transition-all duration-300 hover:shadow-2xl">
    <div className="flex flex-col items-center text-center">
      <p className="text-xl font-semibold text-gray-700">Image</p>
      <img
        src={`http://127.0.0.1:8000/uploads/slidder_image/${index.slidder_image}`}
        alt="Sample"
        className="w-48 h-40 mt-4 rounded-lg border border-gray-300 shadow-md"
      />
    </div>
    <div className="flex flex-col justify-center items-center md:items-start">
      <p className="text-xl font-semibold text-gray-700">Text</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Coach Selector</h1>
      <p className="mt-2 text-gray-600 text-sm">
      {index.slidder_text}
      </p>
    </div>
  </div>
            ))
          }
        </div>




        
        )
     }
     </Dashboard>
    </>
  );
}

export default SingleSlidder;
