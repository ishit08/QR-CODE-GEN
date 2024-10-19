// app/layout.js
import './globals.css'; // Add global styles if needed
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: "CodeSnap", // Update title as needed
  description: "This is a Custom QR code generator Application", // Update description as needed
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head>
        {/* Correctly referencing favicon without '/public' */}
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        
        {/* Font Awesome Stylesheet */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body className="flex w-full h-screen min-h-screen">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content */}
        <main className="w-full pt-[72px]">
          {children}
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </body>
    </html>
  );
}
