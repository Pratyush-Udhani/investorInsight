import "~/styles/globals.css";
import { Roboto_Mono } from 'next/font/google'
import type { AppProps } from 'next/app'
import { api } from "~/utils/api";

const roboto = Roboto_Mono({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className={roboto.className}>
            <div className="bg-backdrop w-screen h-screen">
               <Component {...pageProps} />
            </div >
        </main>
    )
}

export default api.withTRPC(MyApp);
