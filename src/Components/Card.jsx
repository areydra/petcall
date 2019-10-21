import React from 'react';

const Card = props => {
    return (
      <div
        className="card shadow bg-white rounded"
        style={{ width: "18rem", margin: "10px 10px" }}
      >
        <img
          src={props.image}
          className="card-img-top"
          alt="..."
          style={{ height: 200, width: "100%" }}
        />
        <div className="card-body">
          <p style={{ fontSize: 20, fontWeight: "bold", color: "#3C9D9B" }}>
            {props.name}
            <p style={{ fontSize: 10, color: "#dc3545" }}>{props.gender}</p>
          </p>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    );
}
 
export default Card;