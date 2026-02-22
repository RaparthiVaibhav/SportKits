import React from "react";

const CategoryCard = ({ title, icon }) => {
  return (
    <div className="feature">
      <span style={{ fontSize: "32px" }}>{icon}</span>
      <p>{title}</p>
    </div>
  );
};

export default CategoryCard;
