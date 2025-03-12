import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-primary">Aryan B V</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Software Developer</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://www.linkedin.com/in/aryan-b-v-78aa63246/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition duration-300">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/AryanBV" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition duration-300">
              <FaGithub size={24} />
            </a>
            <a href="mailto:aryansalian5678@gmail.com"
               className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition duration-300">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Aryan B V. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;