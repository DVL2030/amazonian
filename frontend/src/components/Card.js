import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Card(props) {
  const cardFooters = ["See more, See all deals, Shop now"];
  const randFooter = cardFooters[Math.floor(Math.random() * 2)];

  const { header, items, pricing, rating } = props;

  return (
    <div className="crd crd-carousel">
      {header && (
        <div className="crd-head">
          <h5>{header}</h5>
        </div>
      )}

      <div className="crd-body">
        {items.length <= 1 ? (
          items.map((item, idx) => (
            <div>
              <Link key={idx} to={item.link}>
                <img
                  className="img"
                  src={item.img ? item.img : ""}
                  alt="gw-card-img"
                />
              </Link>
              {item.title && <Link to={item.link}>{item.title}</Link>}
            </div>
          ))
        ) : (
          <div className="card-grid">
            {items.map(
              (item, idx) =>
                idx <= 3 && (
                  <div key={idx} className="card-grid-item">
                    <Link to={item.link ? item.link : ""}>
                      <img src={item.img ? item.img : ""} alt="gw-grid-img" />
                      <span>
                        <small>{item.label}</small>
                      </span>
                    </Link>
                  </div>
                )
            )}
          </div>
        )}
      </div>
      <div className="crd-footer">
        {pricing ? (
          rating ? (
            <Rating rating={parseInt(rating)} size="fa-sm" />
          ) : (
            <div>
              <span className="a-price">${pricing.currentPrice}</span>
              <span className="a-price-label">List Price</span>
              <span className="a-discout-price">${pricing.beforePrice}</span>
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
