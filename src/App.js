import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import FlightList from './components/FlightList';
import './App.css'; // Tailwind CSS dosyanızı ekleyin

function App() {
  const [flights, setFlights] = useState(null);

  const handleSearch = (data) => {
    console.log("Setting flights data:", data);
    setFlights(data);
  };

  return (
    <div className="App bg-cover bg-center h-screen">
      <div className="bg-black bg-opacity-50 h-full flex flex-col items-center justify-center">
        <h1 className="text-white text-4xl font-bold mb-4">Flights</h1>
        <div className="container mx-auto py-8">
          <SearchForm onSearch={handleSearch} />
          {flights && <FlightList flights={flights} />}
      </div>
      </div>
    </div>
  );
}

export default App;