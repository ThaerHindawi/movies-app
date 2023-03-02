import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/UI/Navbar/Navbar";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoviePage from "./components/MoviePage";
import SearchMovies from "./components/UI/Navbar/SearchMovies";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
           path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          >
            <Route path="/home" element={<><Navbar /><Home /></>} />
          </Route>
          <Route path="MoviePage/:id" element={<><Navbar /><MoviePage /></>} />
          <Route path="page/:number" element={<><Navbar /><Home /></>} />
          <Route path="search" element={<><Navbar /><SearchMovies /></>} />
          <Route path="sort_by/:sort_by" element={<><Navbar /><Home /></>} />
          <Route path="sort_by/:sort_by/page/:page" element={<><Navbar /><Home /></>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
