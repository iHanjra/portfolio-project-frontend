import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "./components/common/Spinner/Spinner";
const Home = React.lazy(() => import("./components/Home/Home"));
const Navigation = React.lazy(() => import("./components/Nav/Nav"));
const AllShirts = React.lazy(() => import("./components/AllShirts/AllShirts"));
const Shirt = React.lazy(() => import("./components/Shirt/Shirt"));
const NewShirt = React.lazy(() => import("./components/NewShirt/NewShirt"));
const EditShirt = React.lazy(() => import("./components/EditShirt/EditShirt"));

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<Spinner />}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shirts" element={<AllShirts />} />
          <Route path="/shirts/create-shirt" element={<NewShirt />} />
          <Route path="/shirts/:id" element={<Shirt />} />
          <Route path="/shirts/:id/edit" element={<EditShirt />} />
          <Route path="/404" element={<h1>404 Not Found!</h1>} />
          <Route path="*" element={<h1>404 Not Found!</h1>} />
        </Routes>
      </Router>
      </React.Suspense>
    </div>
  );
}

export default App;
