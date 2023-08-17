import React from 'react';
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div className="nav">
      <ul>
        <li className="nav-home">
          <Link to="/">Humpty Dumb Tees</Link>
        </li>
        <li className="nav-shirts">
          <Link to="/shirts">Shirts</Link>
        </li>
        <li className="nav-createshirts">
          <Link to="/shirts/create-shirt">New Shirt</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav