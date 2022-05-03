import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import React from "react";
import "./App.css";

import Navbar from "../components/cmp-navbar/Navbar";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register.jsx";
import PostDetails from "../pages/post-details/PostDetails";
import { UseGlobelContext } from "../context/FunctionAlContext";

function App() {
  const { user } = UseGlobelContext();
  return (
    <Router>
      <Navbar />
      <div className="app">
        <Route exact path="/" component={() => <Redirect to="/posts" />} />

        <Route exact path="/posts" component={Home} />

        <Route exact path="/detailspost/:id" component={PostDetails} />

        <Route path="/auth" component={user ? Home : Register} />
      </div>
    </Router>
  );
}

export default App;
