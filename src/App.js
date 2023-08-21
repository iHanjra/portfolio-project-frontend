import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navigation from "./components/Nav/Nav";
import AllShirts from './components/AllShirts/AllShirts';
import Shirt from './components/Shirt/Shirt';
import NewShirt from './components/NewShirt/NewShirt';
import EditShirt from './components/EditShirt/EditShirt';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
