import { DarkModeWrapper } from "../components/DarkModeWrapper"
import "../styles/global.css"
import { DarkModeToggleProvider} from "../utils/useDarkModeToggle"

function MyApp({ Component, pageProps }) {

    return (
        <>
            <DarkModeToggleProvider>
                <title>carltheperson</title>
                <DarkModeWrapper>
                    <Component {...pageProps} />
                </DarkModeWrapper>
            </DarkModeToggleProvider>
            
        </>
    )
}

export default MyApp