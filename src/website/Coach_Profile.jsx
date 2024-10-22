import React, { useEffect, useState } from 'react'
import axios from '../axios'

function Coach_Profile() {

  const [coaches,setCoach] = useState([]);

  useEffect(()=>{
    const CoachData = () =>{
      try{
        axios.get('/coach_record').then((response)=>{
        if (response.data) {
          setCoach(response.data.coach)
        }   
        })
      }catch(error){
        console.log(error);
      }
    }
    CoachData();
  },[])  

  return (
    <>
        {/* <div className="h-full min-h-screen w-full bg-gray-800 pt-12 p-4"> */}
        <p className='text-center text-2xl font-medium mt-5 mb-10'>Coaches</p>
        <div className="grid gap-14 md:grid-cols-3 md:gap-5 pr-10 mt-5 mb-5">
          {
            coaches.map((coach,index)=>(
              <div className="rounded-xl bg-white p-6 text-center shadow-xl mt-5 mb-5" key={index}>
            <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40">
            <div className="coach-image-container">
    {/* Render the SVG icon */}
    <svg
  viewBox="0 0 33 46"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="h-6 w-6 text-white"
>
  {/* Render the image inside the SVG using the <image> tag */}
  <image 
    href={`http://127.0.0.1:8000/uploads/coach_image/${coach.image}`} 
    x="0" 
    y="0" 
    height="100%" 
    width="100%" 
    className="h-12 w-12 rounded-full"
    preserveAspectRatio="xMidYMid slice"
  />
</svg>


    {/* Render the image outside of the SVG */}
</div>

            </div>
            <h1 className="text-darken mb-3 text-xl font-medium lg:px-14">
              {coach.name}
            </h1>
            <div className="grid grid-cols-2 gap-4">
    <p className="text-gray-500">
        {coach.phone_number}
    </p>
    <p className="text-gray-500">
        {coach.coach_location}
    </p>
</div>

          </div>
            ))
          }
      </div>
    </>
  )
}

export default Coach_Profile