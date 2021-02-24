import React, { createContext, useContext, useEffect, useState } from "react";

export const darkModeToggleContext = createContext(undefined);

export const useDarkModeToggle = () => useContext(darkModeToggleContext);

interface DarkModeToggleProviderProps {
  children: React.ReactNode;
}

export const DarkModeToggleProvider = ({
  children,
}: DarkModeToggleProviderProps) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("likesDark") == "no") {
      setDark(false);
    } else if (
      localStorage.getItem("likesDark") == "yes" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    setDark(!dark);
    localStorage.setItem("likesDark", !dark ? "yes" : "no");
  };

  return (
    <darkModeToggleContext.Provider value={{ dark, toggleDark }}>
      {children}
    </darkModeToggleContext.Provider>
  );
};
