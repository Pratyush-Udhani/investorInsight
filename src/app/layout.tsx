"use client"

import "~/styles/globals.css";
import { api } from "~/utils/api";
import { Sidebar } from "flowbite-react";
import { HiInbox, HiViewList } from 'react-icons/hi';

function RootLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-blue-50">
                <Sidebar> 
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item
                                href="#"
                                icon={HiInbox}
                            >
                                <p>
                                    Dashboard
                                </p>
                            </Sidebar.Item>
                            
                            <Sidebar.Item
                                href="#"
                                icon={HiViewList}
                            >
                                <p>
                                    App List
                                </p>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </body>
        </html>
    )
}

export default api.withTRPC(RootLayout);
