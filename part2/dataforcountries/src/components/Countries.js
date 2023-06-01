import SingleCountry from "./SingleCountry";
function Countries({ countries }) {
  if (countries.length > 10) {
    return <p>To many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    const singleCountry = countries[0];
    return <SingleCountry singleCountry={singleCountry} />;
  }
  return countries.map((country) => <p>{country.name.common}</p>);
}

export default Countries;
