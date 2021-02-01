import { useState } from "react";
import { Prism } from "react-syntax-highlighter";
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { prism} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {useDarkModeToggle} from "../utils/useDarkModeToggle"


export default function CodeBlock(props) {
    const {dark, toggleDark} = useDarkModeToggle()
    const [copyText, setCopyText] = useState("copy")

    const copyClick = () => {
        navigator.clipboard.writeText(removeFileName(props.value))
        setCopyText("copied")
        setTimeout(() => {
            setCopyText("copy")
        }, 750)
    }

    const removeFileName = (code) => {
        if (code.includes("[FILE]")) {
            let lines = code.split('\n');
            lines.splice(0,1);
            return lines.join('\n');
        }
        return code
    }

    const getFileName = (code) => {
        if (code.includes("[FILE]")) {
            return code.split("[FILE]")[1]
        } else {
            return null
        }
    }

    const addPossibleWhiteSpace = (code) => {
        if (code.split("\n").length == 1) {
            return code + "          "
        } 
        return code
    }

    return (
        <pre>
            <div>
            {(
                (getFileName(props.value)) && 
                    <div className="file-header" style={{border: "1px solid black", marginBottom: "-11px", paddingLeft: 5, fontStyle: "italic"}}>
                        <span>
                            {getFileName(props.value)}
                        </span>
                </div>    
            )}
            
            <code>
                        <button style={{top: getFileName(props.value) ? "33px" : "8px"}}
                            onClick={copyClick}
                            
                            >{copyText}</button>
                    <Prism language={props.language} style={dark ? dracula : prism} >
                        {addPossibleWhiteSpace(removeFileName(props.value))}
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
    )
}