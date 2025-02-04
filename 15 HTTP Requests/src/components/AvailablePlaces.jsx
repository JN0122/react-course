import Places from './Places.jsx';
import {useEffect, useState} from "react";
import ErrorPlaces from "./Error.jsx";
import {sortPlacesByDistance} from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPlaces(){
      setIsFetching(true);
      try{
        const response = await fetch("http://localhost:3000/places");
        const data = await response.json();

        if(!response.ok) throw new Error("Error fetching places.");

        let places = [...data.places]

        navigator.geolocation.getCurrentPosition(position => {
          const sortedPlaces = sortPlacesByDistance(
              places,
              position.coords.latitude,
              position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
        })
        setAvailablePlaces(places);
      }catch (error){
        setError({message: error.message || "Something went wrong"});
      }
      setIsFetching(false);
    }
    getPlaces();
  }, []);

  if(error){
    return <ErrorPlaces title="An error occurred" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
