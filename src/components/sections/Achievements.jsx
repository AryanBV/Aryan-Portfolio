import { motion } from 'framer-motion';
import { FaCode, FaTrophy, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';

const Achievements = () => {
  const achievements = [
    {
      platform: 'LeetCode',
      icon: <SiLeetcode className="text-yellow-500" size={32} />,
      stats: [
        { label: 'Contest Rating', value: '1494' },
        { label: 'Problems Solved', value: '180+' },
        { label: 'Daily Streak', value: '160+ days' },
      ],
      profileUrl: 'https://leetcode.com/u/AryanBV/', // Replace with your actual profile URL
      backgroundColor: 'from-yellow-500/10 to-yellow-600/5',
      borderColor: 'border-yellow-500/20',
    },
    {
      platform: 'GeeksForGeeks',
      icon: <SiGeeksforgeeks className="text-green-500" size={32} />,
      stats: [
        { label: 'Contest Rating', value: '1702' },
        { label: 'Coding Score', value: '1150+' },
        { label: 'Problems Solved', value: '375+' },
      ],
      profileUrl: 'https://auth.geeksforgeeks.org/user/aryanbv/', // Replace with your actual profile URL
      backgroundColor: 'from-green-500/10 to-green-600/5',
      borderColor: 'border-green-500/20',
    },
    {
      platform: 'GitHub',
      icon: <FaGithub className="text-gray-400" size={32} />,
      stats: [
        { label: 'Contributions', value: '200+' },
        { label: 'Repositories', value: '20+' },
        { label: 'Projects', value: 'Various' },
      ],
      profileUrl: 'https://github.com/AryanBV', // This is already correct
      backgroundColor: 'from-purple-500/10 to-purple-600/5',
      borderColor: 'border-purple-500/20',
    },
  ];

  // Custom certifications or awards
  const certifications = [
    {
      title: "Advanced Algorithms Mastery",
      issuer: "Self-achieved milestone",
      description: "Demonstrated proficiency by solving complex algorithmic challenges across multiple platforms",
    },
    {
      title: "Consistent Coding Practice",
      issuer: "Self-achieved milestone",
      description: "Maintained a 160+ day streak of daily coding problems, showing dedication to continuous improvement",
    },
  ];

  return (
    <section id="achievements" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Achievements</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my technical proficiency and consistent commitment to coding excellence across platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.platform}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-gradient-to-br ${achievement.backgroundColor} border ${achievement.borderColor} rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    {achievement.icon}
                    <h3 className="text-xl font-bold text-white ml-3">{achievement.platform}</h3>
                  </div>
                  <a 
                    href={achievement.profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                    aria-label={`Visit ${achievement.platform} profile`}
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
                
                <div className="space-y-4">
                  {achievement.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-gray-400">{stat.label}</span>
                      <span className="text-white font-semibold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-800/50 p-4 border-t border-gray-700">
                <a 
                  href={achievement.profileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors flex items-center justify-center"
                >
                  <span>View Profile</span>
                  <FaExternalLinkAlt className="ml-2 text-sm" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coding Progress Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-800/50 rounded-xl p-8 mb-16 border border-gray-700"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FaCode className="mr-3 text-primary" />
            Coding Journey Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-4">LeetCode Progress</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Easy Problems</span>
                    <span className="text-gray-300">85% completed</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Medium Problems</span>
                    <span className="text-gray-300">60% completed</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Hard Problems</span>
                    <span className="text-gray-300">35% completed</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-300 mb-4">Topic Coverage</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Data Structures</span>
                    <span className="text-gray-300">90% proficiency</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Dynamic Programming</span>
                    <span className="text-gray-300">75% proficiency</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Graph Algorithms</span>
                    <span className="text-gray-300">65% proficiency</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Certifications & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FaTrophy className="mr-3 text-primary" />
            Notable Milestones
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <div 
                key={cert.title}
                className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 hover:bg-gray-800/50 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-white mb-2">{cert.title}</h4>
                <p className="text-primary mb-3 text-sm">{cert.issuer}</p>
                <p className="text-gray-400 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;