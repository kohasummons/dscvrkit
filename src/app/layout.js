import localFont from "next/font/local";
import "./globals.css";

import { CanvasWalletProvider } from '../providers/CanvasWalletProvider';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  other: {
    "dscvr:canvas:version": "vNext",
    "og:image": "/next.svg",
    "viewport": "width=device-width, initial-scale=1"
  }
};

export default function RootLayout({ children }) {
  return (
    <CanvasWalletProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[600px] max-h-[660px]`}
        >
          <main className="flex flex-col bg-black min-h-screen">
            <div className="flex w-full lg:w-8/12 mx-auto flex-col">
              <Navbar />
              {children}
              <Footer />
            </div>
          </main>
        </body>
      </html>
    </CanvasWalletProvider>
  );
}
