const Notify = ({ notify }) => {
  if (!notify) {
    return null;
  }
  return (
    <div>
      <p style={{ color: notify.type === "error" ? "red" : "green" }}>
        {notify.message}
      </p>
    </div>
  );
};

export default Notify;
