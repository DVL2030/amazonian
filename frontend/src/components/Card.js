import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

export default function Card(props) {
  const cardFooters = ["See more, See all deals, Shop now"];
  const randFooter = cardFooters[Math.floor(Math.random() * 2)];

  const { header, items, price, rating, footer, footerLink, carousel } = props;
  console.log(price);

  return (
    <div className={`crd ${carousel ? "crd-carousel" : ""}`}>
      {header && (
        <div className="crd-head">
          <h5>{header}</h5>
        </div>
      )}

      <div className="crd-body">
        {items.length <= 1 ? (
          items.map((item, idx) => (
            <div>
              <Link
                key={idx}
                to={item.link}
                className={
                  price && price.currentPrice.length > 1 ? "bg-grey" : ""
                }
              >
                <img src={item.img ? item.img : ""} alt="gw-card-img" />
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
                    <Link to={item.link}>
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
        {price && price.currentPrice.length > 1 ? (
          rating ? (
            <Rating rating={parseInt(rating)} size="fa-sm" />
          ) : (
            <div>
              <div className="d-flex align-items-center gap-1">
                <span className="discount-box bg-danger text-white p-1">
                  {price.discount}% off
                </span>
                <strong className="text-danger">Deal</strong>
              </div>

              <div>
                <span className="a-price">
                  {price.currentPrice}
                  {"  "}
                </span>
                <span className="a-price-label">List Price</span>
                {price.beforePrice && (
                  <span className="a-discout-price">${price.beforePrice}</span>
                )}
              </div>
            </div>
          )
        ) : (
          footer && (
            <Link to={footerLink}>
              <small>{footer}</small>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
