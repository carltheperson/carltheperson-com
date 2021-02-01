import Link from "next/link"
import { useDarkModeToggle } from '../utils/useDarkModeToggle'


export function Header() {
    const {dark, toggleDark} = useDarkModeToggle()

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Link href="/">
                    <a>{"<-- carltheperson.com"}</a>
                </Link>

                <button style={{margin: "5px"}} onClick={toggleDark}>{dark ? "Light mode" : "Dark mode"}</button>
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
                `}
            </style>
        </div>
    )
}