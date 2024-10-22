"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react"; // Import signOut for logging out
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@mui/material"; // Import MUI Skeleton

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if mobile menu is open
  const { data: session, status } = useSession(); // Get session and loading status
  const [isLoginHovered, setLoginHovered] = useState(false); // State for hover effect on login icon
  const [isRegHovered, setRegHovered] = useState(false); // State for hover effect on register icon

  // Define link data for both desktop and mobile, including icons
  const links = [
    { href: "/", label: "Home", icon: "fa fa-home" },
    { href: "/prices", label: "Plans", icon: "fa fa-tags" },
    { href: "/qr", label: "Qr", icon: "fa fa-qrcode" },
    { href: "/qrcode", label: "Qr Codes", icon: "fa fa-qrcode" },
    { href: "/barcode", label: "Bar Codes", icon: "fa fa-barcode" },
    { href: "/scanner", label: "Scanner", icon: "fa fa-expand" },
     { href: "/contactus", label: "Contact Us", icon: "fa fa-envelope" },
  ];

  // Logout function
  const handleLogout = () => {
    signOut(); // Use NextAuth's signOut function to log the user out
    setIsOpen(false); // Close the mobile menu on logout
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
      <div className="w-full mx-auto flex items-center justify-between pt-4 pb-4">
        {/* Logo Section */}
        <div className="flex items-center pl-10 pr-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="CodeSnaps"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-lg font-bold ml-2">CodeSnaps</span>
          </Link>
        </div>

        {/* Menu links for desktop */}
        <div className="hidden md:flex flex-grow justify-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <i className={link.icon} style={{ width: "1.25rem" }}></i> {/* Render the icon with fixed width */}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* User profile or login/register links - Move to right */}
        <div className="flex items-center space-x-6">
          {status === "loading" ? ( // Show loading state with MUI Skeleton
            <>
            <Skeleton width={100} height={35} sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}/>
            <Skeleton width={100} height={35} sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}/>
            </>
          ) : status === "authenticated" ? (
            <div className="flex items-center space-x-2">
              <span>Hello, {session.user.name}</span> {/* Display user name */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <i className="fa fa-right-from-bracket" style={{ width: "1.25rem" }}></i> {/* Logout icon with fixed width */}
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4 px-20">
              <Link
                href="/login"
                className="flex items-center space-x-2 hover:text-gray-300"
                onMouseEnter={() => setLoginHovered(true)}
                onMouseLeave={() => setLoginHovered(false)}
              >
                <i
                  className={
                    isLoginHovered
                      ? "fa fa-person-walking-arrow-right"
                      : "fa fa-right-from-bracket"
                  }
                  style={{ width: "1.25rem" }} // Fixed width for the icon
                ></i>
                <span className="flex-shrink-0">Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center space-x-2 hover:text-gray-300"
                onMouseEnter={() => setRegHovered(true)}
                onMouseLeave={() => setRegHovered(false)}
              >
                <i
                  className={
                    isRegHovered
                      ? "fa fa-person-circle-plus"
                      : "fa fa-user-plus"
                  }
                  style={{ width: "1.25rem" }} // Fixed width for the icon
                ></i>
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden flex justify-end">
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
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-800`}>
        <div className="flex flex-col items-center space-y-4 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-2 hover:text-gray-300"
              onClick={() => setIsOpen(false)} // Close the menu on link click
            >
              <i className={link.icon} style={{ width: "1.25rem" }}></i>
              <span>{link.label}</span>
            </Link>
          ))}
          {/* Show login/register links only in mobile menu if not authenticated */}
          {status !== "authenticated" && (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-2 hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <i className="fa fa-right-from-bracket" style={{ width: "1.25rem" }}></i>
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center space-x-2 hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <i className="fa fa-user-plus" style={{ width: "1.25rem" }}></i>
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
