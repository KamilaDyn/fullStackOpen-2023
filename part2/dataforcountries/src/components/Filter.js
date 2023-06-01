function Filter({ countryName, handleCountryName }) {
  return (
    <div>
      find countries <input value={countryName} onChange={handleCountryName} />
    </div>
  );
}

export default Filter;
