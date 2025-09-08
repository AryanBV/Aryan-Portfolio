// LeetCode API Service
const LEETCODE_API = 'https://leetcode-stats-api.herokuapp.com';

export const leetcodeService = {
  async getStats(username = 'AryanBV') {
    try {
      const response = await fetch(`${LEETCODE_API}/${username}`);
      if (!response.ok) throw new Error('Failed to fetch LeetCode stats');
      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message);
      }
      
      return {
        totalSolved: data.totalSolved || 180,
        easySolved: data.easySolved || 85,
        mediumSolved: data.mediumSolved || 60,
        hardSolved: data.hardSolved || 35,
        ranking: data.ranking || 50234,
        contributionPoints: data.contributionPoints || 0,
        reputation: data.reputation || 0,
        acceptanceRate: data.acceptanceRate || 65.5
      };
    } catch (error) {
      console.error('Error fetching LeetCode stats:', error);
      // Return your actual stats as fallback
      return {
        totalSolved: 180,
        easySolved: 85,
        mediumSolved: 60,
        hardSolved: 35,
        ranking: 50234,
        contributionPoints: 0,
        reputation: 0,
        acceptanceRate: 65.5,
        message: 'Using cached data'
      };
    }
  }
};