import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaCertificate, FaCalendarAlt, FaShieldAlt } from 'react-icons/fa';
import { getImagePath } from '../../utils/pathUtils';

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft",
      issueDate: "December 26, 2024",
      credentialId: "878ECBC7C3BE4794",
      certNumber: "MD46DE-2BDB32",
      description: "Validated knowledge of machine learning and AI concepts, along with related Microsoft Azure services.",
      image: getImagePath('microsoft-cert.png'),
      skills: [
        "Artificial Intelligence workloads and considerations",
        "Fundamental principles of machine learning on Azure",
        "Computer vision workloads on Azure",
        "Natural Language Processing (NLP) workloads on Azure",
        "Generative AI workloads on Azure"
      ],
      verifyLink: "https://learn.microsoft.com/en-us/users/aryansalian-4114/credentials/878ecbc7c3be4794"
    },
    {
      id: 2,
      title: "Alpha (DSA with Java)",
      issuer: "Apna College",
      issueDate: "2023",
      credentialId: "669b551d141788b55c0e3016",
      description: "Comprehensive data structures and algorithms course focusing on implementation using Java.",
      image: getImagePath('apna-college-cert.png'),
      skills: [
        "Data Structures implementation in Java",
        "Algorithm analysis and design",
        "Problem-solving techniques",
        "Object-Oriented Programming concepts",
        "Optimization strategies"
      ],
      verifyLink: null
    }
  ];

  return (
    <section id="certificates" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Certifications</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional certifications that validate my skills and knowledge in various technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-500/10 to-indigo-600/5 border border-blue-500/20 rounded-xl overflow-hidden shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                  <FaCertificate className="text-primary text-xl" />
                </div>

                <div className="mb-4">
                  <div className="text-primary font-medium">{cert.issuer}</div>
                  <div className="flex items-center text-gray-400 text-sm mt-1">
                    <FaCalendarAlt className="mr-2" />
                    {cert.issueDate}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300">{cert.description}</p>
                </div>

                {cert.credentialId && (
                  <div className="bg-gray-800/70 rounded-lg p-3 mb-4 text-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-400">Credential ID:</span>
                      <span className="text-gray-300 font-mono">{cert.credentialId}</span>
                    </div>
                    {cert.certNumber && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Certificate Number:</span>
                        <span className="text-gray-300 font-mono">{cert.certNumber}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {cert.verifyLink && (
                  <div className="mb-4 flex items-center bg-blue-900/20 rounded-lg p-2 border border-blue-500/30">
                    <FaShieldAlt className="text-primary mr-2" />
                    <span className="text-sm text-gray-300">This certificate can be verified online</span>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-white text-sm font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="bg-gray-700/70 text-gray-300 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  {cert.verifyLink && (
                    <a 
                      href={cert.verifyLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors flex items-center text-sm"
                    >
                      <span>Verify Certificate</span>
                      <FaExternalLinkAlt className="ml-2 text-xs" />
                    </a>
                  )}
                </div>
              </div>

              {cert.image && (
                <div className="relative h-48 overflow-hidden border-t border-gray-700/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
                  <img 
                    src={cert.image} 
                    alt={`${cert.title} Certificate`} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;