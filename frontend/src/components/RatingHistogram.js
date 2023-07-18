import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function RatingHistogram(props) {
  const { asin, distribution } = props;
  return (
    <div>
      <div className="rating-progress-bar">
        <Link to={`/product-reviews/${asin}/rating/5/?scrollTo=result`}>
          <span>5 star</span>
          <div className="rating-bar">
            <div
              className={distribution[5] === 0 ? "zero" : ""}
              style={{ width: `${distribution[5]}` }}
            ></div>
          </div>
          <span>{distribution[5]}</span>
        </Link>
      </div>
      <div className="rating-progress-bar">
        <Link to={`/product-reviews/${asin}/rating/4/?scrollTo=result`}>
          <span>4 star</span>
          <div className="rating-bar">
            <div
              className={distribution[4] === 0 ? "zero" : ""}
              style={{ width: `${distribution[4]}` }}
            ></div>
          </div>
          <span>{distribution[4]}</span>
        </Link>
      </div>
      <div className="rating-progress-bar">
        <Link to={`/product-reviews/${asin}/rating/3/?scrollTo=result`}>
          <span>3 star</span>
          <div className="rating-bar">
            <div
              className={distribution[3] === 0 ? "zero" : ""}
              style={{ width: `${distribution[3]}` }}
            ></div>
          </div>
          <span>{distribution[3]}</span>
        </Link>
      </div>
      <div className="rating-progress-bar">
        <Link to={`/product-reviews/${asin}/rating/2/?scrollTo=result`}>
          <span>2 star</span>
          <div className="rating-bar">
            <div
              className={distribution[2] === 0 ? "zero" : ""}
              style={{ width: `${distribution[2]}` }}
            ></div>
          </div>
          <span>{distribution[2]}</span>
        </Link>
      </div>
      <div className="rating-progress-bar">
        <Link to={`/product-reviews/${asin}/rating/1?scrollTo=result`}>
          <span>1 star</span>
          <div className="rating-bar">
            <div
              className={distribution[1] === 0 ? "zero" : ""}
              style={{ width: `${distribution[1] ? distribution[1] : "0"}` }}
            ></div>
          </div>
          <span>{distribution[1]}</span>
        </Link>
      </div>
    </div>
  );
}
