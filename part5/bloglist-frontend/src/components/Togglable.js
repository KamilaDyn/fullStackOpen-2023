import { useState } from "react";

const Taggable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible((prevValue) => !prevValue);
  };
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  );
};

export default Taggable;
