import type { Metadata } from "next";
import { Sora, Poppins } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://www.blacarklimo.com"),

  title: "Blacarklimo | Professional Chauffeur Services",

  description:
    "Experience luxury and comfort with Blacarklimo, your premier choice for professional chauffeur services in Northern California. Book with us today for an unforgettable top-of-the-line travel experience.",

  alternates: {
    canonical: "/",
  },

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

  // Google Search Console Verification
  verification: {
    google: "C8bMgfCXi1vpTpytLXXibpp66wtMAUwmgpjcLKGdbTA",
  },

  openGraph: {
    type: "website",
    emails: ["blacarklimo@gmail.com"],
    images: [
      {
        url: "https://www.blacarklimo.com/assets/images/img13.jpg",
      },
    ],
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

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BP0LY2P5ZS"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BP0LY2P5ZS');
          `}
        </Script>
      </body>
    </html>
  );
}
