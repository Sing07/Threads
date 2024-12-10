import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Rightsidebar from "@/components/shared/Rightsidebar";
import Bottombar from "@/components/shared/Bottombar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Threads",
    description: "A Next.js 13 Meta Threads Application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider dynamic>
            <html lang="en">
                <body className={inter.className}>
                    <Topbar />
                    <main className="flex flex-row">
                        <LeftSidebar />
                        <section className="main-container">
                            <div className="w-full max-w-xl">{children}</div>
                        </section>
                        <Rightsidebar />
                    </main>
                    <Bottombar />
                </body>
            </html>
        </ClerkProvider>
    );
}
