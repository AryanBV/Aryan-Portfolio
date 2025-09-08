import { FaLinkedin, FaGithub, FaEnvelope, FaHeart, FaCode } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-primary">Aryan B V</h3>
            <p className="text-gray-400 mt-1">Full-Stack Developer | AI/ML Engineer</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://www.linkedin.com/in/aryan-b-v-78aa63246/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary transition duration-300">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/AryanBV" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-gray-400 hover:text-primary transition duration-300">
              <FaGithub size={24} />
            </a>
            <a href="mailto:aryansalian5678@gmail.com"
               className="text-gray-400 hover:text-primary transition duration-300">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center">
            <FaCode className="mr-2" />
            Built with <FaHeart className="mx-2 text-red-500" /> by Aryan B V
          </p>
          <p className="mt-2">© {currentYear} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;