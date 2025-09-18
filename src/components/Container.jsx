import React from "react";

const Container = ({ children, className = "", padding = "responsive" }) => {
  const paddingClasses = {
    responsive: "px-4 sm:px-6 lg:px-8",
    "responsive-lg": "px-6 sm:px-8 lg:px-12 xl:px-16",
    "responsive-xl": "px-8 sm:px-12 lg:px-16 xl:px-20",
    none: ""
  };

  return (
    <div className={`max-w-7xl mx-auto ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
