import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaHtml5, FaCss3Alt, 
  FaGitAlt, FaDocker, FaAws, FaDatabase, FaNpm, FaLinux,
  FaGithub, FaFigma, FaJs, FaSpinner
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiMysql, 
  SiPostgresql, SiExpress, SiFlask,
  SiTensorflow, SiScikitlearn, SiPandas, SiNumpy,
  SiVercel, SiSupabase, SiPostman, SiJira,
  SiRedux, SiVite, SiJest, SiRazorpay, SiJsonwebtokens
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { githubService } from '../../services/githubService';

const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredTech, setHoveredTech] = useState(null);
  const [githubLanguages, setGithubLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectCount, setProjectCount] = useState({});
  const [totalRepos, setTotalRepos] = useState(0);
  
  // Fetch GitHub data for language statistics
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch repos first (this is essential)
        const repos = await githubService.getRepos();
        
        // Count projects per technology
        const techProjectCount = {};
        
        repos.forEach(repo => {
          // Count by primary language
          if (repo.language) {
            techProjectCount[repo.language] = (techProjectCount[repo.language] || 0) + 1;
          }
          
          // Count by topics
          if (repo.topics) {
            repo.topics.forEach(topic => {
              const normalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
              techProjectCount[normalizedTopic] = (techProjectCount[normalizedTopic] || 0) + 1;
            });
          }
        });
        
        setProjectCount(techProjectCount);
        // Set the actual number of repos
        setTotalRepos(repos.length);
        
        // Try to get stats for language percentages (optional)
        try {
          const stats = await githubService.getStats();
          if (stats && stats.stats.languages) {
            setGithubLanguages(stats.stats.languages);
          }
        } catch (statsError) {
          console.warn('Could not fetch language stats, continuing with basic data:', statsError);
        }
        
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGitHubData();
  }, []);
  
  // Get proficiency level from GitHub data
  const getProficiencyLevel = (techName) => {
    // Check GitHub languages first
    const langData = githubLanguages.find(lang => 
      lang.name.toLowerCase() === techName.toLowerCase()
    );
    if (langData) {
      // Normalize to 100% scale where max = 100
      const maxPercentage = Math.max(...githubLanguages.map(l => l.percentage));
      return Math.round((langData.percentage / maxPercentage) * 100);
    }
    
    // For non-language techs, use project count
    const count = projectCount[techName] || 0;
    if (count > 0) {
      const maxCount = Math.max(...Object.values(projectCount));
      return Math.round((count / maxCount) * 100);
    }
    
    // Default proficiency based on your resume
    const resumeProficiency = {
      'React': 85,
      'Next.js': 80,
      'TypeScript': 75,
      'Node.js': 80,
      'Express.js': 75,
      'MySQL': 80,
      'MongoDB': 70,
      'PostgreSQL': 75,
      'Python': 80,
      'Java': 85,
      'TensorFlow': 60,
      'Git': 90,
      'Tailwind CSS': 85
    };
    
    return resumeProficiency[techName] || 50;
  };
  
  // Get project count for a technology
  const getProjectCount = (techName) => {
    return projectCount[techName] || projectCount[techName.replace('.js', '')] || 0;
  };
  
  // Tech stack data based on your resume
  const techStack = {
    languages: {
      title: "Languages",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
      items: [
        { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
        { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
        { name: "Python", icon: <FaPython />, color: "#3776AB" },
        { name: "Java", icon: <FaJava />, color: "#007396" },
        { name: "SQL", icon: <FaDatabase />, color: "#336791" },
        { name: "HTML", icon: <FaHtml5 />, color: "#E34C26" },
        { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6" }
      ]
    },
    frontend: {
      title: "Frontend",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      items: [
        { name: "React", icon: <FaReact />, color: "#61DAFB" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
        { name: "Framer Motion", icon: <FaReact />, color: "#FF0080" },
        { name: "Redux", icon: <SiRedux />, color: "#764ABC" },
        { name: "Vite", icon: <SiVite />, color: "#646CFF" }
      ]
    },
    backend: {
      title: "Backend",
      icon: "⚙️",
      color: "from-green-500 to-emerald-500",
      items: [
        { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
        { name: "Express.js", icon: <SiExpress />, color: "#000000" },
        { name: "REST APIs", icon: <FaDatabase />, color: "#009688" },
        { name: "Next.js API", icon: <SiNextdotjs />, color: "#000000" }
      ]
    },
    database: {
      title: "Databases",
      icon: "🗄️",
      color: "from-orange-500 to-red-500",
      items: [
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
        { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
        { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
        { name: "Supabase", icon: <SiSupabase />, color: "#3ECF8E" }
      ]
    },
    cloudDevops: {
      title: "Cloud/DevOps",
      icon: "☁️",
      color: "from-yellow-500 to-orange-500",
      items: [
        { name: "Azure", icon: <FaAws />, color: "#0078D4" },
        { name: "Vercel", icon: <SiVercel />, color: "#000000" },
        { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
        { name: "GitHub Actions", icon: <FaGithub />, color: "#2088FF" },
        { name: "Docker", icon: <FaDocker />, color: "#2496ED" }
      ]
    },
    aiml: {
      title: "AI/ML",
      icon: "🤖",
      color: "from-indigo-500 to-purple-500",
      items: [
        { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
        { name: "scikit-learn", icon: <SiScikitlearn />, color: "#F7931E" },
        { name: "Pandas", icon: <SiPandas />, color: "#150458" },
        { name: "NumPy", icon: <SiNumpy />, color: "#013243" },
        { name: "Tesseract.js", icon: <FaJs />, color: "#4285F4" }
      ]
    },
    tools: {
      title: "Tools",
      icon: "🛠️",
      color: "from-teal-500 to-cyan-500",
      items: [
        { name: "Razorpay", icon: <SiRazorpay />, color: "#0A2540" },
        { name: "JWT", icon: <SiJsonwebtokens />, color: "#000000" },
        { name: "OAuth 2.0", icon: <FaDatabase />, color: "#4285F4" },
        { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
        { name: "VS Code", icon: <VscCode />, color: "#007ACC" }
      ]
    }
  };
  
  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Technologies', icon: '🚀' },
    { id: 'languages', label: 'Languages', icon: '💻' },
    { id: 'frontend', label: 'Frontend', icon: '🎨' },
    { id: 'backend', label: 'Backend', icon: '⚙️' },
    { id: 'database', label: 'Databases', icon: '🗄️' },
    { id: 'cloudDevops', label: 'Cloud/DevOps', icon: '☁️' },
    { id: 'aiml', label: 'AI/ML', icon: '🤖' },
    { id: 'tools', label: 'Tools', icon: '🛠️' }
  ];
  
  // Get filtered items
  const getFilteredItems = () => {
    if (selectedCategory === 'all') {
      return Object.entries(techStack).flatMap(([key, category]) => 
        category.items.map(item => ({ 
          ...item, 
          category: category.title,
          categoryKey: key,
          level: getProficiencyLevel(item.name),
          projects: getProjectCount(item.name)
        }))
      );
    }
    return techStack[selectedCategory]?.items.map(item => ({ 
      ...item, 
      category: techStack[selectedCategory].title,
      categoryKey: selectedCategory,
      level: getProficiencyLevel(item.name),
      projects: getProjectCount(item.name)
    })) || [];
  };
  
  const filteredItems = getFilteredItems();
  
  // Calculate stats
  const totalTechnologies = Object.values(techStack).reduce(
    (sum, category) => sum + category.items.length, 0
  );
  
  const averageProficiency = filteredItems.length > 0
    ? Math.round(filteredItems.reduce((sum, item) => sum + item.level, 0) / filteredItems.length)
    : 0;
    
  const totalProjects = Object.keys(projectCount).length;
  
  if (loading) {
    return (
      <section id="techstack" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <FaSpinner className="animate-spin text-4xl text-primary" />
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="techstack" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>
        
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
            <div className="text-3xl font-bold text-primary">{totalTechnologies}</div>
            <div className="text-gray-400 text-sm">Technologies</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
            <div className="text-3xl font-bold text-blue-400">{averageProficiency}%</div>
            <div className="text-gray-400 text-sm">Avg Proficiency</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
            <div className="text-3xl font-bold text-green-400">{totalRepos}</div>
            <div className="text-gray-400 text-sm">GitHub Projects</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50">
            <div className="text-3xl font-bold text-purple-400">{categories.length - 1}</div>
            <div className="text-gray-400 text-sm">Categories</div>
          </div>
        </motion.div>
        
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg shadow-primary/30'
                  : 'bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-white border border-gray-700/50'
              }`}
            >
              <span>{category.icon}</span>
              <span className="hidden sm:inline">{category.label}</span>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Tech Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          {filteredItems.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              className="relative group"
            >
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-primary/30 transition-all duration-300">
                {/* Tech Icon */}
                <div 
                  className="text-4xl mb-3 flex justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ color: hoveredTech === tech.name ? tech.color : '#9CA3AF' }}
                >
                  {tech.icon}
                </div>
                
                {/* Tech Name */}
                <h3 className="text-white text-sm font-medium text-center mb-2">
                  {tech.name}
                </h3>
                
                {/* Proficiency Bar */}
                <div className="w-full bg-gray-700/50 rounded-full h-1.5 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.02 }}
                    className="h-full rounded-full"
                    style={{ 
                      background: `linear-gradient(to right, ${tech.color}, ${tech.color}dd)` 
                    }}
                  />
                </div>
                
                {/* Stats */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{tech.level}%</span>
                  {tech.projects > 0 && (
                    <span>{tech.projects} projects</span>
                  )}
                </div>
                
                {/* Hover Tooltip */}
                {hoveredTech === tech.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 pointer-events-none whitespace-nowrap"
                  >
                    <div className="text-white text-sm font-medium">{tech.name}</div>
                    <div className="text-gray-400 text-xs">Category: {tech.category}</div>
                    <div className="text-gray-400 text-xs">Proficiency: {tech.level}%</div>
                    {tech.projects > 0 && (
                      <div className="text-gray-400 text-xs">Used in {tech.projects} projects</div>
                    )}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Note about data source */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8 text-gray-500 text-sm"
        >
          * Proficiency levels calculated from GitHub repository statistics and project usage
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;