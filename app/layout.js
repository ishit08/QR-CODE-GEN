import './globals.css'; // Add global styles if needed
import Navbar from './components/navbar';
import Footer from './components/footer';

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
