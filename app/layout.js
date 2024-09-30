import './globals.css'; // Add global styles if needed
import Navbar from './components/navbar';
import Footer from './components/footer';

import './globals.css';
export const metadata = {
  title: "My QR Factory", // Update title as needed
  description: "This is a custom Next.js application built for my needs.", // Update description as needed
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
