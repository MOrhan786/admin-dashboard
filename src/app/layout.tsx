"use client"


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Script from "next/script";

import { usePathname } from "next/navigation";



import { AdminHeader } from "@/components/AdminHeader";
import { AdminSidebar } from "@/components/AdminSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();


 


  const isStudio = pathname.startsWith("/studio");
  const isHome = pathname.startsWith("/sign-in");
  const isAdmin = pathname.startsWith("/admin");
  const isOrders = pathname.startsWith("/orders");
  const isCustomers = pathname.startsWith("/customers");
  const isStatistics = pathname.startsWith("/product-data");
  const isReviews = pathname.startsWith("/reviews");
  const studioAndSignIn = !isStudio && !isHome && !isAdmin && !isOrders && !isCustomers && !isStatistics && !isReviews


  return (
   
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      

        
          <div className="min-h-screen">
          {studioAndSignIn  && <AdminHeader/> }
          <div className="flex">
          {studioAndSignIn  && <AdminSidebar/>}
          <main className="flex-1 bg-muted/40 ">
        {children}
        </main>
       
        </div>
        </div>
      </body>
    </html>
    
  );
}
