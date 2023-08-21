import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllShirts } from "../Api/API";
import "./AllShirts.css";

function AllShirts() {
  const [shirts, setShirts] = useState([]);
  const navigate = useNavigate();
  const [sortCriteria, setSortCriteria] = useState("date");
  const [colorFilter, setColorFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];
  const [sortOrder, setSortOrder] = useState("asc");

  async function fetchShirtsData() {
    try {
      let result = await getAllShirts();
      const sortedShirts = result.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setShirts(sortedShirts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchShirtsData();
  }, []);

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const uniqueColors = [...new Set(shirts.map((shirt) => shirt.color))];

  const handleColorFilterChange = (e) => {
    setColorFilter(e.target.value);
  };

  const handleSizeFilterChange = (e) => {
    setSizeFilter(e.target.value);
  };

  const filteredShirts = shirts.filter((shirt) => {
    if (colorFilter === "all" && sizeFilter === "all") {
      return true;
    }

    if (colorFilter !== "all" && shirt.color !== colorFilter) {
      return false;
    }

    if (sizeFilter !== "all" && shirt.size !== sizeFilter) {
      return false;
    }

    return true;
  });

  const sortedShirts = filteredShirts.sort((a, b) => {
    let compareResult = 0;
    if (sortCriteria === "date") {
      compareResult = new Date(a.created_at) - new Date(b.created_at);
    } else if (sortCriteria === "alphabetical") {
      compareResult = a.name.localeCompare(b.name);
    } else if (sortCriteria === "color") {
      compareResult = a.color.localeCompare(b.color);
    } else if (sortCriteria === "size") {
      compareResult = a.size.localeCompare(b.size);
    } else if (sortCriteria === "low-price") {
      compareResult = parseFloat(a.price) - parseFloat(b.price);
    } else if (sortCriteria === "high-price") {
      compareResult = parseFloat(b.price) - parseFloat(a.price);
    }
    return sortOrder === "asc" ? compareResult : -compareResult;
  });

  let total = filteredShirts.reduce(
    (accumulator, shirt) => accumulator + Number(shirt.price),
    0
  );

  return (
    <div className="all-shirts">
      <label htmlFor="sort">Sort by: </label>
      <select value={sortCriteria} onChange={handleSortChange} id="sort">
        <option value="date">Date Added</option>
        <option value="alphabetical">Alphabetically</option>
        <option value="color">Color</option>
        <option value="size">Size</option>
        <option value="low-price">Price: low to high</option>
        <option value="high-price">Price: high to low</option>
      </select>
      <button onClick={handleSortOrderChange}>
       Sorting Order: {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>
      <div>
        <label htmlFor="filter-sizes">Filter by size: </label>
        <select
          value={sizeFilter}
          onChange={handleSizeFilterChange}
          id="sort-sizes"
        >
          <option value="all">All Sizes</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-colors">Filter by color: </label>
        <select
          value={colorFilter}
          onChange={handleColorFilterChange}
          id="sort-colors"
        >
          <option value="all">All Colors</option>
          {uniqueColors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <h2>Total Shirt Price: ${total.toFixed(2)}</h2>
      <ul>
        {sortedShirts.map((shirt) => {
          return (
            <li key={shirt.id}>
              <img
                src={shirt.image}
                alt="shirt"
                onClick={() => navigate(`/shirts/${shirt.id}`)}
              />
              <br />
              <h2 onClick={() => navigate(`/shirts/${shirt.id}`)}>
                {shirt.name}
              </h2>
              <h3>Size: {shirt.size}</h3>
              <h3>${shirt.price}</h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AllShirts;
