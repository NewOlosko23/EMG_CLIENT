import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Artist from "../pages/Artist";
import Admin from "../pages/Admin";
import Discover from "../pages/Discover";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Merch from "../pages/Merch";
import Team from "../pages/Team";

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/Login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/Home"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/Discover"
        element={
          <Layout>
            <Discover />
          </Layout>
        }
      />
      <Route
        path="/Team"
        element={
          <Layout>
            <Team />
          </Layout>
        }
      />
      <Route
        path="/Merch"
        element={
          <Layout>
            <Merch />
          </Layout>
        }
      />
      <Route
        path="/Signup"
        element={
          <Layout>
            <Signup />
          </Layout>
        }
      />
      <Route
        path="/Artists"
        element={
          <Layout>
            <Artist />
          </Layout>
        }
      />
      <Route
        path="/Admin"
        element={
          <Layout>
            <Admin />
          </Layout>
        }
      />
    </Routes>
  );
};

export default Routers;
