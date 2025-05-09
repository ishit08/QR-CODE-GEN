
// app/layout.js
import './globals.css'; // Add global styles if needed
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SessionWrapper from './components/SessionWrapper'; // Import the SessionWrapper

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
      <body className="">
        {/* Wrap the main layout with the SessionWrapper */}
        <SessionWrapper>
          {/* Navbar at the top */}
          <Navbar />

          {/* Main content */}
          <main className="w-full flex-1 pt-[72px]">
            {children}
          </main>

          {/* Footer at the bottom */}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
