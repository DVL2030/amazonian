import React from "react";

export default function MessageBox(props) {
  return (
    <div className={`alert alert-${props.variants}`} role="alert">
      <div>
        <span>
          <i
            className={`fa ${
              props.variants === "danger"
                ? "fa-exclamation-triangle"
                : props.variants === "success" && "fa-check"
            } fa-2x`}
          ></i>
        </span>
      </div>
      <div>
        <big>
          <strong>
            {props.variants === "danger"
              ? "There was a problem..."
              : props.variants === "success" && "Success !"}
          </strong>
        </big>
        <span className={`${props.variants === "helpful" && "success"}`}>
          {props.children}
        </span>
      </div>
    </div>
  );
}
