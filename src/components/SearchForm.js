import React, { useState } from 'react';
import { searchAirport, searchFlights } from '../services/flightService';

const SearchForm = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [airports, setAirports] = useState([]);

  const handleSearchAirports = async (query) => {
    const results = await searchAirport(query);
    setAirports(results);
  };

  const getSkyIdAndEntityId = async (airportName) => {
    const results = await searchAirport(airportName);
    if (results && results.length > 0) {
      return {
        skyId: results[0].skyId, 
        entityId: results[0].entityId 
      };
    }
    return null; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const originData = await getSkyIdAndEntityId(origin);
    const destinationData = await getSkyIdAndEntityId(destination);
  
    if (!originData || !destinationData) {
      alert("Please enter valid airport names.");
      return;
    }
  
    try {
      const response = await searchFlights(
        originData.skyId,
        destinationData.skyId,
        date,
        originData.entityId,
        destinationData.entityId
      );
  
      console.log("API Response:", response);
  
      if (!response) {
        throw new Error("No flight data received");
      }
  
      onSearch(response);
    } catch (error) {
      console.error("Error fetching flights:", error);
      alert("Failed to fetch flights. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 p-4 bg-gray-100 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Origin Airport"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        onBlur={() => handleSearchAirports(origin)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Destination Airport"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        onBlur={() => handleSearchAirports(destination)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search Flights
      </button>
    </form>
  );
};

export default SearchForm;