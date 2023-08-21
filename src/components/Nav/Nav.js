import React from 'react';
import { Link } from "react-router-dom";
import "./Nav.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      collapseOnSelect
      fixed="top"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="/shirts">
          <img
            alt="logo"
            src={process.env.PUBLIC_URL + "/favicon.ico"}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Humpty Dumb Tees
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shirts">All Shirts</Nav.Link>
            <Nav.Link href="/shirts/create-shirt">New Shirt</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;

// import React from 'react';
// import { Link } from "react-router-dom";
// import "./Nav.css";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";

// function Navigation() {
//   return (
//     <Navbar
//       expand="lg"
//       className="bg-body-tertiary"
//       collapseOnSelect
//       fixed="top" 
//       data-bs-theme="dark"
//     >
//       <Container>
//         <Navbar.Brand href="/shirts">
//           <img
//             alt="logo"
//             src={process.env.PUBLIC_URL + "/favicon.ico"}
//             width="30"
//             height="30"
//             className="d-inline-block align-top"
//           />{" "}
//           Humpty Dumb Tees
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href="/shirts">All Shirts</Nav.Link>
//             <Nav.Link href="/shirts/create-shirt">New Shirt</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Navigation