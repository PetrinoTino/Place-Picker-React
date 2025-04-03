import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching]=useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
const[error,setError]=useState();
  useEffect(() => {

   
    // menyra e 2 per te perdorur async/await ne nje use effect duke krijuar variabla const gjithmone
async function fetchPlaces(){
 setIsFetching(true);

 try{
const response = await  fetch('http://localhost:3000/places')
const resData = await response.json();

if(!response.ok){

  throw new Error('Filed to fetch places');
}

setAvailablePlaces(resData.places);

//ok 200,300 ,not ok 400,500
 }catch(error){
setError({message: error.message || 'Could not fetch places,please try again latter!'})

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

  if(error){
    return <Error title="An error occurred!" message={error.message} />
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
