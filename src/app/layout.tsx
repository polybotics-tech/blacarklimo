import type { Metadata } from "next";
import { Sora, Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/src/components/ReduxProvider";
import OrganizationSchema from "@/src/components/OrganisationSchema";
import { Toaster } from "react-hot-toast";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  weight: ["400", "600"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blacarklimo | Professional Chauffeur Services",
  description:
    "Experience luxury and comfort with Blacarklimo, your premier choice for professional chauffeur services in Northern California. Book with us today for an unforgettable top-of-the-line travel experience.",
  keywords: [
    "blacark",
    "blacarklimo",
    "black limo",
    "black car",
    "limo",
    "limousine",
    "northern california",
    "chauffeur",
    "arklimo",
  ],
  authors: [{ name: "Polybotics Tech Hub" }, { name: "Ark Limo" }],
  creator: "Polybotics Tech Hub",
  openGraph: {
    type: "website",
    emails: ["blacarklimo@gmail.com"],
    images: [{ url: "https://www.blacarklimo.com/assets/images/img13.jpg" }],
    title: "Blacarklimo | Professional Chauffeur Services",
    description:
      "Experience luxury and comfort with Blacarklimo, your premier choice for professional chauffeur services in Northern California. Book with us today for an unforgettable top-of-the-line travel experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${poppins.variable} h-full antialiased scroll-pt-8 max-sm:no-scrollbars`}
    >
      <body className="min-h-full">
        <OrganizationSchema />
        <Toaster position="bottom-right" />

        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
