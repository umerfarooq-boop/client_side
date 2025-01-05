import React, { useState, useEffect } from 'react';
import DirectionMap from './DirectionMap';
import MyCalendar from './MyCalendar';
import { useParams } from 'react-router-dom';
import Nav from './Nav';
import { Bars } from 'react-loader-spinner';

function Schedule() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Initialize with `true` to show the loader initially

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="m-5">
        <DirectionMap id={id} />
      </div>
      <div>
        <MyCalendar />
      </div>
    </>
  );
}

export default Schedule;
