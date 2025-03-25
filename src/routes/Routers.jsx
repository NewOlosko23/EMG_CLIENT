import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Artist from "../pages/Artist";
import Admin from "../pages/Admin";
import Feed from "../pages/Feed";
import Layout from "../components/Layout";
import Home from "../pages/Home";

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
        path="/Feed"
        element={
          <Layout>
            <Feed />
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
