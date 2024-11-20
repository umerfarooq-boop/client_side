import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import axios from "../axios";

mapboxgl.accessToken =
  "pk.eyJ1IjoidW1lcndhbGkiLCJhIjoiY20ycGM0aWRrMGxmYjJtc2N2eWRvZHNpNiJ9._eLwWDk871QbnYrq8lcOkw";

function DirectionMap({ id }) {
  const [userLocation, setUserLocation] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [startLocationName, setStartLocationName] = useState("");
  const [destinationName, setDestinationName] = useState("");

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/showBlogPost/${id}`);
        const postData = response.data?.post;

        if (Array.isArray(postData) && postData.length > 0) {
          const coachLocation = postData[0]?.coach?.coach_location;

          if (coachLocation) {
            const geocodeResponse = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                coachLocation
              )}.json?access_token=${mapboxgl.accessToken}`
            );

            const [longitude, latitude] =
              geocodeResponse.data.features[0]?.geometry.coordinates;
            setDestinationCoords([longitude, latitude]);
            setDestinationName(coachLocation);
          }
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const coords = [position.coords.longitude, position.coords.latitude];
            setUserLocation(coords);

            const reverseGeocodeResponse = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${mapboxgl.accessToken}`
            );

            const locationName = reverseGeocodeResponse.data.features[0]?.place_name;
            setStartLocationName(locationName || "Your location");
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchPostData();
    fetchUserLocation();
  }, [id]);

  useEffect(() => {
    if (userLocation && destinationCoords) {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: userLocation,
        zoom: 13,
      });

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric", // Use metric units
        profile: "mapbox/driving", // Default to driving; can be changed
        alternatives: true, // Show alternative routes
        congestion: true, // Show congestion info
      });

      map.addControl(directions, "top-left");

      // Set the origin and destination
      directions.setOrigin(userLocation);
      directions.setDestination(destinationCoords);

      return () => map.remove(); // Clean up map on component unmount
    }
  }, [userLocation, destinationCoords]);

  return (
    <div className="w-full h-screen">
      <div className="flex justify-center mb-4 space-x-4">
        <input
          type="text"
          value={startLocationName}
          readOnly
          placeholder="Your location"
          className="border p-2 w-1/3"
        />
        <input
          type="text"
          value={destinationName}
          readOnly
          placeholder="Destination"
          className="border p-2 w-1/3"
        />
      </div>
      {userLocation && destinationCoords && (
        <div id="map" className="w-full h-full"></div>
      )}
    </div>
  );
}

export default DirectionMap;
