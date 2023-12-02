import { useState, useEffect } from 'react'
import './App.css'

function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => { 
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery); 
  }, []); // probely it wil call when it is monuted

  const search = async (q) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q })
    );

    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', q);
  };

  return { search, animals };
}

function App() {
  const { search, animals } = useAnimalSearch();

  return (
    <main>
      <input type='text'
        placeholder='search'
        onChange={(e) => search(e.target.value)}
      />

      <ul>
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal} />
        ))}
      </ul>

      {animals.length === 0 && 'No animals found' }
    </main>
  )
}

function Animal({ type, name, age }) {
  return (
    <li>
      <strong>{type}</strong> {name} - {age}
    </li>
  );
}

export default App
