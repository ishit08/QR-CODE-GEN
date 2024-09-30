import './globals.css';
import Navbar from './components/Navbar'; // Adjust path as necessary

export const metadata = {
  title: "My QR Factory", // Update title as needed
  description: "This is a custom Next.js application built for my needs.", // Update description as needed
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Navbar included */}
        {children} {/* All pages will be rendered here */}
      </body>
    </html>
  );
}
