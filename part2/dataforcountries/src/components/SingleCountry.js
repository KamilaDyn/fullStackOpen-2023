function SingleCountry({ singleCountry, weather }) {
  const language = singleCountry.languages;

  return (
    <>
      <div>
        <h2>{singleCountry.name.common}</h2>
        <p>Capital: {singleCountry.capital[0]}</p>
        <p>Area: {singleCountry.area}</p>
      </div>
      <div>
        <h3>Languages</h3>
        <ul>
          {Object.keys(language).map((key) => (
            <li key={language[key]}>{language[key]}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          src={singleCountry.flags.svg}
          alt={`${singleCountry.name}'s Flag`}
          height="120"
          width="240"
        />
      </div>
      {weather && (
        <div>
          <h3>Weather in {singleCountry.capital}</h3>
          <p>Temperature {(weather?.main?.temp - 273.15).toFixed(2)} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
            alt="ok"
          />
          <p>Wind {weather?.wind?.speed} m/s</p>
        </div>
      )}
    </>
  );
}

export default SingleCountry;
