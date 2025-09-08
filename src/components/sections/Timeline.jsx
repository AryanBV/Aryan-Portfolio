import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGraduationCap, FaBriefcase, FaTrophy, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

const Timeline = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const timelineData = [
    
    
    {
      id: 3,
      type: 'project',
      title: 'Lumina-Craft E-Commerce Platform',
      organization: 'Personal Project',
      date: '2025',
      description: 'Developed full-featured e-commerce platform with Next.js 14, achieving <2s page load times.',
      achievements: [
        'Implemented Razorpay payment gateway',
        'Built real-time cart management',
        'Achieved 99.9% transaction success rate'
      ],
      icon: <FaBriefcase />,
      color: 'from-green-500 to-emerald-500',
      link: 'https://github.com/AryanBV/lumina-craft'
    },
    {
      id: 2,
      type: 'certification',
      title: 'Microsoft Azure AI Fundamentals',
      organization: 'Microsoft',
      date: 'December 2024',
      description: 'Certified in AI and ML concepts with Azure services implementation.',
      achievements: [
        'Credential ID: 878ECBC7C3BE4794',
        'Focus on Azure AI services',
        'Machine Learning fundamentals'
      ],
      icon: <FaTrophy />,
      color: 'from-purple-500 to-pink-500',
      link: 'https://learn.microsoft.com/credentials/878ecbc7c3be4794'
    },
    
    {
      id: 5,
      type: 'project',
      title: 'SMART_MED Healthcare System',
      organization: 'Academic Project',
      date: '2024',
      description: 'Diabetes management platform with OCR-based document processing.',
      achievements: [
        'Reduced data retrieval time by 40%',
        '90% OCR accuracy achieved',
        'Multi-role authentication system'
      ],
      icon: <FaBriefcase />,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Competitive Programming Excellence',
      organization: 'LeetCode & GeeksforGeeks',
      date: '2022 - Present',
      current: true,
      description: 'Consistent problem-solving practice with significant achievements across platforms.',
      achievements: [
        'LeetCode Rating: 1494',
        'GeeksforGeeks Rating: 1702',
        '550+ problems solved',
        '160+ day streak maintained'
      ],
      icon: <FaTrophy />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 1,
      type: 'education',
      title: 'B.Tech in AI & Machine Learning',
      organization: 'M S Ramaiah University of Applied Sciences',
      location: 'Bangalore, India',
      date: '2021 - 2025',
      current: true,
      description: 'Pursuing comprehensive program in AI/ML with 8.3 GPA. Focus on machine learning algorithms, neural networks, and practical AI applications.',
      achievements: [
        'GPA: 8.3/10',
        'Relevant Coursework: Machine Learning, Data Structures, Database Management',
        'Active member of Tech Club'
      ],
      icon: <FaGraduationCap />,
      color: 'from-blue-500 to-cyan-500'
    }
  ];
  
  // Filter options
  const filters = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'project', label: 'Projects', icon: '💼' },
    { id: 'certification', label: 'Certifications', icon: '🏆' },
    { id: 'achievement', label: 'Achievements', icon: '🎯' }
  ];
  
  const filteredData = activeTab === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.type === activeTab);
  
  return (
    <section id="timeline" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
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
          <h2 className="text-4xl font-bold text-white mb-4">My Journey</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A chronological view of my educational background, projects, and achievements that have shaped my career.
          </p>
        </motion.div>
        
        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveTab(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeTab === filter.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-gray-800/50 backdrop-blur-sm text-gray-400 hover:text-white border border-gray-700/50'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
            </motion.button>
          ))}
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-blue-500 to-purple-500 opacity-30" />
          
          {/* Timeline items */}
          <div className="space-y-12">
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 z-20"
                  whileHover={{ scale: 1.3 }}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} p-0.5`}>
                    <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                  </div>
                  {item.current && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                    </span>
                  )}
                </motion.div>
                
                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className="relative group">
                    {/* Gradient border effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-xl opacity-0 group-hover:opacity-30 blur transition duration-300`} />
                    
                    {/* Card content */}
                    <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                          <p className="text-primary font-medium">{item.organization}</p>
                        </div>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary transition-colors"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                      
                      {/* Meta info */}
                      <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-3">
                        <span className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          {item.date}
                        </span>
                        {item.location && (
                          <span className="flex items-center">
                            <FaMapMarkerAlt className="mr-1" />
                            {item.location}
                          </span>
                        )}
                        {item.current && (
                          <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-300 mb-4">{item.description}</p>
                      
                      {/* Achievements */}
                      {item.achievements && (
                        <div className="space-y-2">
                          {item.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start">
                              <span className="text-primary mr-2 mt-1">•</span>
                              <span className="text-gray-400 text-sm">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Type badge */}
                      <div className="mt-4 flex justify-end">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${item.color} text-white`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Years of Learning', value: '4+', icon: '📚' },
            { label: 'Projects Completed', value: '10+', icon: '🚀' },
            { label: 'Certifications', value: '3+', icon: '🏆' },
            { label: 'Problems Solved', value: '550+', icon: '💡' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;