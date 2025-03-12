import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission (this would connect to backend in production)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For demo purposes - in real implementation, you'd send this data to a server
    console.log('Form submitted:', formData);
    
    // Simulate successful submission
    alert('Thanks for your message! I\'ll get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  // Contact details
  const contactDetails = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'aryansalian5678@gmail.com',
      link: 'mailto:aryansalian5678@gmail.com'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '6361801455',
      link: 'tel:+916361801455'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'India',
      link: null
    }
  ];
  
  return (
    <section id="contact" className="py-20 bg-gray-900 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-gray-800/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Contact Me</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I'm currently available for freelance work and full-time positions. 
            Feel free to reach out if you'd like to connect!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Information Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  {contactDetails.map((detail, index) => (
                    <div key={detail.label} className="flex items-start">
                      <div className="text-primary mt-1 mr-4">
                        {detail.icon}
                      </div>
                      <div>
                        <h4 className="text-gray-300 font-medium">{detail.label}</h4>
                        {detail.link ? (
                          <a 
                            href={detail.link} 
                            className="text-gray-400 hover:text-primary transition-colors"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <p className="text-gray-400">{detail.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10">
                  <h4 className="text-gray-300 font-medium mb-4">Connect With Me</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/AryanBV" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors"
                      aria-label="GitHub"
                    >
                      <FaGithub />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/aryan-b-v-78aa63246/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                    <a 
                      href="mailto:aryansalian5678@gmail.com"
                      className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors"
                      aria-label="Email"
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary p-6 text-center">
                <p className="text-white font-medium">Looking forward to working with you!</p>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg h-full">
              <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-400 mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-400 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-400 mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Hello Aryan, I'd like to discuss a project..."
                  ></textarea>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;