import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  const searchCountry = () => {
    const response = axios
      .get(`${baseUrl}/${name}`)
      .then((response) => setCountry(response.data))
      .catch((err) => setCountry(null));
    return response;
  };

  useEffect(() => {
    if (name) {
      searchCountry();
    }
  }, [name]);
  return country;
};
