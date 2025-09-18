import React from "react";
import { Routes, Route } from "react-router-dom";
import Artist from "../pages/Artist";
import Discover from "../pages/Discover";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Merch from "../pages/Merch";
import Team from "../pages/Team";
import Dashboard from "../pages/Dashboard";
import DashboardHome from "../pages/DashboardHome";
import MyMusic from "../pages/MyMusic";
import UploadMusic from "../pages/UploadMusic";
import Analytics from "../pages/Analytics";
import Earnings from "../pages/Earnings";
import Playlists from "../pages/Playlists";
import Promotion from "../pages/Promotion";
import Calendar from "../pages/Calendar";
import Settings from "../pages/Settings";
import Help from "../pages/Help";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

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
        path="/Artists"
        element={
          <Layout>
            <Artist />
          </Layout>
        }
      />
      <Route
        path="/Dashboard"
        element={<Dashboard />}
      >
        <Route index element={<DashboardHome />} />
        <Route path="music" element={<MyMusic />} />
        <Route path="upload" element={<UploadMusic />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="playlists" element={<Playlists />} />
        <Route path="collaborations" element={<DashboardHome />} />
        <Route path="promotion" element={<Promotion />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/signup"
        element={<Signup />}
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />
    </Routes>
  );
};

export default Routers;
