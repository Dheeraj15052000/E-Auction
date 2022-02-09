import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "70px",
        minHeight: "70px",
        margin: "auto",
        display: "block",
        marginTop:'20vh'
      }}
    >
        <span className='sr-only'>loading...</span>
    </Spinner>
  );
};

export default Loader;
