import React, { useState } from 'react';
import { createShirt } from '../Api/API';
import { useNavigate } from 'react-router-dom';
import "./NewShirt.css";
import { Button } from 'react-bootstrap';

function NewShirt() {
  const [shirt, setShirt] = useState({
    name: "",
    color: "",
    size: "",
    price: "",
    store: "",
    is_favorite: false,
    image: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

  async function handleOnSubmit(event) {
    event.preventDefault();
    try {
      let response = await createShirt({ ...shirt, is_favorite: isChecked });
      if (response.status === 200) {
        console.log(shirt)
        alert("Shirt Created");
        setShirt({
          name: "",
          color: "",
          size: "",
          price: "",
          store: "",
          is_favorite: false,
          image: "",
        });
        navigate(`/shirts/${response.data.data.id}`);
      }
    } catch (error) {
      return error;
    }
  }
  
  return (
    <div className="create-form-container">
      <h2>Add a new shirt</h2>
      <form className="create-container-form" onSubmit={handleOnSubmit}>
        <div className="create-container-input">
          <label htmlFor="name">
            <strong>Name</strong>
          </label>
          <br />
          <input
            placeholder="Name"
            type="text"
            id="name"
            value={shirt?.name}
            onChange={(e) => setShirt({ ...shirt, name: e.target.value })}
            required
          />
        </div>

        <div className="create-container-input">
          <label htmlFor="color">
            <strong>Color</strong>
          </label>
          <br />
          <input
            placeholder="Color"
            type="text"
            id="color"
            value={shirt?.color}
            onChange={(e) => setShirt({ ...shirt, color: e.target.value })}
            required
          />
        </div>

        <div className="create-container-input">
          <label htmlFor="size">
            <strong>Size</strong>
          </label>
          <br />
          <select
            id="size"
            value={shirt.size}
            onChange={(e) => setShirt({ ...shirt, size: e.target.value })}
            required
          >
            <option value="">Select Size</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="create-container-input">
          <label htmlFor="price">
            <strong>Price</strong>
          </label>
          <br />
          <input
            placeholder="Price"
            type="number"
            id="price"
            value={shirt?.price}
            onChange={(e) => setShirt({ ...shirt, price: e.target.value })}
            required
          />
        </div>

        <div className="create-container-input">
          <label htmlFor="store">
            <strong>Store</strong>
          </label>
          <br />
          <input
            placeholder="Store"
            type="text"
            id="store"
            value={shirt?.store}
            onChange={(e) => setShirt({ ...shirt, store: e.target.value })}
            required
          />
        </div>

        <div className="create-container-input">
          <label htmlFor="is_favorite">
            <strong>Favorite</strong>
          </label>
          <br />
          <input
            type="checkbox"
            id="is_favorite"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        </div>

        <div className="create-container-input">
          <label htmlFor="image">
            <strong>Image</strong>
          </label>
          <br />
          <input
            placeholder="Image"
            type="text"
            id="image"
            value={shirt?.image}
            onChange={(e) => setShirt({ ...shirt, image: e.target.value })}
          />
        </div>

        <Button
          style={{ margin: "10px" }}
          type="submit"
          className="create-button"
        >
          <strong>ADD NEW SHIRT</strong>
        </Button>
      </form>
    </div>
  );
}

export default NewShirt;