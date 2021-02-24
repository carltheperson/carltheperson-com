import React from "react";
import { useDarkModeToggle } from "../hooks/useDarkModeToggle";

interface DarkModeWrapperProps {
  children: React.ReactNode;
}

export const DarkModeWrapper = ({ children }: DarkModeWrapperProps) => {
  const { dark } = useDarkModeToggle();

  return (
    <div
      style={{ width: "100%", height: "100%", minHeight: "100vh" }}
      className={dark ? "dark" : ""}
    >
      {children}
    </div>
  );
};
