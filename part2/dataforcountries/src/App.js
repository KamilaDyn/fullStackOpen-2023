import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import { getCounters, weatherCountry } from "./services/countries";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleCountryName = (event) => {
    setCountryFilter(event.target.value);
  };

  useEffect(() => {
    if (countryFilter) {
      getCounters()
        .then((response) => setCountries(response))
        .catch((err) => console.log(err));
    }
  }, [countryFilter]);
  const countryFiltering = countries?.filter((country) => {
    const filteredCountries = country.name.common
      .toLowerCase()
      .includes(countryFilter.toLowerCase());

    return filteredCountries;
  });

  useEffect(() => {
    if (countryFiltering.length === 1) {
      setCountry(countryFiltering[0].name.common);
    }
  }, [countryFiltering]);
  useEffect(() => {
    if (country) {
      weatherCountry(country)
        .then((response) => setWeather(response))
        .catch((err) => console.log(err));
    }
  }, [country, apiKey]);

  const showCountry = (event) => {
    event.preventDefault();
    setCountryFilter(event.target.value);
  };

  return (
    <div className="App">
      <Filter
        countryName={countryFilter}
        handleCountryName={handleCountryName}
      />
      <Countries
        countries={countryFiltering}
        showCountry={showCountry}
        weather={weather}
      />
    </div>
  );
}

export default App;
