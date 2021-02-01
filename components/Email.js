import { useEffect, useState } from "react"

export function Email(props) {
    const [at, setAt] = useState("_")

    useEffect(() => {
        setAt("@")
    }, [at])


    return (
        <div>
        <p style={{marginBottom: "-20px", textAlign: (props.center) ? "center" : ""}}>Email me at: {"  "}</p>
            <div style={{width: "295px", margin: (props.center) ? "auto" : "", paddingBottom: 20}}>
                <p style={{display: "none"}}>n</p>
                <p style={{display: "none"}}>o</p>
                <p style={{display: "none"}}>t</p>
                <p>c</p>
                <p>a</p>
                <p>r</p>
                <p>l</p>
                <p>t</p>
                <p>h</p>
                <span></span>
                <p>e</p>
                <p>p</p>
                <div></div>
                <p>e</p>
                <p>r</p>
                <code></code>
                <p>s</p>
                <p>o</p>
                <span></span>
                <p>n</p>
                <p>{at}</p>
                <p>p</p>
                <p>r</p>
                <p>o</p>
                <div></div>
                <p>t</p>
                <p>o</p>
                <p>n</p>
                <span></span>
                <p>m</p>
                <p>a</p>
                <div></div>
                <p>i</p>
                <p>l</p>
                <p>{(at == "@") ? "." : ":"}</p>
                <p>c</p>
                <p>o</p>
                <p>m</p>
                <br/>
                <br/>
                <style jsx>
                    {`
                    p {
                        float: left;
                        font-style: italic;
                    }
                    `}
                </style>
            </div>
        </div>
        )
}