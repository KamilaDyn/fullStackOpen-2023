import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import { getCounters } from "./services/countries";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

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
    return country.name.common
      .toLowerCase()
      .includes(countryFilter.toLowerCase());
  });
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
      <Countries countries={countryFiltering} showCountry={showCountry} />
    </div>
  );
}

export default App;
