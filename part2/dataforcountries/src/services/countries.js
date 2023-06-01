import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/all";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather`;
const apiKey = process.env.REACT_APP_API_KEY;

const getCounters = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const weatherCountry = async (country) => {
  const response = await axios.get(
    `${weatherUrl}?q=${country}&appid=${apiKey}`
  );
  return response.data;
};

export { getCounters, weatherCountry };
