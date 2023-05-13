import React from "react";

function Card(prop) {
  return (
    <div className="card">
      <div className="top">
        <h2 class="name">{prop.name}</h2>
        <img class="circle-img" src={prop.source} alt="avatar_img" />
      </div>
      <div className="bottom">
        <p class="info">{prop.phone}</p>
        <p class="info">{prop.email}</p>
      </div>
    </div>
  );
}

export default Card;
