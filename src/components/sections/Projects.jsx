import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import project1Image from '../../assets/images/project1.png'; // Import your screenshots
import project2Image from '../../assets/images/project2.png';
import project3Image from '../../assets/images/project3.png';

const Projects = () => {
  const projects = [
    {
      title: "SMART_MED",
      description: "A diabetes management system with family tree visualization and medical document OCR extraction, reducing patient data retrieval time by 40%.",
      image: project1Image,
      technologies: ["React", "TypeScript", "Node.js", "Express.js", "MySQL", "Tesseract.js"],
      githubLink: "https://github.com/AryanBV/SMART_MED_2.0",
      liveLink: ""
    },
    {
      title: "Weather Monitoring System",
      description: "Real-time weather monitoring system for Indian cities, showcasing data processing and visualization with API integration.",
      image: project2Image,
      technologies: ["Python", "Flask", "MongoDB", "scikit-learn", "Pandas", "Matplotlib"],
      githubLink: "https://github.com/AryanBV/weather_monitoring_system",
      liveLink: ""
    },
    {
      title: "IEEE Paper Generator",
      description: "Full-stack web app generating IEEE-formatted research papers with AI-powered content and automatic image captioning.",
      image: project3Image,
      technologies: ["React", "Node.js", "MySQL", "JWT", "Multer"],
      githubLink: "https://github.com/AryanBV/research-paper-assistant",
      liveLink: ""
    }
  ];

  return (
    <section id="projects" className="section-container">
      <motion.h2 
        className="text-3xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        My Projects
      </motion.h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative overflow-hidden h-48">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                {project.description}
              </p>
              
              <div className="mb-4 flex flex-wrap">
                {project.technologies.map(tech => (
                  <span 
                    key={tech} 
                    className="bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded mr-2 mb-2"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between mt-4">
                <a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 flex items-center"
                >
                  <FaGithub className="mr-1" /> Code
                </a>
                
                {project.liveLink && (
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 flex items-center"
                  >
                    <FaExternalLinkAlt className="mr-1" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;