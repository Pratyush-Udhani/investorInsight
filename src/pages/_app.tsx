import "~/styles/globals.css";
import { Roboto_Mono } from 'next/font/google'
import type { AppProps } from 'next/app'
import { api } from "~/utils/api";
import { AppProvider } from "./context/context";

const roboto = Roboto_Mono({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppProvider>
            <main className={`${roboto.className}`}>
                    <div className="w-screen h-max">
                       <Component {...pageProps} />
                    </div >
            </main>
        </AppProvider>
    )
}

export default api.withTRPC(MyApp);
