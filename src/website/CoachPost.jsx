import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import axios from "../axios";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FilterList } from "@mui/icons-material";
import back from '../../public/back.jpg'
import Footer from './Footer'

function CoachPost() {
  const [loader, setLoader] = useState(true);
  const [post, setPost] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [coachLevels, setCoachLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [location, setLocation] = useState("");
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState(false);

  // Fetch Posts
  const fetchData = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`/showpost?page=${page}`);
      const fetchedPosts = response.data.post.data;

      const uniqueLevels = [
        ...new Set(fetchedPosts.map((item) => item.coach.level)),
      ];

      setPagination(response.data.post);
      setPost(fetchedPosts);
      setFilteredPosts(fetchedPosts);
      setCoachLevels(uniqueLevels);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (selectedLevel) {
      const filtered = post.filter((item) => item.coach.level === selectedLevel);
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(post);
    }
  }, [selectedLevel, post]);

  const handleSearch = () => {
    let filtered = post;

    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.coach.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (location.trim()) {
      filtered = filtered.filter((item) =>
        item.coach.coach_location.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  };

  const renderPaginationLinks = () => {
    return (
      <nav aria-label="Page navigation example">
        <ul className="flex float-right -space-x-px h-8 text-sm">
          {pagination.links?.map((link, index) => (
            <li key={index}>
              <button
                className={`flex items-center justify-center px-3 h-8 leading-tight border 
                  ${
                    link.active
                      ? "z-10 text-indigo-600 border-indigo-300 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700"
                      : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  }
                  rounded-${index === 0 ? "s-lg" : index === pagination.links.length - 1 ? "e-lg" : ""}`}
                onClick={() => {
                  if (link.url) {
                    const urlParams = new URL(link.url);
                    setPage(parseInt(urlParams.searchParams.get("page"), 10));
                  }
                }}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            </li>
          ))}
        </ul>
    </nav>

    );
  };

  const filterEffect = () => {
    setToggle(!toggle);
  };

  return (
    <>
      {loader ? (
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
          <Nav />
          <div className="text-center mt-10">
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Coach <span className="text-indigo-600">Post</span>
            </h3>
          </div>

          {/* <h1>UMer</h1> */}

          <div>
      
        <div className="grid-cols-1 flex justify-end items-end mr-10">
          <button
          onClick={filterEffect}
          className="flex items-center bg-indigo-600 min-w-auto float-right  text-white font-medium p-2 rounded-lg hover:bg-indigo-500 transition-all duration-1000"
          >
          <FilterList className="ml-auto" fontSize="medium" />
          <span>Filter</span>
        </button>
        </div>
    <div
      className={`transition-all duration-1000 ease-in-out transform ${
        toggle ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      }`}
      style={{ overflow: "hidden" }}
    >
      <div className="flex flex-wrap justify-center gap-4 px-4 lg:px-36 sm:px-10">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by name"
          className="bg-gray-100 border border-green-800 p-2 rounded-lg lg:w-60 sm:w-auto sm:flex-grow focus:outline-none focus:ring-2 focus:ring-green-800"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="text"
          value={location}
          placeholder="Search by location"
          className="bg-gray-100 border border-green-800 p-2 rounded-lg lg:w-60 sm:w-auto sm:flex-grow focus:outline-none focus:ring-2 focus:ring-green-800"
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          onChange={(e) => setSelectedLevel(e.target.value)}
          value={selectedLevel}
          className="bg-gray-100 border border-green-800 p-2 rounded-lg lg:w-60 sm:w-auto sm:flex-grow focus:outline-none focus:ring-2 focus:ring-green-800"
        >
          <option value="">All Coaches</option>
          {coachLevels.map((level, index) => (
            <option key={index} value={level}>
              {level}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 lg:w-32 sm:w-auto transition-transform transform hover:scale-105"
        >
          Search
        </button>
      </div>
    </div>
  </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-20 p-4">
            {filteredPosts.map((item) => (
              <div
                key={item.id}
                className="w-56 max-h-auto mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900 duration-500 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative rounded-t-lg h-32 overflow-hidden shadow-lg group">
                  <img
                    className="object-cover w-full h-full"
                    src={back}
                  />
                  <span
                    className={`absolute top-0 left-0 text-xs font-semibold px-3 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ${
                      item.coach.level === "level 1"
                        ? "bg-green-500 text-yellow-900"
                        : item.coach.level === "level 2"
                        ? "bg-yellow-500 text-yellow-900"
                        : "bg-red-500 text-yellow-900"
                    }`}
                  >
                    {item.coach.level}
                  </span>
                </div>

                <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                  <img
                    className="object-cover w-full h-full"
                    src={`http://127.0.0.1:8000/uploads/coach_image/${item.coach.image}`}
                    alt="Coach"
                  />
                </div>

                <div className="text-center mt-2">
                  <h2 className="font-semibold">{item.coach.name}</h2>
                  <p className="text-gray-500">{item.post_title}</p>
                </div>

                <div className="p-4 border-t mx-8 mt-2">
                  <Link to={`/coachdetail/${item.coach.id}`}>
                    <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition-transform transform hover:scale-105">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
            <div className="m-4 flex justify-end">{renderPaginationLinks()}</div>

          </div>

        

      )}
      <div>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default CoachPost;
