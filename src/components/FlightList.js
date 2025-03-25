import React from 'react';

const FlightList = ({ flights }) => {
  if (!flights || !flights.data || !flights.data.itineraries) {
    console.error("Invalid flights data:", flights);
    return <p>No flights available.</p>;
  }

  const itineraries = flights.data.itineraries;

  return (
    <div className="space-y-4">
      {itineraries.length === 0 ? (
        <p>No flights available.</p>
      ) : (
        itineraries.map((itinerary, index) => {
          const leg = itinerary.legs[0];
          const segment = leg.segments[0];
          const marketingCarrier = segment?.marketingCarrier;
          
          return (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-2">
                {marketingCarrier?.alternateId && (
                  <img 
                    src={leg.carriers?.marketing[0]?.logoUrl} 
                    alt={marketingCarrier.name}
                    className="w-8 h-8"
                  />
                )}
                <h3 className="text-xl font-bold">{marketingCarrier?.name || "Unknown Airline"}</h3>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Departure</p>
                  <p className="font-medium">{leg.origin.city}</p>
                  <p className="text-sm">{leg.origin.name}</p>
                  <p className="text-sm font-medium">
                    {new Date(leg.departure).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Arrival</p>
                  <p className="font-medium">{leg.destination.city}</p>
                  <p className="text-sm">{leg.destination.name}</p>
                  <p className="text-sm font-medium">
                    {new Date(leg.arrival).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    Flight {segment.flightNumber} • Duration: {Math.floor(leg.durationInMinutes / 60)}h {leg.durationInMinutes % 60}m
                  </p>
                  {leg.stopCount > 0 && (
                    <p className="text-sm text-gray-500">
                      Stops: {leg.stopCount}
                    </p>
                  )}
                </div>
                <p className="text-xl font-bold text-green-600">
                  {itinerary.price.formatted}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default FlightList;