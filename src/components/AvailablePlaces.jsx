import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import fetchAvaiablePlaces from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    // menyra e 2 per te perdorur async/await ne nje use effect duke krijuar variabla const gjithmone
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvaiablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvailablePlaces(sortedPlaces);

          setIsFetching(false);
        });

        //ok 200,300 ,not ok 400,500
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places,please try again latter!",
        });
      }
      setIsFetching(false);
    }

    fetchPlaces();

    // Menyra e pare per te perdorur fetch
    // fetch('http://localhost:3000/places')
    //   .then((response) => response.json())
    //   .then((resData) => {
    //     setAvailablePlaces(resData.places);
    //   });
  }, []);

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
