import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home.jsx";
import './index.css'
import Details from "./DisplayMovies/Movie_Details.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Details />} />
        </Routes>
    );
}

export default App;
