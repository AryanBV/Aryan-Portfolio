import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaSearch } from 'react-icons/fa';
import { getImagePath } from '../../utils/pathUtils';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedImage, setExpandedImage] = useState(null);
  
  // Project data
  const projects = [
    {
      id: 1,
      title: "SMART_MED",
      description: "A diabetes management system with family tree visualization and medical document OCR extraction, reducing patient data retrieval time by 40%.",
      image: getImagePath('project1.png'), // Updated line
      technologies: ["React", "TypeScript", "Node.js", "Express.js", "MySQL", "Tesseract.js"],
      category: "healthcare",
      githubLink: "https://github.com/AryanBV/SMART_MED_2.0",
      liveLink: "",
      featured: true
    },
    {
      id: 2,
      title: "Weather Monitoring System",
      description: "Real-time weather monitoring system for Indian cities, showcasing data processing and visualization with API integration.",
      image: getImagePath('project2.png'), // Updated line
      technologies: ["Python", "Flask", "MongoDB", "scikit-learn", "Pandas", "Matplotlib"],
      category: "data",
      githubLink: "https://github.com/AryanBV/weather_monitoring_system",
      liveLink: "",
      featured: true
    },
    {
      id: 3,
      title: "IEEE Paper Generator",
      description: "Full-stack web app generating IEEE-formatted research papers with AI-powered content and automatic image captioning.",
      image: getImagePath('project3.png'), // Updated line
      technologies: ["React", "Node.js", "MySQL", "JWT", "Multer"],
      category: "ai",
      githubLink: "https://github.com/AryanBV/research-paper-assistant",
      liveLink: "",
      featured: true
    }
  ];

  // Get all unique technologies for filters
  const allTechnologies = [...new Set(projects.flatMap(project => project.technologies))];
  
  // Project categories for filtering
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'featured', label: 'Featured' },
    { id: 'web', label: 'Web Apps' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'data', label: 'Data Science' },
    { id: 'healthcare', label: 'Healthcare' }
  ];
  
  // Filter projects based on selected category
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : activeFilter === 'featured' 
      ? projects.filter(project => project.featured) 
      : projects.filter(project => project.category === activeFilter);
  
  // Handle image expand
  const handleImageClick = (projectId) => {
    setExpandedImage(expandedImage === projectId ? null : projectId);
  };
  
  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">My Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my recent projects that showcase my skills in software development, 
            AI/ML, and creating innovative solutions to real-world problems.
          </p>
        </motion.div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category.id)}
              className={`py-2 px-5 rounded-full transition-all duration-300 ${
                activeFilter === category.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Project Image */}
              <div 
                className="relative overflow-hidden h-56 cursor-pointer group"
                onClick={() => handleImageClick(project.id)}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-xl">
                    <FaSearch />
                  </div>
                </div>
              </div>
              
              {/* Project info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center">
                  {project.title}
                  {project.featured && (
                    <span className="ml-2 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </h3>
                
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>
                
                {/* Tech stack */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Project links */}
                <div className="flex gap-4">
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <FaGithub />
                    <span>Code</span>
                  </a>
                  
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <FaExternalLinkAlt />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Show more projects button */}
        <div className="text-center mt-16">
          <motion.a 
            href="https://github.com/AryanBV"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-3 px-8 rounded-lg transition-colors"
          >
            <FaGithub />
            <span>View More on GitHub</span>
          </motion.a>
        </div>
      </div>
      
      {/* Expanded Image Modal */}
      {expandedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl max-h-screen">
          <img 
            src={projects.find(p => p.id === expandedImage)?.image} 
            alt="Project Preview" 
            className="max-w-full max-h-[80vh] object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
              onClick={() => setExpandedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;