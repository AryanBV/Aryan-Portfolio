import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGraduationCap, FaLaptopCode, FaCode, FaUserTie, FaLightbulb, FaTrophy } from 'react-icons/fa';

const About = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Tab data
  const tabs = [
    { id: 'profile', label: 'Background', icon: <FaUserTie /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'expertise', label: 'Expertise', icon: <FaLaptopCode /> },
    { id: 'goals', label: 'Aspirations', icon: <FaLightbulb /> }
  ];
  
  // Expertise areas
  const expertise = [
    { 
      title: "Full-Stack Development", 
      description: "Building end-to-end web applications with modern frameworks like React, Next.js, and Node.js with focus on scalability and performance.",
      icon: <FaLaptopCode />
    },
    { 
      title: "AI/ML Engineering", 
      description: "Implementing machine learning models and AI solutions for real-world applications using TensorFlow, scikit-learn, and Python.",
      icon: <FaCode />
    },
    { 
      title: "E-Commerce Solutions", 
      description: "Developing secure payment integrations, real-time cart management, and optimized user experiences for online platforms.",
      icon: <FaTrophy />
    },
    { 
      title: "Healthcare Technology", 
      description: "Creating healthcare management systems with OCR capabilities, family tree visualization, and secure patient data handling.",
      icon: <FaLightbulb />
    }
  ];
  
  // Career goals
  const goals = [
    "Master full-stack development with expertise in microservices architecture",
    "Contribute to innovative AI/ML solutions that solve real-world problems",
    "Build scalable applications that impact millions of users",
    "Develop expertise in cloud-native technologies and DevOps practices",
    "Create open-source tools that help the developer community"
  ];
  
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get to know my background, education, and what drives me as a developer.
          </p>
        </motion.div>
        
        {/* Tab Navigation */}
        <div className="bg-gray-800/50 rounded-xl shadow-lg overflow-hidden mb-12 max-w-4xl mx-auto">
          <div className="flex flex-wrap border-b border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-6 transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-gray-800/50'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          
          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-6">Professional Background</h3>
                <div className="text-gray-300 space-y-4">
                  <p>
                    I'm a Full-Stack Software Developer and AI/ML Engineer, recently graduated with a B.Tech in Artificial Intelligence and Machine Learning from M S Ramaiah University of Applied Sciences, Bangalore with a GPA of 8/10.
                  </p>
                  <p>
                    With expertise in building scalable web applications and AI-powered solutions, I've developed 4+ production-ready applications including e-commerce platforms and healthcare management systems. My technical proficiency spans across React, Next.js, Node.js, and Python.
                  </p>
                  <p>
                    My passion for problem-solving is demonstrated through 550+ algorithmic challenges solved across competitive programming platforms. I specialize in creating applications that seamlessly blend responsive design with modern technologies, focusing on performance, security, and user experience.
                  </p>
                  <p>
                    Currently based in Bangalore, I'm actively seeking opportunities to contribute to innovative projects where I can apply my skills in full-stack development, cloud technologies, and AI/ML to create impactful solutions.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                  <div className="bg-gray-800/70 p-4 rounded-lg text-center border border-gray-700/30">
                    <div className="text-3xl font-bold text-primary">550+</div>
                    <div className="text-gray-400 text-sm">Problems Solved</div>
                  </div>
                  <div className="bg-gray-800/70 p-4 rounded-lg text-center border border-gray-700/30">
                    <div className="text-3xl font-bold text-primary">4+</div>
                    <div className="text-gray-400 text-sm">Production Apps</div>
                  </div>
                  <div className="bg-gray-800/70 p-4 rounded-lg text-center border border-gray-700/30">
                    <div className="text-3xl font-bold text-primary">8/10</div>
                    <div className="text-gray-400 text-sm">GPA</div>
                  </div>
                  <div className="bg-gray-800/70 p-4 rounded-lg text-center border border-gray-700/30">
                    <div className="text-3xl font-bold text-primary">3</div>
                    <div className="text-gray-400 text-sm">Certifications</div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Education Tab */}
            {activeTab === 'education' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-6">Education Journey</h3>
                <div className="relative pl-10 border-l-2 border-gray-700">
                  <div className="relative mb-12">
                    {/* Timeline dot */}
                    <div className="absolute -left-[25px] top-0 w-12 h-12 bg-gray-900 rounded-full border-2 border-primary flex items-center justify-center text-primary">
                      <FaGraduationCap size={20} />
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/30">
                      <div className="text-white font-semibold text-lg">B.Tech in Artificial Intelligence and Machine Learning</div>
                      <div className="text-primary">M S Ramaiah University of Applied Sciences, Bangalore</div>
                      <div className="flex justify-between mt-2 mb-4">
                        <span className="text-gray-400 text-sm">2021 - 2025</span>
                        <span className="text-white bg-primary/20 px-2 py-1 rounded text-xs">GPA: 8/10</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-4">
                        Completed a comprehensive program focusing on machine learning algorithms, neural networks, data structures, and AI application development.
                      </p>
                      
                      <div className="mt-4">
                        <h4 className="text-white text-sm font-medium mb-2">Key Coursework:</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "Machine Learning",
                            "Data Structures",
                            "Database Management",
                            "Computer Networks",
                            "Software Engineering",
                            "Web Technologies",
                            "AI Ethics",
                            "Neural Networks"
                          ].map((course) => (
                            <span 
                              key={course} 
                              className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center text-gray-400 text-sm">
                    <span className="bg-gray-800 px-4 py-1 rounded-full">Fresher - Graduated 2025</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Expertise Tab */}
            {activeTab === 'expertise' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-6">Areas of Expertise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {expertise.map((area, index) => (
                    <motion.div
                      key={area.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/30"
                    >
                      <div className="text-primary mb-4">
                        {area.icon}
                      </div>
                      <h4 className="text-white font-medium text-lg mb-2">{area.title}</h4>
                      <p className="text-gray-400">{area.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Goals Tab */}
            {activeTab === 'goals' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-white mb-6">Professional Aspirations</h3>
                <p className="text-gray-300 mb-8">
                  As a fresh graduate passionate about technology and innovation, I've set clear career goals that drive my professional journey:
                </p>
                
                <div className="space-y-4">
                  {goals.map((goal, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="bg-primary/20 text-primary p-2 rounded-full mr-4 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="bg-gray-800/80 rounded-lg p-4 border border-gray-700/50 flex-1">
                        <p className="text-gray-200">{goal}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-10 p-5 bg-gray-800/60 border border-gray-700/30 rounded-lg">
                  <blockquote className="text-gray-300 italic">
                    "As a fresher entering the tech industry, I'm eager to contribute to innovative projects and continuously learn from experienced professionals while bringing fresh perspectives and enthusiasm to every challenge."
                  </blockquote>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;