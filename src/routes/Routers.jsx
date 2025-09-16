import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Artist from "../pages/Artist";
import Admin from "../pages/Admin";
import Dashboard from "../pages/Dashboard";
import Discover from "../pages/Discover";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Merch from "../pages/Merch";
import Team from "../pages/Team";
import ProtectedRoute from "../components/ProtectedRoute";

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
        path="/shop"
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
        path="/forgot-password"
        element={
          <Layout>
            <ForgotPassword />
          </Layout>
        }
      />
      <Route
        path="/reset-password"
        element={
          <Layout>
            <ResetPassword />
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
        path="/Dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/Admin"
        element={
          <ProtectedRoute>
            <Layout>
              <Admin />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
