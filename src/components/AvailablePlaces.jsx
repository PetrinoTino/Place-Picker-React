import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import fetchAvaiablePlaces from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  // Convert getCurrentPosition to use async/await with a Promise
  async function getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvaiablePlaces();
        const position = await getCurrentPosition();

        const sortedPlaces = sortPlacesByDistance(
          places,
          position.coords.latitude,
          position.coords.longitude
        );

        setAvailablePlaces(sortedPlaces);
        setIsFetching(false);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later!",
        });
      } finally {
        setIsFetching(false); // Ensures state reset regardless of success or failure
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    console.error(error); // Logs error for debugging
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
