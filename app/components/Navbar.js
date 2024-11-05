"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react"; 
import Link from "next/link";
import Image from "next/image";
import { Skeleton, Avatar, Menu, MenuItem, Divider, ListItemText } from "@mui/material"; // Import MUI Skeleton

import styles from '../styles/Navbar.module.css'; // Import the CSS module

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if mobile menu is open
  const { data: session, status } = useSession(); // Get session and loading status
  const [isLoginHovered, setLoginHovered] = useState(false); // State for hover effect on login icon
  const [isRegHovered, setRegHovered] = useState(false); // State for hover effect on register icon
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Define link data for both desktop and mobile, including icons
  const links = [
    { href: "/", label: "Home", icon: "fa fa-home" },
    { href: "/prices", label: "Plans", icon: "fa fa-tags" },
    { href: "/qrcode", label: "Qr Codes", icon: "fa fa-qrcode" },
    { href: "/qr", label: "Qr", icon: "fa fa-qrcode" },
    { href: "/barcode", label: "Bar Codes", icon: "fa fa-barcode" },
    { href: "/scanner", label: "Scanner", icon: "fa fa-expand" },
    { href: "/contactus", label: "Contact Us", icon: "fa fa-envelope" },
  ];

  const handleLogout = () => {
    signOut(); // Use NextAuth's signOut function to log the user out
    setIsOpen(false); // Close the mobile menu on logout
  };

  const getInitials = (email) => {
    return email.slice(0, 2).toUpperCase();
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
        <div className="hidden md:flex flex-grow justify-center space-x-6">
          {status === "loading" ? ( // Show loading state with MUI Skeleton
            <></>
          ) : links.map((link) => (
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

        {/* User profile or login/register links - Move to right */}
        <div className="flex items-center space-x-6 ">
          {status === "loading" ? ( // Show loading state with MUI Skeleton
            <></>
          ) : status === "authenticated" ? (
            <div className="flex items-center space-x-2 pl-10 pr-10">
            <Avatar
              sx={{ bgcolor: '#54cb5a82', cursor: 'pointer',  fontSize: '1rem' }}
              onClick={handleAvatarClick} 
            >
              {getInitials(session.user.email)}
            </Avatar>
            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                style: {
                  marginTop: '22px',
                  minWidth: '200px',
                  borderRadius: '10px'
                },
              }}
            >
              <MenuItem>
                <ListItemText>
                  <Link href="/profile"><i class="fa-solid fa-user" style={{ width: "1.25rem" }}></i> Profile</Link>
                </ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemText>
                  <Link href="/settings"><i class="fa-solid fa-gear" style={{ width: "1.25rem" }}></i> Settings</Link>
                </ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemText><i className="fa fa-right-from-bracket" style={{ width: "1.25rem" }}></i> Log out</ListItemText>
              </MenuItem>
            </Menu>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4 pl-10 pr-10">
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
