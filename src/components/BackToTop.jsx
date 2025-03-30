import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const BackToTop = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 0);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed cursor-pointer z-70 bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      } ${
        theme === "dark"
          ? "bg-purple-700 text-white hover:bg-purple-600"
          : "bg-purple-800 text-white hover:bg-purple-700"
      }`}
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default BackToTop;
