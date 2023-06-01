function SingleCountry({ singleCountry }) {
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
        {Object.keys(language).map((key) => (
          <p key={language[key]}>{language[key]}</p>
        ))}
      </div>
      <div>
        <img
          src={singleCountry.flags.svg}
          alt={`${singleCountry.name}'s Flag`}
          height="120"
          width="240"
        />
      </div>
    </>
  );
}

export default SingleCountry;
