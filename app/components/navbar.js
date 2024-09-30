import Link from 'next/link';
//import { HomeIcon, CurrencyDollarIcon, LoginIcon, UserAddIcon } from '@heroicons/react/outline'; // Importing icons
import { HomeIcon, CurrencyDollarIcon,  ArrowRightIcon ,UserPlusIcon } from '@heroicons/react/24/outline';
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo on the left */}
        <div className="flex items-center space-x-2">
         {/* Logo as a link to the home page */}
      <Link href="/" className="flex items-center">
        <img 
          src="/images/logo.png" // Ensure the path to your logo is correct
          alt="CodeSnap"
          className="h-10 w-10" // Adjust the size as needed
        />
        <span className="text-lg font-bold ml-2">CodeSnap</span> {/* Added margin-left for spacing */}
      </Link>
        </div>

        {/* Centered links */}
        <div className="flex space-x-8">
          <Link href="/" className="flex items-center space-x-2 hover:text-gray-300">
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link href="/prices" className="flex items-center space-x-2 hover:text-gray-300">
            <CurrencyDollarIcon className="h-5 w-5" />
            <span>Subscription Plans</span>
          </Link>
        </div>

        {/* Right-aligned login and register */}
        <div className="flex space-x-4">
          <Link href="/login" className="flex items-center space-x-2 hover:text-gray-300">
         <ArrowRightIcon className="h-5 w-5"></ArrowRightIcon>
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
