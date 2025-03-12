const Achievements = () => {
    return (
      <section id="achievements" className="section-container bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-8">Achievements</h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-2">Technical Proficiency</h3>
              <ul className="space-y-4 list-disc list-inside text-gray-600 dark:text-gray-400">
                <li>Attained a LeetCode contest rating of 1494 and solved 180+ problems with a 160+ day streak</li>
                <li>Secured a GeeksForGeeks contest rating of 1702 with a coding score of 1150+ after solving 375+ algorithmic challenges</li>
                <li>Contributed 200+ times to projects across 20+ GitHub repositories</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Achievements;