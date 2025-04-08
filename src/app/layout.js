import { Geist, Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

<FontAwesomeIcon icon={faCalendar} />

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Taskit",
};

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} font-sans`}>
      <title>Taskit</title>
      <link rel="icon" href="/favicon.ico" />
      <head>
        <script src="https://kit.fontawesome.com/3e9c00d1d3.js" crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
