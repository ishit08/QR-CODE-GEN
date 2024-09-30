import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white text-black shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
      </div>

      {/* Navigation links */}
      <div className="flex space-x-8 text-lg font-medium">
        <Link href="/single-generator" className="hover:text-blue-500">
          Single Generator
        </Link>
        <Link href="/bulk-generator" className="hover:text-blue-500">
          Bulk Generator
        </Link>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Register
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
          Log In
        </button>
      </div>
    </nav>
  );
}
