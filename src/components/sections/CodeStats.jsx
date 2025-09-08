import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaGithub, FaCode, FaCodeBranch, FaStar, FaCalendarAlt,
  FaFire, FaTrophy, FaChartLine, FaClock, FaUsers, FaSpinner
} from 'react-icons/fa';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';
import { githubService } from '../../services/githubService';
import { leetcodeService } from '../../services/leetcodeService';

const CodeStats = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('github');
  const [githubData, setGithubData] = useState(null);
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [contributionData, setContributionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch GitHub data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [stats, contributions] = await Promise.all([
          githubService.getStats(),
          githubService.getContributions()
        ]);
        
        if (stats) {
          setGithubData(stats);
        }
        
        if (contributions) {
          setContributionData(contributions);
        }
      } catch (err) {
        setError('Failed to fetch GitHub data');
        console.error('GitHub fetch error:', err);
      }
    };
    
    fetchGitHubData();
  }, []);
  
  // Fetch LeetCode data
  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        const stats = await leetcodeService.getStats();
        setLeetcodeData(stats);
      } catch (err) {
        console.error('LeetCode fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeetCodeData();
  }, []);
  
  // Helper function for language colors
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#F7DF1E',
      TypeScript: '#3178C6',
      Python: '#3776AB',
      Java: '#007396',
      HTML: '#E34C26',
      CSS: '#1572B6',
      'C++': '#00599C',
      C: '#A8B9CC',
      Shell: '#89E051',
      Vue: '#4FC08D',
      React: '#61DAFB',
      // Add more as needed
    };
    return colors[language] || '#808080';
  };
  
  // Platform configurations
  const platforms = [
    {
      id: 'github',
      name: 'GitHub',
      icon: <FaGithub />,
      color: '#181717'
    },
    {
      id: 'leetcode',
      name: 'LeetCode',
      icon: <SiLeetcode />,
      color: '#FFA116'
    },
    {
      id: 'geeksforgeeks',
      name: 'GeeksforGeeks',
      icon: <SiGeeksforgeeks />,
      color: '#2F8D46'
    }
  ];
  
  // Contribution levels for heatmap
  const getContributionColor = (count) => {
    if (count === 0) return 'bg-gray-800';
    if (count === 1) return 'bg-green-900';
    if (count === 2) return 'bg-green-700';
    if (count === 3) return 'bg-green-500';
    return 'bg-green-400';
  };
  
  // Weekly activity data (mock for now, can be calculated from real data)
  const weeklyActivity = [
    { day: 'Mon', commits: 12, hours: 3 },
    { day: 'Tue', commits: 8, hours: 2 },
    { day: 'Wed', commits: 15, hours: 4 },
    { day: 'Thu', commits: 20, hours: 5 },
    { day: 'Fri', commits: 18, hours: 4.5 },
    { day: 'Sat', commits: 10, hours: 3 },
    { day: 'Sun', commits: 5, hours: 1.5 }
  ];
  
  const maxCommits = Math.max(...weeklyActivity.map(d => d.commits));
  
  if (loading) {
    return (
      <section id="codestats" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <FaSpinner className="animate-spin text-4xl text-primary" />
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="codestats" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse animation-delay-2000" />
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
            Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Statistics</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            My coding journey across different platforms and contributions
          </p>
        </motion.div>
        
        {/* Platform Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-4 mb-10"
        >
          {platforms.map((platform) => (
            <motion.button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedPlatform === platform.id
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-gray-800/30 backdrop-blur-sm text-gray-400 hover:text-white border border-gray-700/50'
              }`}
              style={{
                borderColor: selectedPlatform === platform.id ? platform.color : undefined,
                boxShadow: selectedPlatform === platform.id ? `0 0 20px ${platform.color}40` : undefined
              }}
            >
              <span className="text-xl" style={{ color: platform.color }}>
                {platform.icon}
              </span>
              <span>{platform.name}</span>
            </motion.button>
          ))}
        </motion.div>
        
        {/* GitHub Section */}
        {selectedPlatform === 'github' && (
          <>
            {/* GitHub Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10"
            >
              {[
                { 
                  label: 'Repositories', 
                  value: githubData?.profile?.public_repos || 0, 
                  icon: <FaCodeBranch />, 
                  color: 'text-blue-400' 
                },
                { 
                  label: 'Stars Earned', 
                  value: githubData?.stats?.totalStars || 0, 
                  icon: <FaStar />, 
                  color: 'text-yellow-400' 
                },
                { 
                  label: 'Total Forks', 
                  value: githubData?.stats?.totalForks || 0, 
                  icon: <FaCodeBranch />, 
                  color: 'text-green-400' 
                },
                { 
                  label: 'Followers', 
                  value: githubData?.profile?.followers || 0, 
                  icon: <FaUsers />, 
                  color: 'text-purple-400' 
                },
                { 
                  label: 'Following', 
                  value: githubData?.profile?.following || 0, 
                  icon: <FaUsers />, 
                  color: 'text-pink-400' 
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50"
                >
                  <div className={`text-2xl mb-2 ${stat.color}`}>{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Contribution Graph - Simplified */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 mb-10"
            >
              <h3 className="text-white font-medium mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-green-400" />
                Contribution Activity
              </h3>
              
              {contributionData.length > 0 ? (
                <>
                  {/* Contribution heatmap */}
                  <div className="overflow-x-auto">
                    <div className="grid grid-flow-col gap-1 min-w-max">
                      {Array.from({ length: 52 }, (_, weekIndex) => (
                        <div key={weekIndex} className="grid grid-rows-7 gap-1">
                          {Array.from({ length: 7 }, (_, dayIndex) => {
                            const dataIndex = weekIndex * 7 + dayIndex;
                            const contribution = contributionData[dataIndex];
                            return contribution ? (
                              <div
                                key={`${weekIndex}-${dayIndex}`}
                                className={`w-3 h-3 rounded-sm ${getContributionColor(contribution.count)} hover:ring-2 hover:ring-gray-600 cursor-pointer`}
                                title={`${contribution.date}: ${contribution.count} contributions`}
                              />
                            ) : (
                              <div key={`${weekIndex}-${dayIndex}`} className="w-3 h-3" />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-400 text-xs">Less</span>
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map(level => (
                        <div key={level} className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`} />
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs">More</span>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p className="mb-2">Contribution graph requires authentication</p>
                  <p className="text-sm">Visit GitHub to see full contribution history</p>
                </div>
              )}
            </motion.div>
            
            {/* Language Distribution */}
            {githubData?.stats?.languages && githubData.stats.languages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Language Stats */}
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-white font-medium mb-4">Most Used Languages</h3>
                  <div className="space-y-4">
                    {githubData.stats.languages.map((lang, index) => (
                      <div key={lang.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-300">{lang.name}</span>
                          <span className="text-gray-400 text-sm">{lang.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${lang.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: getLanguageColor(lang.name) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Weekly Activity */}
                <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                  <h3 className="text-white font-medium mb-4">Weekly Activity</h3>
                  <div className="flex items-end justify-between h-32">
                    {weeklyActivity.map((day, index) => (
                      <div key={day.day} className="flex-1 flex flex-col items-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(day.commits / maxCommits) * 100}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="w-8 bg-gradient-to-t from-primary to-blue-400 rounded-t-sm"
                        />
                        <span className="text-gray-400 text-xs mt-2">{day.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
        
        {/* LeetCode Section */}
        {selectedPlatform === 'leetcode' && leetcodeData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Problem Stats */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-white font-medium mb-6 flex items-center">
                <SiLeetcode className="mr-2 text-yellow-500" />
                Problem Solving Stats
              </h3>
              
              {/* Circular Progress */}
              <div className="flex justify-center mb-6">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="rgba(55, 65, 81, 0.5)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="#FFA116"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={553}
                      strokeDashoffset={553 - (553 * leetcodeData.totalSolved) / 1000}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold text-white">{leetcodeData.totalSolved}</div>
                    <div className="text-gray-400 text-sm">Problems Solved</div>
                  </div>
                </div>
              </div>
              
              {/* Difficulty Breakdown */}
              <div className="space-y-3">
                {[
                  { level: 'Easy', solved: leetcodeData.easySolved, total: 100, color: 'bg-green-500' },
                  { level: 'Medium', solved: leetcodeData.mediumSolved, total: 100, color: 'bg-yellow-500' },
                  { level: 'Hard', solved: leetcodeData.hardSolved, total: 100, color: 'bg-red-500' }
                ].map((item) => (
                  <div key={item.level}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">{item.level}</span>
                      <span className="text-gray-400 text-sm">{item.solved}</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.solved / item.total) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contest Stats */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-white font-medium mb-6">Contest Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-yellow-500 text-2xl mb-1"><FaTrophy /></div>
                  <div className="text-2xl font-bold text-white">1494</div>
                  <div className="text-gray-400 text-sm">Contest Rating</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-blue-500 text-2xl mb-1"><FaChartLine /></div>
                  <div className="text-2xl font-bold text-white">#{leetcodeData.ranking}</div>
                  <div className="text-gray-400 text-sm">Global Ranking</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-green-500 text-2xl mb-1"><FaFire /></div>
                  <div className="text-2xl font-bold text-white">160+</div>
                  <div className="text-gray-400 text-sm">Day Streak</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-purple-500 text-2xl mb-1"><FaCalendarAlt /></div>
                  <div className="text-2xl font-bold text-white">{leetcodeData.acceptanceRate}%</div>
                  <div className="text-gray-400 text-sm">Acceptance</div>
                </div>
              </div>
              
              {leetcodeData.message && (
                <div className="mt-4 text-yellow-400 text-sm text-center">
                  {leetcodeData.message}
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* GeeksforGeeks Section */}
        {selectedPlatform === 'geeksforgeeks' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { label: 'Contest Rating', value: '1702', icon: <FaTrophy />, color: 'text-green-400' },
              { label: 'Coding Score', value: '1150+', icon: <FaCode />, color: 'text-blue-400' },
              { label: 'Problems Solved', value: '375+', icon: <FaChartLine />, color: 'text-purple-400' },
              { label: 'Monthly Score', value: '234', icon: <FaCalendarAlt />, color: 'text-yellow-400' },
              { label: 'Institute Rank', value: 'Top 5', icon: <FaUsers />, color: 'text-pink-400' },
              { label: 'Current Streak', value: '89 days', icon: <FaFire />, color: 'text-orange-400' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
              >
                <div className={`text-3xl mb-3 ${stat.color}`}>{stat.icon}</div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="text-center py-8">
            <p className="text-yellow-400">Note: Some data may be cached due to API limitations</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CodeStats;