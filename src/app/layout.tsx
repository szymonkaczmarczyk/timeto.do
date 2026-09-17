import type { Metadata } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import "./globals.css";
import { faviconDataUri } from "./favicon-data";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://timeto.do'),
  title: {
    default: "TimeTo | Agencja Performance Marketingu",
    template: "%s | TimeTo",
  },
  description: "Liczą się efekty, nie deklaracje. Jesteśmy agencją performance, która wspiera marki w planowaniu, realizacji i skalowaniu kampanii nastawionych na wynik.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    siteName: 'TimeTo',
    locale: 'pl_PL',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon.png?v=4', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico?v=4', sizes: 'any' },
    ],
    shortcut: '/icon.png?v=4',
    apple: [
      { url: '/apple-touch-icon.png?v=4', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${poppins.variable} ${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" type="image/png" href={faviconDataUri} />
        <link rel="shortcut icon" href={faviconDataUri} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
