'use client'

import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import "./globals.css";
import { Providers } from "./providers";
import SwitchTheme from "@/components/SwitchTheme/page";
import { useState } from "react";
import Settings from "./settings/page";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [theme, setTheme] = useState(true);

  return (
    <html lang="en" className={theme ? "light" : "dark"}>
      <body className="flex flex-col">
        <Navbar maxWidth="full">
          <NavbarContent justify="end">
            <NavbarItem>
              <Settings />
            </NavbarItem>
            <NavbarItem>
              <SwitchTheme isSelected={theme} onClick={() => { setTheme(theme ? false : true) }} />
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
