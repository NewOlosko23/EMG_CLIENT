import React from "react";

const Footer = ({ theme }) => {
  return (
    <footer
      className={`w-full text-center transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-400"
          : "bg-blue-100 text-gray-700"
      }`}
    >
      <div className="mt-4 text-center text-sm py-2">
        <p>&copy; {new Date().getFullYear()} EMG Music. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
