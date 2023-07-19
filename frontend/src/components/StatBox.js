import React from "react";
import { Donut, DonutValue } from "react-donut-component";

export default function StatBox(props) {
  const { icon, number, label, chart, increase } = props;

  return (
    <div className="stat-box">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <div>
            <i className={`${icon} fa-2xl`} alt="icon"></i>
          </div>
          <div className="my-3">
            <b style={{ color: "#154c79" }}>+{number}</b>
          </div>
          <div>
            <span className="text-success">{label}</span>
          </div>
        </div>
        <div>
          <Donut
            size={100}
            indicatorColor="#646496"
            strokeWidth={10}
            trackColor="#4A90E2"
            linecap="round"
          >
            <DonutValue>{increase}</DonutValue>
          </Donut>
        </div>
      </div>
    </div>
  );
}
