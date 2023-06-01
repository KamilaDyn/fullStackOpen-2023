import SingleCountry from "./SingleCountry";
function Countries({ countries, showCountry }) {
  if (countries.length > 10) {
    return <p>To many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    const singleCountry = countries[0];
    return <SingleCountry singleCountry={singleCountry} />;
  }
  return countries.map((country) => (
    <div key={country.name.common}>
      <p>
        {country.name.common}{" "}
        <button type="button" onClick={showCountry} value={country.name.common}>
          Show
        </button>
      </p>
    </div>
  ));
}

export default Countries;
