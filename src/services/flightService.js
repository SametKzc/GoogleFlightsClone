import axios from 'axios';

const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY; 
const BASE_URL = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights';

const searchAirport = async (query) => {
    const options = {
      method: 'GET',
      url: `${BASE_URL}/searchAirport`,
      params: { 
        query,
        locale: 'en-US' 
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      return response.data.data; // Havaalanı listesi
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const searchFlights = async (originSkyId, destinationSkyId, date, originEntityId, destinationEntityId) => {
    const options = {
      method: 'GET',
      url: `${BASE_URL}/searchFlights`,
      params: {
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date,
        cabinClass: 'economy',
        adults: 1,
        sortBy: 'best',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US'
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log("Raw API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return null;
    }
  };

export { searchAirport, searchFlights };