// app/layout.js
import './globals.css'; // Add global styles if needed
import Navbar from './components/navbar';
import Footer from './components/footer';

export const metadata = {
  title: "CodeSnap", // Update title as needed
  description: "This is Custom QR code generator Application", // Update description as needed
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
