"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react"; 
import Link from "next/link";
import Image from "next/image";
import styles from '../styles/Navbar.module.css'; // Import the CSS module

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const [isLoginHovered, setLoginHovered] = useState(false);
  const [isRegHovered, setRegHovered] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: "fa fa-home" },
    { href: "/prices", label: "Plans", icon: "fa fa-tags" },
    { href: "/qrcode", label: "Qr Codes", icon: "fa fa-qrcode" },
    { href: "/barcode", label: "Bar Codes", icon: "fa fa-barcode" },
    { href: "/scanner", label: "Scanner", icon: "fa fa-expand" },
    { href: "/contactus", label: "Contact Us", icon: "fa fa-envelope" },
  ];

  const handleLogout = () => {
    signOut();
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-container']}>
        {/* Logo Section */}
        <div className={styles['logo-container']}>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="CodeSnaps"
              width={40}
              height={40}
              className={styles['logo-image']}
            />
            <span className={styles['logo-text']}>CodeSnaps</span>
          </Link>
        </div>

        {/* Menu links for desktop */}
        <div className={`${styles['menu-links']} hidden md:flex`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles['menu-link']}
            >
              <i className={`${link.icon} ${styles.icon}`}></i>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* User profile or login/register links */}
        <div className={styles['user-section']}>
          {status === "authenticated" ? (
            <div className="flex items-center space-x-2">
              <span>Hello, {session.user.name}</span>
              <button
                onClick={handleLogout}
                className={`${styles['menu-link']} hover:text-gray-300`}
              >
                <i className={`fa fa-right-from-bracket ${styles.icon}`}></i>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className={`${styles['login-section']} hidden md:flex`}>
              <Link
                href="/login"
                className={styles['menu-link']}
                onMouseEnter={() => setLoginHovered(true)}
                onMouseLeave={() => setLoginHovered(false)}
              >
                <i
                  className={`${isLoginHovered ? "fa fa-person-walking-arrow-right" : "fa fa-right-from-bracket"} ${styles.icon}`}
                ></i>
                <span className="flex-shrink-0">Login</span>
              </Link>
              <Link
                href="/register"
                className={styles['menu-link']}
                onMouseEnter={() => setRegHovered(true)}
                onMouseLeave={() => setRegHovered(false)}
              >
                <i
                  className={`${isRegHovered ? "fa fa-person-circle-plus" : "fa fa-user-plus"} ${styles.icon}`}
                ></i>
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles['hamburger-menu']}
            aria-expanded={isOpen}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <span className="h-6 w-6">X</span> : <span className="h-6 w-6">☰</span>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isOpen ? styles['mobile-menu-visible'] : styles['mobile-menu-hidden']} ${styles['mobile-menu']}`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles['menu-link']}
            onClick={() => setIsOpen(false)}
          >
            <i className={link.icon}></i>
            <span>{link.label}</span>
          </Link>
        ))}
        {status !== "authenticated" && (
          <>
            <Link
              href="/login"
              className={styles['menu-link']}
              onClick={() => setIsOpen(false)}
            >
              <i className="fa fa-right-from-bracket"></i>
              <span>Login</span>
            </Link>
            <Link
              href="/register"
              className={styles['menu-link']}
              onClick={() => setIsOpen(false)}
            >
              <i className="fa fa-user-plus"></i>
              <span>Register</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
