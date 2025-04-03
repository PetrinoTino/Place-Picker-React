import { useEffect, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching]=useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {

   
    // menyra e 2 per te perdorur async/await ne nje use effect duke krijuar variabla const gjithmone
async function fetchPlaces(){
 setIsFetching(true);

const response = await  fetch('http://localhost:3000/places')
const resData = await response.json();
setAvailablePlaces(resData.places);


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
