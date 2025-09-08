// GitHub API Service - No authentication needed for public data
const GITHUB_API_BASE = 'https://api.github.com';
const USERNAME = 'AryanBV'; // Your GitHub username

export const githubService = {
  // Fetch user profile
  async getProfile() {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/users/${USERNAME}`);
      if (!response.ok) throw new Error('Failed to fetch profile');
      return await response.json();
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
      return null;
    }
  },

  // Fetch repositories
  async getRepos(options = {}) {
    const { sort = 'updated', per_page = 100 } = options;
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${USERNAME}/repos?sort=${sort}&per_page=${per_page}`
      );
      if (!response.ok) throw new Error('Failed to fetch repos');
      return await response.json();
    } catch (error) {
      console.error('Error fetching repos:', error);
      return [];
    }
  },

  // Fetch repository languages
  async getRepoLanguages(repoName) {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${USERNAME}/${repoName}/languages`
      );
      if (!response.ok) throw new Error('Failed to fetch languages');
      return await response.json();
    } catch (error) {
      console.error('Error fetching languages:', error);
      return {};
    }
  },

  // Calculate aggregated stats
  async getStats() {
    try {
      const [profile, repos] = await Promise.all([
        this.getProfile(),
        this.getRepos()
      ]);

      if (!profile || !repos) return null;

      // Calculate total stars
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      
      // Calculate total forks
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
      
      // Get language statistics
      const languageStats = {};
      
      // Only process top 10 repos to avoid too many API calls
      const topRepos = repos.slice(0, 10);
      for (const repo of topRepos) {
        const languages = await this.getRepoLanguages(repo.name);
        Object.entries(languages).forEach(([lang, bytes]) => {
          languageStats[lang] = (languageStats[lang] || 0) + bytes;
        });
      }
      
      // Convert to percentages
      const totalBytes = Object.values(languageStats).reduce((a, b) => a + b, 0);
      const languagePercentages = Object.entries(languageStats)
        .map(([lang, bytes]) => ({
          name: lang,
          percentage: Math.round((bytes / totalBytes) * 100),
          bytes
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 5); // Top 5 languages

      return {
        profile: {
          avatar_url: profile.avatar_url,
          name: profile.name,
          bio: profile.bio,
          followers: profile.followers,
          following: profile.following,
          public_repos: profile.public_repos,
          created_at: profile.created_at
        },
        stats: {
          totalStars,
          totalForks,
          totalRepos: repos.length,
          languages: languagePercentages
        },
        repos: repos.slice(0, 6) // Latest 6 repos
      };
    } catch (error) {
      console.error('Error calculating stats:', error);
      return null;
    }
  },

  // Fetch contribution data
  async getContributions() {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/users/${USERNAME}/events/public?per_page=100`
      );
      if (!response.ok) throw new Error('Failed to fetch events');
      const events = await response.json();
      
      // Generate contribution data for the last year
      const contributions = [];
      const today = new Date();
      
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Count events for this date
        const count = events.filter(event => 
          event.created_at.startsWith(dateStr)
        ).length;
        
        contributions.push({
          date: dateStr,
          count: Math.min(count, 4), // Cap at 4 for visualization
          day: date.getDay()
        });
      }
      
      return contributions;
    } catch (error) {
      console.error('Error fetching contributions:', error);
      return [];
    }
  }
};