import React from "react";
import loading from "../../image/loading.gif";

const Loading = ({ className }) => {
  return (
    <div className={className}>
      <img src={loading} className="img" />{" "}
    </div>
  );
};

export default Loading;
