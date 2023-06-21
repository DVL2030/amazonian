import React from "react";

export default function LoadingBox(props) {
  return (
    <div
      id="loading-box"
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <i className="fa-solid fa-circle-notch fa-spin fa-2xl"></i>
      <span className="mt-4">Loading...</span>
    </div>
  );
}
