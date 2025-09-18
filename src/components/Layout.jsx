import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import ScrollToTop from "./ScrollToTop";
import CookieConsent from "./CookieConsent";

const Layout = ({ children, theme = "light" }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BackToTop />
      <ScrollToTop />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CookieConsent theme={theme} />
    </div>
  );
};

export default Layout;
