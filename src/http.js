async function fetchAvaiablePlaces() {
    const response = await  fetch('http://localhost:3000/places')
const resData = await response.json();

if(!response.ok){

  throw new Error('Filed to fetch places');
}

return resData.places;
}
export default fetchAvaiablePlaces;