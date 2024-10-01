import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full text-center">
      <p>© CodeSnap by <Link href="https://exponentsolutions.ai/">@ExponentSolutions.ai</Link> All rights reserved.</p>
    </footer>
  );
};

export default Footer;
