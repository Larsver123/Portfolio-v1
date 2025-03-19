import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import NavigationBar from "./components/NavigationBar";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Lars Vermeulen",
  description: "Portfolio website van Lars Vermeulen",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAuthPage = pathname.includes("/login") || pathname.includes("/register");

  return (
    <html lang="nl">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="min-h-screen bg-gray-50">
            {!isAuthPage && <NavigationBar />}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
