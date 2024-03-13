'use client'

import { Button, Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import "./globals.css";
import { Providers } from "./providers";
import SwitchTheme from "@/components/SwitchTheme/page";
import { useState } from "react";



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
            <NavbarItem className="hidden lg:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
            <NavbarItem>
              <SwitchTheme isSelected={theme} onChange={() => { setTheme(theme ? false : true) }} />
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
