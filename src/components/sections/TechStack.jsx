import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaHtml5, FaCss3Alt, 
  FaGitAlt, FaDocker, FaAws, FaDatabase, FaNpm, FaLinux,
  FaGithub, FaFigma, FaJs
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiMysql, 
  SiPostgresql, SiRedis, SiExpress, SiFlask, SiDjango,
  SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiNumpy,
  SiVercel, SiNetlify, SiHeroku, SiFirebase, SiSupabase,
  SiPostman, SiInsomnia, SiJira, SiNotion,
  SiGraphql, SiApollographql, SiRedux, SiWebpack, SiVite,
  SiEslint, SiPrettier, SiJest, SiCypress, SiSelenium
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

const TechStack = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredTech, setHoveredTech] = useState(null);
  
  // Comprehensive tech stack data with proficiency levels
  const techStack = {
    languages: {
      title: "Languages",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
      items: [
        { name: "JavaScript", icon: <FaJs />, level: 85, projects: 15, color: "#F7DF1E" },
        { name: "TypeScript", icon: <SiTypescript />, level: 75, projects: 8, color: "#3178C6" },
        { name: "Python", icon: <FaPython />, level: 80, projects: 10, color: "#3776AB" },
        { name: "Java", icon: <FaJava />, level: 90, projects: 12, color: "#007396" },
        { name: "HTML5", icon: <FaHtml5 />, level: 95, projects: 20, color: "#E34C26" },
        { name: "CSS3", icon: <FaCss3Alt />, level: 90, projects: 20, color: "#1572B6" }
      ]
    },
    frontend: {
      title: "Frontend",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      items: [
        { name: "React", icon: <FaReact />, level: 85, projects: 10, color: "#61DAFB" },
        { name: "Next.js", icon: <SiNextdotjs />, level: 80, projects: 5, color: "#000000" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 90, projects: 8, color: "#06B6D4" },
        { name: "Redux", icon: <SiRedux />, level: 70, projects: 4, color: "#764ABC" },
        { name: "Webpack", icon: <SiWebpack />, level: 65, projects: 3, color: "#8DD6F9" },
        { name: "Vite", icon: <SiVite />, level: 75, projects: 5, color: "#646CFF" }
      ]
    },
    backend: {
      title: "Backend",
      icon: "⚙️",
      color: "from-green-500 to-emerald-500",
      items: [
        { name: "Node.js", icon: <FaNodeJs />, level: 85, projects: 12, color: "#339933" },
        { name: "Express.js", icon: <SiExpress />, level: 80, projects: 10, color: "#000000" },
        { name: "Flask", icon: <SiFlask />, level: 70, projects: 4, color: "#000000" },
        { name: "Django", icon: <SiDjango />, level: 65, projects: 3, color: "#092E20" },
        { name: "GraphQL", icon: <SiGraphql />, level: 60, projects: 2, color: "#E10098" },
        { name: "Apollo", icon: <SiApollographql />, level: 55, projects: 2, color: "#311C87" }
      ]
    },
    database: {
      title: "Database",
      icon: "🗄️",
      color: "from-orange-500 to-red-500",
      items: [
        { name: "MySQL", icon: <SiMysql />, level: 85, projects: 8, color: "#4479A1" },
        { name: "MongoDB", icon: <SiMongodb />, level: 75, projects: 6, color: "#47A248" },
        { name: "PostgreSQL", icon: <SiPostgresql />, level: 70, projects: 4, color: "#4169E1" },
        { name: "Redis", icon: <SiRedis />, level: 60, projects: 2, color: "#DC382D" },
        { name: "Firebase", icon: <SiFirebase />, level: 70, projects: 3, color: "#FFCA28" },
        { name: "Supabase", icon: <SiSupabase />, level: 75, projects: 4, color: "#3ECF8E" }
      ]
    },
    aiml: {
      title: "AI/ML",
      icon: "🤖",
      color: "from-indigo-500 to-purple-500",
      items: [
        { name: "TensorFlow", icon: <SiTensorflow />, level: 70, projects: 3, color: "#FF6F00" },
        { name: "PyTorch", icon: <SiPytorch />, level: 60, projects: 2, color: "#EE4C2C" },
        { name: "Scikit-learn", icon: <SiScikitlearn />, level: 75, projects: 5, color: "#F7931E" },
        { name: "Pandas", icon: <SiPandas />, level: 80, projects: 6, color: "#150458" },
        { name: "NumPy", icon: <SiNumpy />, level: 80, projects: 6, color: "#013243" }
      ]
    },
    devops: {
      title: "DevOps & Cloud",
      icon: "☁️",
      color: "from-yellow-500 to-orange-500",
      items: [
        { name: "Git", icon: <FaGitAlt />, level: 90, projects: 20, color: "#F05032" },
        { name: "Docker", icon: <FaDocker />, level: 70, projects: 4, color: "#2496ED" },
        { name: "AWS", icon: <FaAws />, level: 60, projects: 3, color: "#FF9900" },
        { name: "Vercel", icon: <SiVercel />, level: 85, projects: 8, color: "#000000" },
        { name: "Netlify", icon: <SiNetlify />, level: 75, projects: 5, color: "#00C7B7" },
        { name: "Linux", icon: <FaLinux />, level: 75, projects: 10, color: "#FCC624" }
      ]
    },
    tools: {
      title: "Tools",
      icon: "🛠️",
      color: "from-teal-500 to-cyan-500",
      items: [
        { name: "VS Code", icon: <VscCode />, level: 95, projects: 20, color: "#007ACC" },
        { name: "Postman", icon: <SiPostman />, level: 85, projects: 15, color: "#FF6C37" },
        { name: "GitHub", icon: <FaGithub />, level: 90, projects: 20, color: "#181717" },
        { name: "Figma", icon: <FaFigma />, level: 70, projects: 5, color: "#F24E1E" },
        { name: "Notion", icon: <SiNotion />, level: 80, projects: 10, color: "#000000" },
        { name: "Jira", icon: <SiJira />, level: 65, projects: 3, color: "#0052CC" }
      ]
    },
    testing: {
      title: "Testing",
      icon: "🧪",
      color: "from-rose-500 to-pink-500",
      items: [
        { name: "Jest", icon: <SiJest />, level: 70, projects: 5, color: "#C21325" },
        { name: "Cypress", icon: <SiCypress />, level: 60, projects: 3, color: "#17202C" },
        { name: "Selenium", icon: <SiSelenium />, level: 55, projects: 2, color: "#43B02A" },
        { name: "ESLint", icon: <SiEslint />, level: 85, projects: 15, color: "#4B32C3" },
        { name: "Prettier", icon: <SiPrettier />, level: 90, projects: 18, color: "#F7B93E" }
      ]
    }
  };
  
  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Technologies', icon: '🚀' },
    { id: 'languages', label: 'Languages', icon: '💻' },
    { id: 'frontend', label: 'Frontend', icon: '🎨' },
    { id: 'backend', label: 'Backend', icon: '⚙️' },
    { id: 'database', label: 'Database', icon: '🗄️' },
    { id: 'aiml', label: 'AI/ML', icon: '🤖' },
    { id: 'devops', label: 'DevOps', icon: '☁️' },
    { id: 'tools', label: 'Tools', icon: '🛠️' },
    { id: 'testing', label: 'Testing', icon: '🧪' }
  ];
  
  // Get filtered items
  const getFilteredItems = () => {
    if (selectedCategory === 'all') {
      return Object.values(techStack).flatMap(category => 
        category.items.map(item => ({ ...item, category: category.title }))
      );
    }
    return techStack[selectedCategory]?.items.map(item => 
      ({ ...item, category: techStack[selectedCategory].title })
    ) || [];
  };
  
  const filteredItems = getFilteredItems();
  
  // Calculate stats
  const totalTechnologies = Object.values(techStack).reduce(
    (sum, category) => sum + category.items.length, 0
  );
  const averageProficiency = Math.round(
    filteredItems.reduce((sum, item) => sum + item.level, 0) / filteredItems.length
  );
  const totalProjects = filteredItems.reduce((sum, item) => sum + item.projects, 0);
  
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
            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Stack</span>
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
            <div className="text-3xl font-bold text-green-400">{totalProjects}</div>
            <div className="text-gray-400 text-sm">Projects Built</div>
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
                  <span>{tech.projects} projects</span>
                </div>
                
                {/* Hover Tooltip */}
                {hoveredTech === tech.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 pointer-events-none"
                  >
                    <div className="text-white text-sm font-medium">{tech.name}</div>
                    <div className="text-gray-400 text-xs">Category: {tech.category}</div>
                    <div className="text-gray-400 text-xs">Proficiency: {tech.level}%</div>
                    <div className="text-gray-400 text-xs">Used in {tech.projects} projects</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-800" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Category Breakdown */}
        {selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {Object.entries(techStack).slice(0, 4).map(([key, category]) => (
              <div
                key={key}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
              >
                <div className={`text-3xl mb-3`}>{category.icon}</div>
                <h3 className="text-white font-medium mb-2">{category.title}</h3>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  {category.items.length}
                </div>
                <div className="text-gray-400 text-sm">Technologies</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TechStack;