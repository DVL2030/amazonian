import React from "react";
import { Donut, DonutValue } from "react-donut-component";

export default function StatBox(props) {
  const { icon, number, label, percentage, showDonut = true } = props;

  return (
    <div className="stat-box">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          {icon && (
            <div>
              <i className={`${icon} fa-2xl`} alt="icon"></i>
            </div>
          )}
          {number && (
            <div className="my-3">
              <b style={{ color: "#154c79" }}>{number}</b>
            </div>
          )}

          {label && (
            <div>
              <span className="text-success">{label}</span>
            </div>
          )}
        </div>
        <div className={showDonut ? "d-block" : "d-none"}>
          <Donut
            size={100}
            indicatorColor="#3c3f73"
            strokeWidth={10}
            trackColor="#dfdff1"
            linecap="round"
          >
            <DonutValue>{percentage}</DonutValue>
          </Donut>
        </div>
      </div>
    </div>
  );
}
