import React from "react";

export default function ReadMore(props) {
  const hideLen = 500;
  const { text } = props;

  const handleText = (e) => {
    e.preventDefault();
    const target = e.currentTarget.parentNode.children;
    let dots = target[1];
    let moreText = target[2];
    let handler = target[3];

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      handler.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      handler.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  };
  return (
    <>
      {text && text.length < hideLen + 20 ? (
        <span>{text}</span>
      ) : (
        <>
          {text && (
            <>
              <span>{text.substring(0, hideLen)}</span>
              <span className="dots">...</span>
              <span className="more">{text}</span>
              <br></br>
              <span
                className="read-more-less text-primary mt-2 "
                onClick={(e) => handleText(e)}
              >
                Read more
              </span>
            </>
          )}
        </>
      )}
    </>
  );
}
