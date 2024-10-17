import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Importing social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full text-center">
      <p>© CodeSnaps by <Link href="https://exponent-ag.vercel.app/">@ExponentSolutions.ai</Link> All rights reserved.</p>
      <div className="flex justify-center mt-2">
        <Link href="https://www.facebook.com" target="_blank" className="mx-2">
          <FaFacebook className="text-white hover:text-blue-500" />
        </Link>
        <Link href="https://www.twitter.com" target="_blank" className="mx-2">
          <FaTwitter className="text-white hover:text-blue-400" />
        </Link>
        <Link href="https://www.linkedin.com" target="_blank" className="mx-2">
          <FaLinkedin className="text-white hover:text-blue-600" />
        </Link>
        <Link href="https://www.instagram.com" target="_blank" className="mx-2">
          <FaInstagram className="text-white hover:text-pink-500" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
