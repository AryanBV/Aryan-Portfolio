import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaExternalLinkAlt, 
  FaCertificate, 
  FaCalendarAlt, 
  FaShieldAlt,
  FaSearch,
  FaFilter,
  FaTimes,
  FaThList,
  FaThLarge,
  FaEye
} from 'react-icons/fa';
import { getImagePath } from '../../utils/pathUtils';

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [expandedCert, setExpandedCert] = useState(null);
  
  // Certificate data with added category field
  const certificates = [
    {
      id: 1,
      title: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft",
      issueDate: "December 26, 2024",
      expiryDate: null, // No expiration
      credentialId: "878ECBC7C3BE4794",
      certNumber: "MD46DE-2BDB32",
      description: "Validated knowledge of machine learning and AI concepts, along with related Microsoft Azure services.",
      longDescription: "This certification validates foundational knowledge of machine learning (ML) and artificial intelligence (AI) concepts and related Microsoft Azure services. This certification is intended for candidates with both technical and non-technical backgrounds.",
      image: getImagePath('microsoft-cert.png'),
      category: "cloud",
      status: "active",
      skills: [
        "Artificial Intelligence workloads and considerations",
        "Fundamental principles of machine learning on Azure",
        "Computer vision workloads on Azure",
        "Natural Language Processing (NLP) workloads on Azure",
        "Generative AI workloads on Azure"
      ],
      verifyLink: "https://learn.microsoft.com/en-us/users/aryansalian-4114/credentials/878ecbc7c3be4794",
      featured: true
    },
    {
      id: 2,
      title: "Alpha (DSA with Java)",
      issuer: "Apna College",
      issueDate: "2023",
      expiryDate: null,
      credentialId: "669b551d141788b55c0e3016",
      description: "Comprehensive data structures and algorithms course focusing on implementation using Java.",
      longDescription: "A rigorous program covering fundamental to advanced data structures and algorithmic concepts with Java implementation. The course emphasized problem-solving techniques, algorithmic efficiency, and practical application of theoretical concepts.",
      image: getImagePath('apna-college-cert.png'),
      category: "programming",
      status: "active",
      skills: [
        "Data Structures implementation in Java",
        "Algorithm analysis and design",
        "Problem-solving techniques",
        "Object-Oriented Programming concepts",
        "Optimization strategies"
      ],
      verifyLink: null,
      featured: true
    }
  ];

  // Certificate categories for filtering
  const categories = [
    { id: 'all', label: 'All Certificates' },
    { id: 'featured', label: 'Featured' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'programming', label: 'Programming' },
    { id: 'webdev', label: 'Web Development' }
  ];

  // Filter certificates based on category and search query
  const filteredCertificates = certificates
    .filter(cert => {
      if (activeCategory === 'all') return true;
      if (activeCategory === 'featured') return cert.featured;
      return cert.category === activeCategory;
    })
    .filter(cert => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        cert.title.toLowerCase().includes(query) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.description.toLowerCase().includes(query) ||
        cert.skills.some(skill => skill.toLowerCase().includes(query))
      );
    });

  // Function to get appropriate colors based on certificate category
  const getCertificateStyles = (category) => {
    switch (category) {
      case 'cloud':
        return {
          gradientFrom: 'from-blue-500/10',
          gradientTo: 'to-sky-600/5',
          borderColor: 'border-blue-500/20',
          iconColor: 'text-blue-400'
        };
      case 'ai':
        return {
          gradientFrom: 'from-green-500/10',
          gradientTo: 'to-emerald-600/5',
          borderColor: 'border-green-500/20',
          iconColor: 'text-green-400'
        };
      case 'programming':
        return {
          gradientFrom: 'from-orange-500/10',
          gradientTo: 'to-amber-600/5',
          borderColor: 'border-orange-500/20',
          iconColor: 'text-orange-400'
        };
      case 'webdev':
        return {
          gradientFrom: 'from-purple-500/10',
          gradientTo: 'to-indigo-600/5',
          borderColor: 'border-purple-500/20',
          iconColor: 'text-purple-400'
        };
      default:
        return {
          gradientFrom: 'from-blue-500/10',
          gradientTo: 'to-indigo-600/5',
          borderColor: 'border-blue-500/20',
          iconColor: 'text-primary'
        };
    }
  };

  // Reset search function
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Handle expanded certificate view
  const toggleExpandCert = (id) => {
    setExpandedCert(expandedCert === id ? null : id);
  };

  return (
    <section id="certificates" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Certifications</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional certifications that validate my skills and expertise in various technologies.
          </p>
        </motion.div>
        
        {/* Filter and Search Bar - FIXED ALIGNMENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Category filters */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 w-full sm:w-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`py-2 px-4 rounded-full text-sm transition-all duration-300 flex items-center ${
                    activeCategory === category.id 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {category.id !== 'all' && category.id !== 'featured' && <FaFilter className="mr-2" />}
                  {category.label}
                </button>
              ))}
            </div>
            
            {/* View mode toggle and search - FIXED ALIGNMENT */}
            <div className="flex w-full sm:w-auto items-center">
              <div className="flex bg-gray-800 rounded-l-lg overflow-hidden border-r border-gray-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
                  aria-label="Grid view"
                >
                  <FaThLarge />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
                  aria-label="List view"
                >
                  <FaThList />
                </button>
              </div>
              
              <div className="relative flex-1 min-w-[200px]">
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search certificates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full py-2 pl-10 pr-10 bg-gray-800 border border-l-0 border-gray-700 rounded-r-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    {searchQuery && (
                      <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* No results message */}
        {filteredCertificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/50 rounded-lg p-8 text-center"
          >
            <FaSearch className="mx-auto text-3xl text-gray-500 mb-3" />
            <h3 className="text-xl text-gray-300 mb-2">No certificates found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 text-primary hover:text-primary/80"
            >
              Reset filters
            </button>
          </motion.div>
        )}
        
        {/* Grid View */}
        {viewMode === 'grid' && filteredCertificates.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredCertificates.map((cert, index) => {
              const styles = getCertificateStyles(cert.category);
              
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${styles.gradientFrom} ${styles.gradientTo} ${styles.borderColor} border rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  {/* Certificate Content */}
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-white">
                        {cert.title}
                        {cert.featured && (
                          <span className="ml-2 inline-block bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </h3>
                      <FaCertificate className={`${styles.iconColor} text-xl`} />
                    </div>
                    
                    <div className="mt-2">
                      <p className={`${styles.iconColor} font-medium`}>{cert.issuer}</p>
                      <div className="flex items-center text-gray-400 text-sm mt-1">
                        <FaCalendarAlt className="mr-2" />
                        {cert.issueDate}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mt-3 line-clamp-2">{cert.description}</p>
                    
                    {/* Skills Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {cert.skills.slice(0, 3).map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="bg-gray-800/50 text-gray-300 text-xs px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className="bg-gray-800/50 text-gray-300 text-xs px-2 py-1 rounded">
                          +{cert.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Certificate Image Display - IMPROVED */}
                  {cert.image && (
                    <div className="group relative border-t border-gray-700/30">
                      <div className="relative p-4 flex justify-center">
                        <div className="w-full overflow-hidden rounded-lg shadow-md border border-gray-700/50">
                          <img 
                            src={cert.image} 
                            alt={`${cert.title} Certificate`} 
                            className="w-full h-auto object-contain bg-gray-900/50"
                          />
                        </div>
                        
                        {/* Overlay with view details button */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button
                            onClick={() => toggleExpandCert(cert.id)}
                            className="bg-primary text-white py-2 px-4 rounded-lg flex items-center transform scale-90 group-hover:scale-100 transition-transform duration-300"
                          >
                            <FaEye className="mr-2" />
                            View Certificate
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Certificate Footer */}
                  <div className="bg-gray-800/50 p-4 flex justify-between items-center">
                    <button
                      onClick={() => toggleExpandCert(cert.id)}
                      className="text-primary hover:text-primary/80 text-sm font-medium transition-colors flex items-center"
                    >
                      View Details
                      <FaSearch className="ml-1" />
                    </button>
                    
                    {cert.verifyLink && (
                      <a
                        href={cert.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors flex items-center text-sm"
                      >
                        Verify
                        <FaExternalLinkAlt className="ml-1 text-xs" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
        
        {/* List View */}
        {viewMode === 'list' && filteredCertificates.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {filteredCertificates.map((cert, index) => {
              const styles = getCertificateStyles(cert.category);
              
              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} ${styles.borderColor} border rounded-lg overflow-hidden shadow-lg`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Certificate Image (improved) */}
                    {cert.image && (
                      <div 
                        className="md:w-56 p-3 flex-shrink-0 group relative cursor-pointer"
                        onClick={() => toggleExpandCert(cert.id)}
                      >
                        <div className="h-full w-full overflow-hidden rounded-lg border border-gray-700/50 shadow-md bg-gray-900/50">
                          <img 
                            src={cert.image} 
                            alt={`${cert.title} Certificate`} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-primary text-white py-1 px-3 rounded text-sm">
                            View
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Certificate Content */}
                    <div className="flex-1 p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-white flex items-center">
                            {cert.title}
                            {cert.featured && (
                              <span className="ml-2 inline-block bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                                Featured
                              </span>
                            )}
                          </h3>
                          <p className={`${styles.iconColor} font-medium mt-1`}>{cert.issuer}</p>
                        </div>
                        <FaCertificate className={`${styles.iconColor} text-xl`} />
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-gray-400">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          Issued: {cert.issueDate}
                        </div>
                        
                        {cert.credentialId && (
                          <div className="flex items-center">
                            <FaShieldAlt className="mr-1" />
                            ID: {cert.credentialId}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-300 mt-3">{cert.description}</p>
                      
                      {/* Skills Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {cert.skills.slice(0, 5).map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="bg-gray-800/50 text-gray-300 text-xs px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 5 && (
                          <span className="bg-gray-800/50 text-gray-300 text-xs px-2 py-1 rounded">
                            +{cert.skills.length - 5} more
                          </span>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-4">
                        <button
                          onClick={() => toggleExpandCert(cert.id)}
                          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors flex items-center"
                        >
                          View Details
                          <FaSearch className="ml-1" />
                        </button>
                        
                        {cert.verifyLink && (
                          <a
                            href={cert.verifyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors flex items-center text-sm"
                          >
                            Verify Certificate
                            <FaExternalLinkAlt className="ml-1 text-xs" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
        
        {/* Certificate Detail Modal */}
        {expandedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setExpandedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal content */}
              {(() => {
                const cert = filteredCertificates.find(c => c.id === expandedCert) || 
                             certificates.find(c => c.id === expandedCert);
                if (!cert) return null;
                
                const styles = getCertificateStyles(cert.category);
                
                return (
                  <>
                    {/* Certificate Header */}
                    <div className={`bg-gradient-to-r ${styles.gradientFrom} ${styles.gradientTo} p-6 relative`}>
                      <button 
                        onClick={() => setExpandedCert(null)}
                        className="absolute top-4 right-4 text-white bg-black/30 hover:bg-black/50 rounded-full p-2 transition-colors"
                        aria-label="Close"
                      >
                        <FaTimes />
                      </button>
                      
                      <div className="flex items-start gap-4">
                        <FaCertificate className={`${styles.iconColor} text-3xl mt-1`} />
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {cert.title}
                            {cert.featured && (
                              <span className="ml-2 inline-block bg-primary/30 text-white text-xs px-2 py-1 rounded-full">
                                Featured
                              </span>
                            )}
                          </h3>
                          <p className="text-xl text-gray-200 font-medium mt-1">{cert.issuer}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Certificate Body (scrollable) */}
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left column: Details */}
                        <div>
                          <div className="mb-6">
                            <h4 className="text-white font-medium mb-2">Description</h4>
                            <p className="text-gray-300">{cert.longDescription || cert.description}</p>
                          </div>
                          
                          <div className="mb-6">
                            <h4 className="text-white font-medium mb-3">Certificate Details</h4>
                            <div className="bg-gray-900/70 rounded-lg p-4 space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Issue Date:</span>
                                <span className="text-gray-300">{cert.issueDate}</span>
                              </div>
                              
                              {cert.expiryDate && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Expiry Date:</span>
                                  <span className="text-gray-300">{cert.expiryDate}</span>
                                </div>
                              )}
                              
                              <div className="flex justify-between">
                                <span className="text-gray-400">Credential ID:</span>
                                <span className="text-gray-300 font-mono">{cert.credentialId}</span>
                              </div>
                              
                              {cert.certNumber && (
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Certificate Number:</span>
                                  <span className="text-gray-300 font-mono">{cert.certNumber}</span>
                                </div>
                              )}
                              
                              <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                <span className="text-green-400">
                                  {cert.status === 'active' ? 'Active' : 'Expired'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-white font-medium mb-3">Skills Validated</h4>
                            <div className="flex flex-wrap gap-2">
                              {cert.skills.map((skill, idx) => (
                                <span 
                                  key={idx} 
                                  className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-md"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Right column: Certificate image */}
                        <div>
                          {cert.image ? (
                            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                              <div className="overflow-hidden rounded-lg shadow-md border border-gray-700/70">
                                <img 
                                  src={cert.image} 
                                  alt={`${cert.title} Certificate`} 
                                  className="w-full h-auto"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center bg-gray-900/50 rounded-lg border border-gray-700">
                              <div className="text-center p-8">
                                <FaCertificate className="text-5xl text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">Certificate image not available</p>
                              </div>
                            </div>
                          )}
                          
                          {cert.verifyLink && (
                            <div className="mt-4 flex items-center justify-center bg-blue-900/20 rounded-lg p-3 border border-blue-500/30">
                              <FaShieldAlt className="text-primary mr-2" />
                              <span className="text-sm text-gray-300">This certificate can be verified online</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Certificate Actions */}
                    <div className="bg-gray-900 border-t border-gray-700 p-4 flex flex-wrap gap-3 justify-end">
                      {cert.verifyLink && (
                        <a 
                          href={cert.verifyLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                        >
                          <FaExternalLinkAlt className="mr-2" />
                          Verify Certificate
                        </a>
                      )}
                      
                      <button
                        onClick={() => setExpandedCert(null)}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
        
        {/* Certificate Stats */}
        {filteredCertificates.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 bg-gray-800/30 rounded-xl p-6 border border-gray-700/30"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{filteredCertificates.length}</div>
                <div className="text-gray-400 text-sm">Showing Certifications</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{certificates.length}</div>
                <div className="text-gray-400 text-sm">Total Certifications</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {filteredCertificates.filter(cert => cert.featured).length}
                </div>
                <div className="text-gray-400 text-sm">Featured Credentials</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {new Set(filteredCertificates.map(cert => cert.issuer)).size}
                </div>
                <div className="text-gray-400 text-sm">Certification Bodies</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Certificates;