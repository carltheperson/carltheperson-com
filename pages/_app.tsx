import React from "react";
import { DarkModeWrapper } from "../components/DarkModeWrapper";
import { DarkModeToggleProvider } from "../hooks/useDarkModeToggle";

import "../styles/global.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <script>0</script>
      <DarkModeToggleProvider>
        <title>carltheperson</title>
        <DarkModeWrapper>
          <Component {...pageProps} />
        </DarkModeWrapper>
      </DarkModeToggleProvider>
    </div>
  );
};

export default MyApp;
