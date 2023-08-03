import "~/styles/globals.css";
import { api } from "~/utils/api";

function RootLayout({
        // Layouts must accept a children prop.
        // This will be populated with nested layouts or pages
        children,
        }: { children: React.ReactNode }) {
    return (
            <html lang="en">
            <body>{children}</body>
            </html>
           )
}

export default api.withTRPC(RootLayout);