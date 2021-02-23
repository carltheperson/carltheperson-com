import { Prism } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useDarkModeToggle } from "../utils/useDarkModeToggle";

export default function CodeBlock(props) {
  const code = props.value;
  const language = props.language;
  const { dark } = useDarkModeToggle();

  const doesCodeContainFilename = (code) => {
    return code.includes("[FILENAME]");
  };

  const removeFilename = (code) => {
    if (doesCodeContainFilename(code)) {
      let lines = code.split("\n");
      lines.splice(0, 1);
      return lines.join("\n");
    }
    return code;
  };

  const getFilename = (code) => {
    if (code.includes("[FILENAME]")) {
      return code.split("[FILENAME]")[1];
    }
  };

  return (
    <pre>
      <div>
        {doesCodeContainFilename(code) && (
          <div
            className="file-header"
            style={{
              border: "1px solid black",
              marginBottom: "-11px",
              paddingLeft: 5,
              fontStyle: "italic",
            }}
          >
            <span>{getFilename(code)}</span>
          </div>
        )}

        <code>
          <Prism language={language} style={dark ? dracula : prism}>
            {removeFilename(code)}
          </Prism>
        </code>
      </div>
      <style jsx>
        {`
          button {
            position: absolute;
            right: 8px;
            padding: 0px;
          }

          div {
            position: relative;
          }
        `}
      </style>
    </pre>
  );
}
