import React from "react";
import { DarkModeWrapper } from "../components/DarkModeWrapper";
import { DarkModeToggleProvider } from "../hooks/useDarkModeToggle";

import "../styles/global.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <script>0</script>
      <DarkModeToggleProvider>
        <title>carltheperson</title>
        <DarkModeWrapper>
          <Component {...pageProps} />
        </DarkModeWrapper>
      </DarkModeToggleProvider>
    </>
  );
};

export default MyApp;
