import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllShirts } from "../Api/API";
import "./AllShirts.css";
import { Card, Button } from "react-bootstrap";

function AllShirts() {
  const [shirts, setShirts] = useState([]);
  const navigate = useNavigate();
  const [sortCriteria, setSortCriteria] = useState("date");
  const [colorFilter, setColorFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];
  const [sortOrder, setSortOrder] = useState("des");
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
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
    fetchShirtsData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
    } 
    return sortOrder === "asc" ? compareResult : -compareResult;
  });

  let total = filteredShirts.reduce(
    (accumulator, shirt) => accumulator + Number(shirt.price),
    0
  );

  const formatPriceWithCommas = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="container">
      <div className="sidebar">
        <label htmlFor="sort">
          <strong>Sort by:</strong>{" "}
        </label>
        <select value={sortCriteria} onChange={handleSortChange} id="sort">
          <option value="date">Date Added</option>
          <option value="alphabetical">Alphabetically</option>
          <option value="color">Color</option>
          <option value="size">Size</option>
          <option value="low-price">Price: low to high</option>
        </select>
        <Button
          className="sort-button"
          size="sm"
          onClick={handleSortOrderChange}
        >
          Sort {sortOrder === "asc" ? "Ascending" : "Descending"}
        </Button>

        <div className="filter-sizes">
          <label htmlFor="filter-sizes">
            <strong>Filter by size:</strong>
          </label>
          <select
            value={sizeFilter}
            onChange={handleSizeFilterChange}
            id="filter-sizes"
          >
            <option value="all">All Sizes</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-colors">
          <label htmlFor="filter-colors">
            <strong>Filter by color:</strong>
          </label>
          <select
            value={colorFilter}
            onChange={handleColorFilterChange}
            id="filter-colors"
          >
            <option value="all">All Colors</option>
            {uniqueColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <h4 className="total">Total Price of Shirts: ${formatPriceWithCommas(total.toFixed(2))}</h4>
        </div>
      </div>

      <div className="content">
        {sortedShirts.map((shirt) => {
          return (
            <Card
              style={{ width: "18rem" }}
              key={shirt.id}
              className="card bg-dark text-white"
            >
              <Card.Img
                variant="top"
                style={{ height: "20rem" }}
                src={shirt.image}
                alt="shirt"
                onClick={() => navigate(`/shirts/${shirt.id}`)}
              />
              <Card.Body>
                <Card.Link
                  className="shirt-link"
                  style={{ color: "white" }}
                  onClick={() => navigate(`/shirts/${shirt.id}`)}
                >
                  {shirt.name}
                  {shirt.is_favorite && <> 🥚</>}
                </Card.Link>
                <Card.Text>Size: {shirt.size}</Card.Text>
                <Card.Text>${formatPriceWithCommas(shirt.price)}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
        {showScrollButton && (
          <button className="scroll-top-button" onClick={scrollToTop}>
            &#8593;
          </button>
        )}
      </div>
    </div>
  );
}

export default AllShirts;
