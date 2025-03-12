import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Achievements', path: '/#achievements' },
    { name: 'Contact', path: '/#contact' },
  ];
  
return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link to="/" className="text-xl font-bold text-primary">Aryan B V</Link>
                </div>
                
                {/* Desktop menu */}
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                                >
                                    {link.name}
                                </Link>
                        ))}
                        <div className="ml-4">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
                
                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary focus:outline-none"
                    >
                        {isOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
        
        {/* Mobile menu dropdown */}
        {isOpen && (
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-base font-medium"
                                    onClick={toggleMenu}
                                >
                                    {link.name}
                                </Link>
                    ))}
                </div>
            </div>
        )}
    </nav>
);
};

export default Navbar;