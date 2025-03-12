import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaJava, FaPython, FaJs, FaReact, FaHtml5, FaCss3, FaNodeJs, FaDatabase, 
  FaGit, FaServer, FaTools, FaChartBar, FaCode
} from 'react-icons/fa';
import { SiExpress, SiMongodb, SiMysql, SiGithub, SiTypescript } from 'react-icons/si';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  // Skill categories with data
  const skillCategories = [
    {
      id: "programming",
      title: "Programming Languages",
      icon: <FaCode className="text-xl" />,
      skills: [
        { name: "Java", icon: <FaJava />, level: 90, description: "Experience with OOP, data structures, algorithms, and backend development." },
        { name: "Python", icon: <FaPython />, level: 75, description: "Used for data analysis, machine learning projects, and backend development." },
        { name: "JavaScript", icon: <FaJs />, level: 60, description: "Modern ES6+ syntax, async programming, and DOM manipulation." },
        { name: "TypeScript", icon: <SiTypescript />, level: 55, description: "Type-safe JavaScript development for scalable applications." }
      ]
    },
    {
      id: "frontend",
      title: "Front-End Technologies",
      icon: <FaReact className="text-xl" />,
      skills: [
        { name: "React", icon: <FaReact />, level: 75, description: "Component-based UI development with hooks, context, and Redux." },
        { name: "HTML", icon: <FaHtml5 />, level: 90, description: "Semantic markup, accessibility, and modern HTML5 features." },
        { name: "CSS", icon: <FaCss3 />, level: 85, description: "Responsive design, animations, Flexbox, and CSS Grid." }
      ]
    },
    {
      id: "backend",
      title: "Back-End Technologies",
      icon: <FaServer className="text-xl" />,
      skills: [
        { name: "Node.js", icon: <FaNodeJs />, level: 80, description: "Server-side JavaScript, API development, and async programming." },
        { name: "Express.js", icon: <SiExpress />, level: 75, description: "RESTful API design, middleware, and route handling." }
      ]
    },
    {
      id: "databases",
      title: "Databases",
      icon: <FaDatabase className="text-xl" />,
      skills: [
        { name: "MySQL", icon: <SiMysql />, level: 85, description: "Relational database design, complex queries, and optimization." },
        { name: "MongoDB", icon: <SiMongodb />, level: 60, description: "NoSQL database for flexible data models and document storage." }
      ]
    },
    {
      id: "tools",
      title: "Tools & Platforms",
      icon: <FaTools className="text-xl" />,
      skills: [
        { name: "Git", icon: <FaGit />, level: 85, description: "Version control, branching strategies, and collaborative development." },
        { name: "GitHub", icon: <SiGithub />, level: 85, description: "Project management, CI/CD pipelines, and collaborative coding." }
      ]
    }
  ];
  
  // Calculate total average skill level
  const allSkills = skillCategories.flatMap(category => category.skills);
  const avgSkillLevel = Math.round(
    allSkills.reduce((sum, skill) => sum + skill.level, 0) / allSkills.length
  );
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">My Skills</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I'm constantly expanding my skillset with a focus on creating robust, scalable applications
            that solve real-world problems.
          </p>
        </motion.div>
        
        {/* Summary Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800/60 rounded-xl p-8 mb-12 border border-gray-700/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <FaChartBar className="mr-3 text-primary" />
                Skill Overview
              </h3>
              <p className="text-gray-300 mb-4">
                With 3+ years of experience in software development, I've built a diverse technical foundation
                spanning from front-end frameworks to backend systems, algorithms, and database design.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{allSkills.length}</div>
                  <div className="text-gray-400 text-sm">Technical Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{skillCategories.length}</div>
                  <div className="text-gray-400 text-sm">Skill Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{avgSkillLevel}%</div>
                  <div className="text-gray-400 text-sm">Avg. Proficiency</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">3+</div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-72 flex justify-center">
              {/* Circular skill indicator */}
              <div className="relative w-52 h-52">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#2a3644"
                    strokeWidth="10"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="10"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={2 * Math.PI * 45 * (1 - avgSkillLevel / 100)}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">{avgSkillLevel}%</span>
                  <span className="text-gray-400 text-sm">Overall</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="bg-gray-800/40 rounded-xl overflow-hidden border border-gray-700/30 shadow-lg"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <span className="mr-3 text-primary">{category.icon}</span>
                  {category.title}
                </h3>
                
                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill.name} 
                      className="relative"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between mb-1 items-center">
                        <div className="flex items-center">
                          <span className="text-primary text-lg mr-2">{skill.icon}</span>
                          <span className="text-gray-300">{skill.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <motion.div 
                          className="bg-primary h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                      
                      {/* Tooltip */}
                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute z-10 left-0 mt-2 w-full bg-gray-900 text-gray-300 p-3 rounded-md text-sm shadow-xl border border-gray-700"
                        >
                          {skill.description}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Other Skills & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              "Tailwind CSS", "Redux", "REST APIs", "GraphQL", "Firebase", 
              "Agile", "UI/UX", "Testing", "Docker", "AWS", "CI/CD"
            ].map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(2, 132, 199, 0.2)" }}
                className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;