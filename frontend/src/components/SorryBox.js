import React from "react";

export default function SorryBox(props) {
  const { header, message } = props;
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <span className="display-1 text-black-80">
        {header ? header : "SORRY"}
      </span>
      <br></br>
      <span className="">
        {message ? message : "I could not find anything..."}
      </span>
      <img
        src="https://images-na.ssl-images-amazon.com/images/G/01/error/en_US/21._TTD_.jpg"
        alt="amazon-dog"
      ></img>
    </div>
  );
}
