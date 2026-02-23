import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "CommerceFlow — Multi-Market E-Commerce Platform",
  description:
    "Premium health & beauty products with rewarding member benefits. Shop skincare, supplements, haircare and wellness across multiple markets.",
  keywords: ["e-commerce", "beauty", "skincare", "supplements", "member rewards", "PV", "multi-market"],
  openGraph: {
    title: "CommerceFlow",
    description: "Premium health & beauty products with rewarding member benefits.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <CartDrawer />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
