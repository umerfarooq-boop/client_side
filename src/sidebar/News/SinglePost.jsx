import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { RotatingLines } from "react-loader-spinner";

function SinglePost() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [expand, setExpand] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const getPostData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/posts/${id}`);
        setData(response.data.post);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPostData();
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
           <div>
             {data.map((index, key) => (
              <div
                className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
                key={key}
              >
                <div className="py-16 p-4 text-center col-span-2 text-black">
                  <img
                    src={`http://127.0.0.1:8000/uploads/coach_posts/${index.post_image}`}
                    alt=""
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
    
                <div className="p-4 text-center col-span-2 text-black">
                  <div className="p-4 bg-white rounded-lg">
                    <p className="font-bold text-2xl text-indigo-500">
                      {index.post_title}
                    </p>
                    <br />
                    <p className="text-start text-sm">
                      <b className="text-xl text-indigo-900 font-bold underline">
                        {index.post_name} :
                      </b>
                    </p>
    
                    {/* Custom Read More / Read Less functionality */}
                    <p className="text-start justify-start text-gray-700">
                      {expand
                        ? index.post_description
                        : index.post_description.substring(0, 200)}
                    </p>
    
                    {index.post_description.length > 200 && (
                      <button
                        onClick={() => setExpand(!expand)}
                        className="text-indigo-500"
                      >
                        {expand ? "Read less ▲" : "Read more ▼"}
                      </button>
                    )}
                  </div>
                </div>
                
              </div>
              
            ))}
            <div className="p-4 col-12 gap-12">
                  <div class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
                    <table class="w-full text-left table-auto min-w-max">
                      <thead>
                        <tr>
                          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                              Coach Name
                            </p>
                          </th>
                          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                              Post Time
                            </p>
                          </th>
                          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                              Post Date
                            </p>
                          </th>
                          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                              Post Time ago
                            </p>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((index, key) => (
                          <tr key={key}>
                            <td class="p-4 border-b border-blue-gray-50">
                              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {index.coach.name}
                              </p>
                            </td>
                            <td class="p-4 border-b border-blue-gray-50">
                              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {new Date(index.post_time).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </td>
                            <td class="p-4 border-b border-blue-gray-50">
                              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {new Date(index.post_time).toLocaleDateString()}
                              </p>
                            </td>
                            <td class="p-4 border-b border-blue-gray-50">
                              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {(() => {
                                  const postTime = new Date(
                                    index.post_time + " UTC"
                                  ); // Parse as UTC
                                  const currentTime = new Date();
                                  const timeDiff = currentTime - postTime;
    
                                  const seconds = Math.floor(timeDiff / 1000);
                                  const minutes = Math.floor(seconds / 60);
                                  const hours = Math.floor(minutes / 60);
                                  const days = Math.floor(hours / 24);
                                  const weeks = Math.floor(days / 7);
    
                                  if (seconds < 60) return "Just now";
                                  if (minutes < 60)
                                    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
                                  if (hours < 24)
                                    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
                                  if (days < 7)
                                    return `${days} day${days > 1 ? "s" : ""} ago`;
                                  return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
                                })()}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
           </div>
          )
        }
      </Dashboard>
    </>
  );
}

export default SinglePost;
