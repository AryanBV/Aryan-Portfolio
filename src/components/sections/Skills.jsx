import { motion } from 'framer-motion';
import { FaJava, FaPython, FaJs, FaReact, FaHtml5, FaCss3, FaNodeJs, FaDatabase, FaGit } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiMysql } from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Java", icon: <FaJava />, level: 90 },
        { name: "Python", icon: <FaPython />, level: 75 },
        { name: "JavaScript", icon: <FaJs />, level: 60 }
      ]
    },
    {
      title: "Front-End Technologies",
      skills: [
        { name: "React", icon: <FaReact />, level: 75 },
        { name: "HTML", icon: <FaHtml5 />, level: 90 },
        { name: "CSS", icon: <FaCss3 />, level: 85 }
      ]
    },
    {
      title: "Back-End Technologies",
      skills: [
        { name: "Node.js", icon: <FaNodeJs />, level: 80 },
        { name: "Express.js", icon: <SiExpress />, level: 75 }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "MySQL", icon: <SiMysql />, level: 85 },
        { name: "MongoDB", icon: <SiMongodb />, level: 60 }
      ]
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git", icon: <FaGit />, level: 85 },
        { name: "GitHub", icon: <FaGit />, level: 85 }
      ]
    }
  ];

  return (
    <section id="skills" className="section-container bg-gray-100 dark:bg-gray-800">
      <motion.h2 
        className="text-3xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        My Skills
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-center">{category.title}</h3>
            
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="relative">
                  <div className="flex justify-between mb-1 items-center">
                    <div className="flex items-center">
                      <span className="text-primary text-lg mr-2">{skill.icon}</span>
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;