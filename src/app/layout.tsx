"use client";

import "~/styles/globals.css";
import { api } from "~/utils/api";
import SideDrawer from "./components/side_drawer";

function RootLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className="flex flex-row">
                    <SideDrawer className="w-60 bg-blue"/>
                    <div className="bg-backdrop grow">
                        { children }
                    </div>
                </div>
            </body>
        </html>
    )
}

export default api.withTRPC(RootLayout);
