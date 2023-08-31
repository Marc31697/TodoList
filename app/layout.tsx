import "./globals.css";
import type { Metadata } from "next";
import { Akshar } from "next/font/google";
import { Footer, Sidebar, TaskProvider } from "@/components";

const inter = Akshar({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To Do List",
  description: "A simple productivity tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative ${inter.className}`}>
        <TaskProvider>
          <div className="flex flex-row">
            <Sidebar />
            <div className="flex flex-col">
              {children}
              <Footer />
            </div>
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}
