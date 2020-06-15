import React from "react";
// import * as animationData from "../commons/assets/animations/error.json";
import notFound from "../commons/assets/img/not-found/notfound.png";

export default function NotFoundPage() {
  return (
    <div style={{ margin: "50px 0px" }}>
      <img className="notfoundImg" src={notFound} alt="" />
      <h1
        style={{
          textAlign: "center",
          fontSize: "1.5rem"
        }}
      >
        Ops! Trang này không tồn tại
      </h1>
    </div>
  );
}
