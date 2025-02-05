// Layout.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext/ThemeContext";

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <button
        onClick={toggleTheme}
        className="theme-toggle fixed z-50 right-0 top-1/2"
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      {children}
    </div>
  );
};

export default Layout;
