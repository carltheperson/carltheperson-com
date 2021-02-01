import {useDarkModeToggle} from "../utils/useDarkModeToggle"

export function DarkModeWrapper({children}) {

    const {dark, toggleDark} = useDarkModeToggle()


    return (
        <div style={{width: "100%", height: "100%", minHeight: "100vh"}} className={dark ? "dark" : ""}>
            {children}
        </div>
    )
}