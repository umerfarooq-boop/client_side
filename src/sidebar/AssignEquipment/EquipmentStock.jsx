<<<<<<< HEAD
import Dashboard from '../Dashboard'
import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../../axios'
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import Icon from "@mui/material/Icon";
import { motion } from "framer-motion";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
=======
// import Dashboard from '../Dashboard'
// import React, { useMemo, useState, useEffect } from 'react';
// import { MaterialReactTable } from 'material-react-table';
// import axios from '../../axios'
// import { Link } from 'react-router-dom';
// import { RotatingLines } from 'react-loader-spinner';
// import { ToastContainer, toast } from 'react-toastify';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
// import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
// import CancelSharpIcon from '@mui/icons-material/CancelSharp';
// import Icon from "@mui/material/Icon";
// import { motion } from "framer-motion";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// function EquipmentStock() {
//     const [data, setData] = useState([]); 
//     const [loading, setLoading] = useState(true);
//     const [toggle,setToggle] = useState(true);
//     const player_id = localStorage.getItem('player_id');
//     const coach_id = localStorage.getItem('coach_id');
//     const [isTableVisible, setIsTableVisible] = useState(true);


//     useEffect(()=>{
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`/assign_equipment/${coach_id}`);
//                 if (response.data && Array.isArray(response.data.equipment)) {
//                     setData(response.data.equipment); // Directly set the array
//                 } else if (response.data && response.data.equipment) {
//                     setData([response.data.equipment]); // Wrap single item in an array
//                 } else {
//                     console.warn("No equipment data available.");
//                 }
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     },[coach_id])

//   // Define table columns
//   const columns = useMemo(
//     () => [
//     //   {
//     //     accessorKey: 'id',
//     //     header: 'Id',
//     //     size: 150,
//     //   },
//       {
//         accessorKey: 'equipment_name',
//         header: 'Player Name',
//         size: 150,
//       },
//       {
//         accessorKey: 'equipment_quantity',
//         header: 'Quantity',
//         size: 150,
        
//       },

//       {
//         accessorKey: 'coach.name',
//         header: 'Coach Name',
//         size: 100,
//       },
//     ],
//     []
//   );
//   return (
// <div>
//   <ToastContainer />
//   {/* {loading ? (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <RotatingLines
//         visible={true}
//         height="96"
//         width="96"
//         color="grey"
//         strokeWidth="5"
//         animationDuration="0.75"
//         ariaLabel="rotating-lines-loading"
//       />
//     </div> */}
//     <div>
//       <div className="text-center mb-8 mt-8">
//         <h3 className="text-xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
//           All <span className="text-indigo-600">Equipment</span>
//         </h3>
//       </div>

//       {/* Dropdown Button */}
//       <div
//         className={`mb-4 flex ${
//           isTableVisible ? "justify-end" : "justify-center"
//         }`}
//       >
//         <button
//           onClick={() => setIsTableVisible(!isTableVisible)}
//           className="flex items-center gap-2 px-5 py-2 text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
//         >
//           {isTableVisible ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
//           <Icon>{isTableVisible ? "expand_less" : "expand_more"}</Icon>
//         </button>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, height: 0 }}
//         animate={{
//           opacity: isTableVisible ? 1 : 0,
//           height: isTableVisible ? "auto" : 0,
//         }}
//         exit={{ opacity: 0, height: 0 }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//         className="overflow-hidden"
//       >
//         {isTableVisible && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.5, ease: "easeInOut" }}
//           >
//             <MaterialReactTable
//               columns={columns}
//               data={data}
//               muiTableBodyCellProps={{
//                 style: { wordWrap: "break-word", maxWidth: "200px" },
//               }}
//               muiTableContainerProps={{
//                 style: { overflowX: "auto" },
//               }}
//               renderTopToolbarCustomActions={() => (
//                 <Link
//                   to={"/AddEquipment"}
//                   className="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 "
//                 >
//                   Add Equipment
//                 </Link>
//               )}
//             />
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   )
// </div>

//   )
// }
// export default EquipmentStock

import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Icon from "@mui/material/Icon";
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d

