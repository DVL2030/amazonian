import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

export default function Card(props) {
  const cardFooters = ["See more, See all deals, Shop now"];

  const { header, items, price, rating, footer, footerLink, carousel } = props;

  return (
    <div className={`crd ${carousel ? "crd-carousel" : ""}`}>
      {header && (
        <div className="crd-head">
          <h5>
            {header.length < 30 ? header : `${header.substring(0, 30)}...`}
          </h5>
        </div>
      )}

      <div className="crd-body">
        {items.length <= 1 ? (
          items.map((item, idx) => (
            <div key={idx}>
              <Link
                to={item.link ? item.link : `/products/${item.label}`}
                className={
                  price && price.currentPrice.length > 1 ? "bg-grey" : ""
                }
              >
                <img
                  src={item.img ? item.img : "/imgs/no-image.png"}
                  alt="gw-card-img"
                />
              </Link>
              {item.title && <Link to={item.link}>{item.title}</Link>}
            </div>
          ))
        ) : items.length < 5 ? (
          <div className="card-grid">
            {items.map(
              (item, idx) =>
                idx <= 3 && (
                  <div key={idx} className="card-grid-item">
                    <Link
                      to={item.link ? item.link : `/products/${item.label}`}
                    >
                      <img src={item.img ? item.img : ""} alt="gw-grid-img" />
                      <span>
                        {item.label.length > 15 ? (
                          <small>{item.label.substring(0, 15)}...</small>
                        ) : (
                          <small>{item.label}</small>
                        )}
                      </span>
                    </Link>
                  </div>
                )
            )}
          </div>
        ) : (
          <div>
            <Carousel
              className="main-card-carousel"
              slide
              variant="dark"
              indicators={false}
            >
              {items.map((item, idx) => (
                <Carousel.Item key={idx}>
                  <Link>
                    <img src={item.img} alt={`slide ${idx}`} />
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
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
