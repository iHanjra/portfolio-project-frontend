import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllShirts } from "../Api/API";
import "./AllShirts.css";

function AllShirts() {
    const [shirts, setShirts] = useState([]);
    const navigate = useNavigate();

    async function fetchShirtsData() {
      try {
        let result = await getAllShirts();
        const sortedShirts = result.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setShirts(sortedShirts);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      fetchShirtsData();
    }, []);

  return (
    <div className="all-shirts">
      <ul>
        {shirts.map((shirt) => {
          return (
            <li key={shirt.id}>
              <img
                src={shirt.image}
                alt="shirt"
                // style={ "box-shadow" }
                onClick={() => navigate(`/shirts/${shirt.id}`)}
              />
              <br />
              <h2 onClick={() => navigate(`/shirts/${shirt.id}`)}>{shirt.name}</h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AllShirts;