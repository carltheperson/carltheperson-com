import React from "react";

import Link from "next/link";
import { useDarkModeToggle } from "../hooks/useDarkModeToggle";

export const Header = () => {
  const { dark, toggleDark } = useDarkModeToggle();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link href="/">
          <a>{"<-- carltheperson.com"}</a>
        </Link>

        <button style={{ margin: "5px" }} onClick={toggleDark}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>

      <style jsx>
        {`
                    div {rea
                        width: 100%;
                    }
                    
                    a {
                        text-decoration: none;
                        color: black;
                    }

                    button {
                        padding: 0;
                    }
                `}
      </style>
    </div>
  );
};
