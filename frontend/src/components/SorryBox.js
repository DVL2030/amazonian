import React from "react";

export default function SorryBox() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <span className="display-1 text-black-80">SORRY</span> <br></br>
      <span className=""> I could not find anything...</span>
      <img
        src="https://images-na.ssl-images-amazon.com/images/G/01/error/en_US/21._TTD_.jpg"
        alt="amazon-dog"
      ></img>
    </div>
  );
}
