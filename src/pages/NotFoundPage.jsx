import React from "react";
// import * as animationData from "../commons/assets/animations/error.json";
import notFound from "../commons/assets/img/not-found/notfound.png";

export default function NotFoundPage() {
  return (
    <div style={{ margin: "50px 0px" }}>
      <img className="notfoundImg" src={notFound} alt="" />
      <h1
        style={{
          fontFamily: "'Montserrat', sans-serif",
          textAlign: "center",
          fontSize: "1.5rem"
        }}
      >
        Ops! Page you find not found
      </h1>
    </div>
  );
}