function EquipmentStock() {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
<<<<<<< HEAD
    const [toggle,setToggle] = useState(true);
=======
    const [toggle, setToggle] = useState(true);
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
    const player_id = localStorage.getItem('player_id');
    const coach_id = localStorage.getItem('coach_id');
    const [isTableVisible, setIsTableVisible] = useState(true);

<<<<<<< HEAD

    useEffect(()=>{
=======
    useEffect(() => {
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
        const fetchData = async () => {
            try {
                const response = await axios.get(`/assign_equipment/${coach_id}`);
                if (response.data && Array.isArray(response.data.equipment)) {
<<<<<<< HEAD
                    setData(response.data.equipment); // Directly set the array
                } else if (response.data && response.data.equipment) {
                    setData([response.data.equipment]); // Wrap single item in an array
=======
                    setData(response.data.equipment); 
                } else if (response.data && response.data.equipment) {
                    setData([response.data.equipment]); 
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
                } else {
                    console.warn("No equipment data available.");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
<<<<<<< HEAD
    },[coach_id])

  // Define table columns
  const columns = useMemo(
    () => [
    //   {
    //     accessorKey: 'id',
    //     header: 'Id',
    //     size: 150,
    //   },
      {
        accessorKey: 'equipment_name',
        header: 'Player Name',
        size: 150,
      },
      {
        accessorKey: 'equipment_quantity',
        header: 'Quantity',
        size: 150,
        
      },

      {
        accessorKey: 'coach.name',
        header: 'Coach Name',
        size: 100,
      },
    ],
    []
  );
  return (
<div>
  <ToastContainer />
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
    <div>
      <div className="text-center mb-8 mt-8">
        <h3 className="text-xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
          All <span className="text-indigo-600">Equipment</span>
        </h3>
      </div>

      {/* Dropdown Button */}
      <div
        className={`mb-4 flex ${
          isTableVisible ? "justify-end" : "justify-center"
        }`}
      >
        <button
          onClick={() => setIsTableVisible(!isTableVisible)}
          className="flex items-center gap-2 px-5 py-2 text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
        >
          {isTableVisible ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          <Icon>{isTableVisible ? "expand_less" : "expand_more"}</Icon>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isTableVisible ? 1 : 0,
          height: isTableVisible ? "auto" : 0,
        }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        {isTableVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <MaterialReactTable
              columns={columns}
              data={data}
              muiTableBodyCellProps={{
                style: { wordWrap: "break-word", maxWidth: "200px" },
              }}
              muiTableContainerProps={{
                style: { overflowX: "auto" },
              }}
              renderTopToolbarCustomActions={() => (
                <Link
                  to={"/AddEquipment"}
                  className="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900 italic"
                >
                  Add Equipment
                </Link>
              )}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  )}
</div>

  )
}
export default EquipmentStock
=======
    }, [coach_id]);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'equipment_name',
                header: 'Player Name',
                size: 150,
            },
            {
                accessorKey: 'equipment_quantity',
                header: 'Quantity',
                size: 150,
            },
            {
                accessorKey: 'coach.name',
                header: 'Coach Name',
                size: 100,
            },
        ],
        []
    );

    return (
        <div className="w-full min-h-screen flex flex-col">
            {/* Optional Loader */}
            {/* {loading ? (
                <div className="flex flex-col items-center justify-center h-full">
                    {/* Add your loader here */}
            
                <div className="flex flex-col flex-grow">
                    <div className="text-center mb-8 mt-8">
                        <h3 className="text-xl sm:text-3xl leading-normal font-extrabold tracking-tight text-gray-900">
                            All <span className="text-indigo-600">Equipment</span>
                        </h3>
                    </div>

                    {/* Dropdown Button */}
                    <div
                        className={`mb-4 flex ${
                            isTableVisible ? "justify-end" : "justify-center"
                        }`}
                    >
                       <div className="mb-4 flex justify-end w-full px-4">
  <button
    onClick={() => setIsTableVisible(!isTableVisible)}
    className="flex items-center gap-2 px-5 py-2 text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
  >
    {isTableVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
    {isTableVisible ? "Hide Table" : "Show Table"}
  </button>
</div>

                    </div>

                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                            opacity: isTableVisible ? 1 : 0,
                            height: isTableVisible ? "auto" : 0,
                        }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        {isTableVisible && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            >
                                {/* Ensure MaterialReactTable is inside a responsive container */}
                                <div className="overflow-x-auto w-full">
                                    <MaterialReactTable
                                        columns={columns}
                                        data={data}
                                        muiTableBodyCellProps={{
                                            style: { wordWrap: "break-word", maxWidth: "200px" },
                                        }}
                                        muiTableContainerProps={{
                                            style: {
                                                width: '100%',  // Ensure full width
                                                maxWidth: '100%', // Prevent overflow beyond container
                                                overflowX: 'auto', // Allow horizontal scrolling
                                            },
                                        }}
                                        renderTopToolbarCustomActions={() => (
                                            <Link
                                                to={"/AddEquipment"}
                                                className="focus:outline-none text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-900"
                                            >
                                                Add Equipment
                                            </Link>
                                        )}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )
        </div>
    );
}

export default EquipmentStock;
>>>>>>> 6ef1bc75752e89bb098cea7186676fa760692d1d
