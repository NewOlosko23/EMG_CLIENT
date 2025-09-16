import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BackToTop />
      <ScrollToTop />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
