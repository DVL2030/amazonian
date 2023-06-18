import React from "react";

export default function LoadingBox(props) {
  return (
    <div
      id="loading-box"
      class="d-flex flex-column justify-content-center align-items-center"
    >
      <i class="fa-solid fa-circle-notch fa-spin fa-2xl"></i>
      <span className="mt-4">Loading...</span>
    </div>
  );
}
