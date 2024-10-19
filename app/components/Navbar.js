"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react"; // Import signOut for logging out
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@mui/material"; // Import MUI Skeleton

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if mobile menu is open
  const { data: session, status } = useSession(); // Get session and loading status

  // Define link data for both desktop and mobile, including icons
  const links = [
    { href: "/", label: "Home", icon: "fa fa-home" },
    { href: "/prices", label: "Plans", icon: "fa fa-tags" },
    { href: "/qrcode", label: "Qr Codes", icon: "fa fa-qrcode" },
    { href: "/barcode", label: "Bar Codes", icon: "fa fa-barcode" },
    { href: "/scanner", label: "Scanner", icon: "fa fa-expand" }
  ];

  // Logout function
  const handleLogout = () => {
    signOut(); // Use NextAuth's signOut function to log the user out
    setIsOpen(false); // Close the mobile menu on logout
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo on the left */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="CodeSnaps"
              width={40} // Set desired width
              height={40} // Set desired height
              className="h-10 w-10"
            />
            <span className="text-lg font-bold ml-2">CodeSnaps</span>
          </Link>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? (
              <span className="h-6 w-6">X</span> // Close icon
            ) : (
              <span className="h-6 w-6">☰</span> // Hamburger icon
            )}
          </button>
        </div>

        {/* Menu links for desktop */}
        <div className={`hidden md:flex space-x-8`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <i className={link.icon}></i> {/* Render the icon */}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* User profile or login/register links */}
        <div className="hidden md:flex space-x-4">
          {status === "loading" ? ( // Show loading state with MUI Skeleton
            <>
            <Skeleton width={100} height={30} sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}/>
            <Skeleton width={100} height={30} sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}/>
            </>
          ) : status === "authenticated" ? (
            <div className="flex items-center space-x-8">
              <span>Hello, {session.user.name}</span> {/* Display user name */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <i className="fa fa-right-from-bracket"></i> {/* Logout icon */}
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <i className="fa fa-right-to-bracket"></i> {/* Login icon */}
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <i className="fa fa-user-plus"></i> {/* Register icon */}
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-800`}>
        <div className="flex flex-col items-center space-y-4 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <i className={link.icon}></i> {/* Render the icon */}
              <span>{link.label}</span>
            </Link>
          ))}
          {/* Mobile login/register links */}
          {status === "loading" ? ( // Show loading state with MUI Skeleton
            <Skeleton width={100} height={20} />
          ) : status !== "authenticated" && (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <i className="fa fa-right-to-bracket"></i>
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <i className="fa fa-user-plus"></i>
                <span>Register</span>
              </Link>
            </>
          )}
          {/* Mobile logout link */}
          {status === "authenticated" && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <i className="fa fa-right-from-bracket"></i> {/* Logout icon */}
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
