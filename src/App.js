import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import jwtDecode from "jwt-decode";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MyOffers from "./pages/MyOffers";
import ViewOffer from "./pages/ViewOffer";
import Favourites from "./pages/Favourites";
import CreateOffer from "./pages/CreateOffer";
import UpdateOffer from "./pages/UpdateOffer";
import "./App.css";
import React from "react";

function App() {
  let isExpired = false;
  let decodedToken;
  let token;
  if (localStorage.getItem("token") !== null) {
    token = localStorage.getItem("token");
    decodedToken = jwtDecode(token, { complete: true });
    let dateNow = new Date();
    let dateExp = new Date(decodedToken.exp * 1000);
    if (dateExp < dateNow.getTime()) {
      isExpired = true;
    }
    if (isExpired === true) localStorage.removeItem("token");
  }

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/myoffers"
          element={isAuthenticated ? <MyOffers /> : <Navigate to="/login" />}
        />
        <Route
          path="/viewoffer/:id"
          element={isAuthenticated ? <ViewOffer /> : <Navigate to="/login" />}
        />
        <Route
          path="/Favourites"
          element={isAuthenticated ? <Favourites /> : <Navigate to="/login" />}
        />
        <Route
          path="/createOffer"
          element={isAuthenticated ? <CreateOffer /> : <Navigate to="/login" />}
        />
        <Route
          path="/updateOffer/:id"
          element={isAuthenticated ? <UpdateOffer /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
