import "~/styles/globals.css";
import SideDrawer from "./components/side_drawer";
import type { AppProps } from 'next/app'
import { api } from "~/utils/api";
 
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="flex flex-row">
            <SideDrawer className="w-60 bg-blue"/>
            <div className="bg-backdrop grow">
                <Component {...pageProps} />
            </div>
        </div>
    )
}

export default api.withTRPC(MyApp);
