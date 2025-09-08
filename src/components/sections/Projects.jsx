import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaGithub, FaExternalLinkAlt, FaCode, FaSearch, 
  FaReact, FaNodeJs, FaPython, FaDatabase, FaTimes,
  FaStar, FaEye, FaCodeBranch, FaSpinner
} from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiMysql, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { getImagePath } from '../../utils/pathUtils';
import { githubService } from '../../services/githubService';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Your featured projects (keep these as they have images and detailed info)
  const featuredProjects = [
    {
      id: 'featured-1',
      title: "Lumina-Crafts E-Commerce",
      shortDesc: "Modern e-commerce platform with real-time features",
      description: "A full-featured e-commerce platform built with Next.js 14, featuring real-time cart management, secure payment processing, and optimized performance achieving <2s page load times.",
      image: getImagePath('project4.png'),
      technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Razorpay", "Tailwind CSS"],
      techIcons: [<SiNextdotjs />, <SiTypescript />, <FaDatabase />, <SiTailwindcss />],
      category: "fullstack",
      githubLink: "https://github.com/AryanBV/lumina-crafts",
      liveLink: "https://lumina-crafts.vercel.app",
      stats: {
        stars: 12,
        forks: 3,
        views: 234
      },
      highlights: [
        "99.9% transaction success rate",
        "Real-time cart synchronization",
        "Row Level Security implementation",
        "5+ payment methods supported"
      ],
      year: "2025",
      featured: true
    },
    {
      id: 'featured-2',
      title: "SMART_MED Healthcare",
      shortDesc: "AI-powered diabetes management system",
      description: "Healthcare management system featuring family tree visualization and OCR-based medical document processing, reducing patient data retrieval time by 40%.",
      image: getImagePath('project1.png'),
      technologies: ["React", "TypeScript", "Node.js", "Express.js", "MySQL", "Tesseract.js", "JWT"],
      techIcons: [<FaReact />, <SiTypescript />, <FaNodeJs />, <SiMysql />],
      category: "healthcare",
      githubLink: "https://github.com/AryanBV/SMART_MED_2.0",
      stats: {
        stars: 8,
        forks: 2,
        views: 156
      },
      highlights: [
        "40% faster data retrieval",
        "90% OCR accuracy",
        "Multi-role authentication",
        "5+ generations family tree"
      ],
      year: "2025",
      featured: true
    },
    {
      id: 'featured-3',
      title: "Weather Monitoring System",
      shortDesc: "Real-time weather analytics for Indian cities",
      description: "Comprehensive weather monitoring system with predictive analytics, real-time data processing, and interactive visualizations for major Indian cities.",
      image: getImagePath('project2.png'),
      technologies: ["Python", "Flask", "MongoDB", "scikit-learn", "Pandas", "Matplotlib", "API Integration"],
      techIcons: [<FaPython />, <SiMongodb />, <FaDatabase />],
      category: "data",
      githubLink: "https://github.com/AryanBV/weather_monitoring_system",
      stats: {
        stars: 5,
        forks: 1,
        views: 89
      },
      highlights: [
        "Real-time data processing",
        "ML-based predictions",
        "Interactive visualizations",
        "Multi-city support"
      ],
      year: "2024",
      featured: true
    },
    {
      id: 'featured-4',
      title: "IEEE Paper Generator",
      shortDesc: "AI-assisted research paper formatting tool",
      description: "Automated research paper generation tool with AI-powered content suggestions and automatic image captioning, reducing document preparation time by 60%.",
      image: getImagePath('project3.png'),
      technologies: ["React", "Node.js", "MySQL", "Express.js", "AI APIs", "Multer", "JWT"],
      techIcons: [<FaReact />, <FaNodeJs />, <SiMysql />],
      category: "ai",
      githubLink: "https://github.com/AryanBV/research-paper-assistant",
      stats: {
        stars: 15,
        forks: 5,
        views: 342
      },
      highlights: [
        "60% time reduction",
        "AI content generation",
        "Auto image captioning",
        "IEEE format compliance"
      ],
      year: "2025",
      featured: true
    }
  ];
  
  // Fetch GitHub repositories
  useEffect(() => {
    const fetchGitHubProjects = async () => {
      setLoading(true);
      try {
        const repos = await githubService.getRepos({ sort: 'updated', per_page: 30 });
        
        // Filter and map GitHub repos
        const githubProjects = repos
          .filter(repo => !repo.fork && repo.description) // Filter out forks and repos without description
          .map(repo => ({
            id: `github-${repo.id}`,
            title: repo.name
              .replace(/-/g, ' ')
              .replace(/_/g, ' ')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' '),
            shortDesc: repo.description,
            description: repo.description,
            technologies: repo.topics && repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean),
            category: determineCategory(repo),
            githubLink: repo.html_url,
            liveLink: repo.homepage,
            stats: {
              stars: repo.stargazers_count,
              forks: repo.forks_count,
              views: repo.watchers_count
            },
            language: repo.language,
            updatedAt: repo.updated_at,
            createdAt: repo.created_at,
            year: new Date(repo.created_at).getFullYear().toString(),
            featured: false
          }));
        
        // Combine featured projects with GitHub projects
        const allProjects = [...featuredProjects, ...githubProjects];
        
        // Remove duplicates based on GitHub URL
        const uniqueProjects = allProjects.filter((project, index, self) =>
          index === self.findIndex((p) => p.githubLink === project.githubLink)
        );
        
        setProjects(uniqueProjects);
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        // Fallback to featured projects if API fails
        setProjects(featuredProjects);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGitHubProjects();
  }, []);
  
  // Determine category based on repo info
  const determineCategory = (repo) => {
    const name = repo.name.toLowerCase();
    const desc = (repo.description || '').toLowerCase();
    const topics = (repo.topics || []).join(' ').toLowerCase();
    const combined = `${name} ${desc} ${topics}`;
    
    if (combined.includes('ml') || combined.includes('ai') || combined.includes('machine') || combined.includes('learning')) {
      return 'ai';
    }
    if (combined.includes('health') || combined.includes('medical') || combined.includes('patient')) {
      return 'healthcare';
    }
    if (combined.includes('data') || combined.includes('analysis') || combined.includes('visualization')) {
      return 'data';
    }
    if (combined.includes('web') || combined.includes('react') || combined.includes('next')) {
      return 'webdev';
    }
    return 'fullstack';
  };
  
  // Tech stack icons mapping
  const getTechIcon = (tech) => {
    const icons = {
      'React': <FaReact />,
      'Node.js': <FaNodeJs />,
      'Python': <FaPython />,
      'TypeScript': <SiTypescript />,
      'Next.js': <SiNextdotjs />,
      'MongoDB': <SiMongodb />,
      'MySQL': <SiMysql />,
      'Tailwind CSS': <SiTailwindcss />
    };
    return icons[tech] || <FaCode />;
  };
  
  // Enhanced categories
  const categories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length },
    { id: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'healthcare', label: 'Healthcare', count: projects.filter(p => p.category === 'healthcare').length },
    { id: 'ai', label: 'AI/ML', count: projects.filter(p => p.category === 'ai').length },
    { id: 'data', label: 'Data Science', count: projects.filter(p => p.category === 'data').length },
    { id: 'webdev', label: 'Web Dev', count: projects.filter(p => p.category === 'webdev').length }
  ];
  
  // Filter and search logic
  const filteredProjects = projects
    .filter(project => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'featured') return project.featured;
      return project.category === activeFilter;
    })
    .filter(project => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        (project.description || '').toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      // Sort featured projects first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then by stars
      return (b.stats?.stars || 0) - (a.stats?.stars || 0);
    });
  
  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <FaSpinner className="animate-spin text-4xl text-primary" />
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="projects" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore my portfolio of innovative solutions, from AI-powered applications to modern web platforms.
          </p>
        </motion.div>
        
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          {/* Search bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-12 pr-10 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(category.id)}
                className={`relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.id 
                    ? 'bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg shadow-primary/30' 
                    : 'bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-white border border-gray-700/50'
                }`}
              >
                <span>{category.label}</span>
                <span className="ml-2 text-xs opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.slice(0, 12).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-300`} />
                
                {/* Card content */}
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                  {/* Project Image or Placeholder */}
                  <div className="relative h-48 overflow-hidden bg-gray-800">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="text-center">
                          <FaCode className="text-4xl text-gray-600 mb-2 mx-auto" />
                          <p className="text-gray-500 text-sm">{project.language || 'Multiple'}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlay with quick actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <div className="flex gap-3">
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-lg text-white hover:bg-primary transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FaGithub size={18} />
                          </a>
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-lg text-white hover:bg-primary transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FaExternalLinkAlt size={18} />
                            </a>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                    
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-medium flex items-center">
                          <FaStar className="mr-1" size={10} />
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.shortDesc}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        {project.stats && (
                          <>
                            <span className="flex items-center">
                              <FaStar className="mr-1" /> {project.stats.stars}
                            </span>
                            <span className="flex items-center">
                              <FaCodeBranch className="mr-1" /> {project.stats.forks}
                            </span>
                          </>
                        )}
                      </div>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* No results message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FaSearch className="mx-auto text-4xl text-gray-600 mb-4" />
            <h3 className="text-xl text-gray-400 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
        
        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/AryanBV"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-primary to-blue-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group"
          >
            <FaGithub size={20} />
            <span>View All {projects.length} Projects on GitHub</span>
            <FaExternalLinkAlt className="group-hover:translate-x-1 transition-transform" size={14} />
          </a>
        </motion.div>
      </div>
      
      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-64 overflow-hidden rounded-t-2xl bg-gray-900">
                {selectedProject.image ? (
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <FaCode className="text-6xl text-gray-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-gray-900/50 backdrop-blur-sm rounded-full text-white hover:bg-gray-900/70 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                  <p className="text-gray-300">{selectedProject.shortDesc}</p>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-6">
                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">About This Project</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.description}</p>
                </div>
                
                {/* Key Highlights */}
                {selectedProject.highlights && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Highlights</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start">
                          <span className="text-primary mr-2 mt-1">✓</span>
                          <span className="text-gray-300">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-sm border border-gray-600/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Stats */}
                {selectedProject.stats && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Repository Stats</h4>
                    <div className="flex gap-6">
                      <div className="flex items-center text-gray-300">
                        <FaStar className="mr-2 text-yellow-400" />
                        {selectedProject.stats.stars} Stars
                      </div>
                      <div className="flex items-center text-gray-300">
                        <FaCodeBranch className="mr-2 text-blue-400" />
                        {selectedProject.stats.forks} Forks
                      </div>
                      {selectedProject.stats.views && (
                        <div className="flex items-center text-gray-300">
                          <FaEye className="mr-2 text-green-400" />
                          {selectedProject.stats.views} Watchers
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex gap-4">
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <FaGithub size={20} />
                    View Source Code
                  </a>
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                    >
                      <FaExternalLinkAlt size={20} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;