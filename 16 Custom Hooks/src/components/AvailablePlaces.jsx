import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import {useFetch} from "../hooks/useFetch.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    data: availablePlaces,
    setData: setAvailablePlaces,
    error,
    isFetching
  } = useFetch(fetchAvailablePlaces, []);

  useEffect(() => {
    if(availablePlaces.length === 0) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
          availablePlaces,
          position.coords.latitude,
          position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, [availablePlaces]);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
