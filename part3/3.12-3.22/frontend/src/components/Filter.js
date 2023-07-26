function Filter({ filteredName, handleChange }) {
  return (
    <div>
      filter shown with: <input value={filteredName} onChange={handleChange} />
    </div>
  );
}

export default Filter;
