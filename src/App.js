import './App.css';
import { useState,useEffect } from 'react';
// import data from './data.json';
import { getPeople } from './api/people';

function App() {
  const [people , setPeople] = useState([]);

  useEffect(() => {
    getPeople().then((data) => setPeople(data.results))
  }, []);
  return (
   <ul>
      {people.map((character) => (
        <li key={character.name}>{character.name}</li>
      ))}
   </ul>
  );
}

export default App;
