import React, { useState } from 'react';
import { createShirt } from '../Api/API';
import { useNavigate } from 'react-router-dom';
import "./NewShirt.css";

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

  async function handleOnSubmit(event) {
    event.preventDefault();
    try {
      let response = await createShirt({ ...shirt, is_favorite: isChecked });
      if (response.status === 200) {
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
    <div className="create-shirt">
      <h2>Add new shirt</h2>
      <form className="create-shirt-form" onSubmit={handleOnSubmit}>
        <div className="create-name">
          <label htmlFor="name">Name</label>
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

        <div className="create-color">
          <label htmlFor="color">Color</label>
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

        <div className="create-size">
          <label htmlFor="size">Size</label>
          <br />
          <input
            placeholder="Size"
            type="text"
            id="size"
            value={shirt?.size}
            onChange={(e) => setShirt({ ...shirt, size: e.target.value })}
            required
          />
        </div>

        <div className="create-price">
          <label htmlFor="price">Price</label>
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

        <div className="create-store">
          <label htmlFor="store">Store</label>
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

        <div className="create-is_favorite">
          <label htmlFor="is_favorite">Favorite</label>
          <br />
          <input
            type="checkbox"
            id="is_favorite"
            checked={isChecked}
            onChange={(e) =>
              setIsChecked(e.target.checked)}
          />
        </div>

        <div className="create-image">
          <label htmlFor="image">Image</label>
          <br />
          <input
            placeholder="image"
            type="text"
            id="image"
            value={shirt?.image}
            onChange={(e) => setShirt({ ...shirt, image: e.target.value })}
          />
        </div>

        <button className="create-button">CREATE NEW SHIRT</button>
      </form>
    </div>
  );
}

export default NewShirt;