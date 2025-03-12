import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section-container">
      <motion.h2 
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        >
        <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
            I'm a dedicated Software Developer currently pursuing a B.Tech in Artificial Intelligence and Machine Learning at M S Ramaiah University of Applied Sciences, Bangalore with a GPA of 8.3/10.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
            With a strong foundation in full-stack development and data-driven solutions, I've successfully developed multiple production-ready applications including a diabetes management system, a weather monitoring platform, and an IEEE paper generator.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
            My passion for problem-solving is reflected in the 350+ coding challenges I've conquered on competitive platforms, bringing algorithmic efficiency to real-world applications. I'm particularly interested in creating applications that blend responsive web design with machine learning techniques.
        </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          <div className="mb-6">
            <h4 className="font-medium">B.Tech in Artificial Intelligence and Machine Learning</h4>
            <p className="text-gray-500 dark:text-gray-400">M S Ramaiah University of Applied Sciences, Bangalore</p>
            <p className="text-gray-500 dark:text-gray-400">2021 - Present | GPA: 8.3/10</p>
          </div>
          
          <h3 className="text-xl font-semibold mb-4">Relevant Coursework</h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
            <li>Advanced Machine Learning</li>
            <li>Data Structures</li>
            <li>Computer Networks</li>
            <li>Database Management</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;