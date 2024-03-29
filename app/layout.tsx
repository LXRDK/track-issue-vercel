import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import NavBar from "./NavBar";
import NextUiProvider from "./components/NextUiProvider";
import "./globals.css";
import "./theme.config.css";
import AuthProvider from "./auth/provider";
import QueryClientProvider from "./QueryClientProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "My ap",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <NextUiProvider>
              <Theme accentColor="cyan" grayColor="gray">
                <NavBar />
                <main className="p-5">
                  <Container>{children}</Container>
                </main>
                {/* <ThemePanel /> */}
              </Theme>
            </NextUiProvider>
          </AuthProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
