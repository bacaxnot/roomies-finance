import { DatabaseContextProvider } from "@/context/useDatabaseContext";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roomies Finance",
  description: "Gestionante roomies finance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " grid"}>
        <DatabaseContextProvider>
          <main
            className="grid p-6 gap-6 justify-self-center"
            style={{ width: "min(800px, 100%)" }}
          >
            <h1 className="text-center text-3xl font-semibold">
              Roomies Finance
            </h1>
            {children}
          </main>
        </DatabaseContextProvider>
      </body>
    </html>
  );
}
