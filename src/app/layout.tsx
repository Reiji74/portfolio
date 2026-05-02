import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

const gotham = localFont({
  src: "../fonts/GothamBold.ttf",
  variable: "--font-gotham",
  display: "swap",
});

const balk = localFont({
  src: "../fonts/balk.otf",
  variable: "--font-balk",
  display: "swap",
});

const gothamBook = localFont({
  src: "../fonts/Gotham Book.otf",
  variable: "--font-gotham-book",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ESP32 Lab",
  description: "Embedded Systems and IoT Portfolio by Danish Iman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${gotham.variable} ${balk.variable} ${gothamBook.variable}`}>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
