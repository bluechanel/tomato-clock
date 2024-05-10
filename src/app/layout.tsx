import { GoogleAnalytics } from '@next/third-parties/google'
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import "./globals.css";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { Navbar } from '@/components/navbar';



export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <main className="flex flex-col h-screen items-center">
            <Navbar />
            <div className="flex-1 w-full h-screen overflow-hidden">
              {children}
            </div>
          </main>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-ER2VE60WFT" />
    </html>
  );
}
