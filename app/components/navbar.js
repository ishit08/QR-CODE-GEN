<<<<<<< HEAD
import Link from 'next/link';
//import { HomeIcon, CurrencyDollarIcon, LoginIcon, UserAddIcon } from '@heroicons/react/outline'; // Importing icons
import { HomeIcon, CurrencyDollarIcon, ArrowRightOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo on the left */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="App Logo" className="h-10 w-10" />
          <span className="text-lg font-bold">MyApp</span>
        </div>

        {/* Centered links */}
        <div className="flex space-x-8">
          <Link href="/" className="flex items-center space-x-2 hover:text-gray-300">
            <HomeIcon className="h-5 w-5" />
            <span>HOME</span>
          </Link>
          <Link href="/prices" className="flex items-center space-x-2 hover:text-gray-300">
            <CurrencyDollarIcon className="h-5 w-5" />
            <span>Prices & Offers</span>
          </Link>
        </div>

        {/* Right-aligned login and register */}
        <div className="flex space-x-4">
          <Link href="/login" className="flex items-center space-x-2 hover:text-gray-300">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Login</span>
          </Link>
          <Link href="/register" className="flex items-center space-x-2 hover:text-gray-300">
            <UserPlusIcon className="h-5 w-5" />
            <span>Register</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
=======
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
>>>>>>> ajay
