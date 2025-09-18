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
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminHome from "../pages/admin/AdminHome";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AdminRoute } from "../components/RoleBasedRoute";
import { AutoRedirect } from "../components/AutoRedirect";

const Routers = () => {
  return (
    <AutoRedirect>
      <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute requireAuth={false}>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
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
      {/* Simple Dashboard - Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
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
        element={
          <ProtectedRoute requireAuth={false}>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <ProtectedRoute requireAuth={false}>
            <Signup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />
      {/* Admin Dashboard - Role Protected (Admin Only) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      >
        <Route index element={<AdminHome />} />
        <Route path="dashboard" element={<AdminHome />} />
      </Route>
      </Routes>
    </AutoRedirect>
  );
};

export default Routers;
