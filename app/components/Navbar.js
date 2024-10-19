"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if mobile menu is open
  const [userName, setUserName] = useState(null); // State for user's name
  const [isLoginHovered, setLoginHovered] = useState(false); // State for hover effect on login icon
  const [isRegHovered, setRegHovered] = useState(false); // State for hover effect on register icon

  // Define link data for both desktop and mobile, including icons
  const links = [
    { href: "/", label: "Home", icon: "fa fa-home" },
    { href: "/prices", label: "Plans", icon: "fa fa-tags" },
    { href: "/qr", label: "QR Options", icon: "fa fa-qrcode" },
    { href: "/qrcode", label: "Qr Codes", icon: "fa fa-qrcode" },
    { href: "/barcode", label: "Bar Codes", icon: "fa fa-barcode" },
    { href: "/scanner", label: "Scanner", icon: "fa fa-expand" },
  ];

  // Logout function
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      setUserName(null);
      setTimeout(() => {
        window.location.reload(); // Reload to reflect logout
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
      <div className="container mx-auto grid grid-cols-3 md:grid-cols-[20%,50%,30%] items-center p-4">
        {/* Logo Section - 20% */}
        <div className="flex items-center">
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

        {/* Menu links for desktop - 50% */}
        <div className="hidden md:flex justify-center space-x-8">
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

        {/* User profile section - only for desktop - 30% */}
        <div className="hidden md:flex justify-end items-center space-x-4">
          {userName ? (
            <>
              <span>{userName}</span> {/* Display user name */}
              <Image
                src="/path/to/avatar.png" // Replace with the path to the user's avatar
                alt="User Avatar"
                width={30} // Set desired width for avatar
                height={30} // Set desired height for avatar
                className="rounded-full" // Make it circular
              />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:text-gray-300"
              >
                <i className="fa fa-right-from-bracket"></i> {/* Logout icon */}
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-2 hover:text-gray-300"
                onMouseEnter={() => setLoginHovered(true)} // Set hover state for login icon
                onMouseLeave={() => setLoginHovered(false)} // Reset hover state for login icon
              >
                <i className={isLoginHovered ? "fa fa-person-walking-arrow-right" : "fa fa-right-from-bracket"}></i> {/* Login icon */}
                <span className="flex-shrink-0">Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center space-x-2 hover:text-gray-300"
                onMouseEnter={() => setRegHovered(true)} // Set hover state for register icon
                onMouseLeave={() => setRegHovered(false)} // Reset hover state for register icon
              >
                <i className={isRegHovered ? "fa fa-person-circle-plus" : "fa fa-user-plus"}></i> {/* Register icon */}
                <span>Register</span>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden col-span-full flex justify-end">
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
              onClick={() => setIsOpen(false)} // Close menu on link click
            >
              <i className={link.icon}></i> {/* Render the icon */}
              <span>{link.label}</span>
            </Link>
          ))}
          {/* Mobile login/register links */}
          {!userName && (
            <>
              <Link
                href="/login"
                className="flex items-center space-x-2 hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <i className="fa fa-right-from-bracket"></i> {/* Login icon */}
                <span>Login</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center space-x-2 hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                <i className="fa fa-user-plus"></i> {/* Register icon */}
                <span>Register</span>
              </Link>
            </>
          )}
          {/* Mobile logout link */}
          {userName && (
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
