const Notify = ({ errorMessage }) => {
  return (
    <div>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </div>
  );
};

export default Notify;
