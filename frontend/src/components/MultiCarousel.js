import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";

export default function MultiCarousel(props) {
  const { itemToShow } = props;

  const responsive = {
    extraLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: itemToShow || 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: itemToShow || 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: itemToShow || 3,
    },

    smallMobile: {
      breakpoint: { max: 464, min: 0 },
      items: itemToShow || 1,
    },
  };
  const items = props.children;

  return (
    <Carousel responsive={responsive}>
      {items.map((item, idx) => (
        <Card
          key={idx}
          items={item.body ? item.body : [item]}
          price={item.price}
          rating={item.rating}
          carousel={true}
        ></Card>
      ))}
    </Carousel>
  );
}
