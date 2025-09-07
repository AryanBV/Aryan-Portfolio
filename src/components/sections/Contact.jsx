import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { 
  FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin,
  FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaSpinner,
  FaWhatsapp, FaTelegram, FaDiscord, FaClock, FaGlobe
} from 'react-icons/fa';
// import emailjs from '@emailjs/browser'; // npm install @emailjs/browser

const EnhancedContact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    urgency: 'normal'
  });
  
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });
  
  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  
  // Validate form fields
  const validateField = (name, value) => {
    switch(name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email' : '';
      case 'subject':
        return value.length < 5 ? 'Subject must be at least 5 characters' : '';
      case 'message':
        return value.length < 20 ? 'Message must be at least 20 characters' : '';
      default:
        return '';
    }
  };
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if field was touched
    if (touchedFields[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };
  
  // Handle field blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'urgency') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouchedFields({
        name: true,
        email: true,
        subject: true,
        message: true
      });
      return;
    }
    
    setFormStatus({ loading: true, success: false, error: false, message: '' });
    
    // EmailJS Integration (uncomment and configure)
    /*
    try {
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      
      setFormStatus({
        loading: false,
        success: true,
        error: false,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        urgency: 'normal'
      });
      setTouchedFields({});
      setErrors({});
    } catch (error) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Failed to send message. Please try again or contact me directly.'
      });
    }
    */
    
    // Simulate success for demo
    setTimeout(() => {
      setFormStatus({
        loading: false,
        success: true,
        error: false,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          urgency: 'normal'
        });
        setFormStatus({ loading: false, success: false, error: false, message: '' });
        setTouchedFields({});
        setErrors({});
      }, 3000);
    }, 2000);
  };
  
  // Contact information
  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'aryansalian5678@gmail.com',
      link: 'mailto:aryansalian5678@gmail.com',
      color: 'text-blue-400'
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+91 6361801455',
      link: 'tel:+916361801455',
      color: 'text-green-400'
    },
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp',
      value: '+91 6361801455',
      link: 'https://wa.me/916361801455',
      color: 'text-green-500'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Bangalore, India',
      link: null,
      color: 'text-red-400'
    },
    {
      icon: <FaClock />,
      label: 'Time Zone',
      value: 'IST (UTC+5:30)',
      link: null,
      color: 'text-yellow-400'
    }
  ];
  
  // Social links
  const socialLinks = [
    { icon: <FaGithub />, link: 'https://github.com/AryanBV', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: <FaLinkedin />, link: 'https://www.linkedin.com/in/aryan-b-v-78aa63246/', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: <FaDiscord />, link: '#', label: 'Discord', color: 'hover:text-indigo-400' },
    { icon: <FaTelegram />, link: '#', label: 'Telegram', color: 'hover:text-blue-500' }
  ];
  
  return (
    <section id="contact" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse animation-delay-2000" />
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
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Contact Cards */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3"
                  >
                    <div className={`${item.color} text-xl`}>{item.icon}</div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm">{item.label}</p>
                      {item.link ? (
                        <a href={item.link} className="text-white hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Social Links */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
              <div className="grid grid-cols-4 gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-gray-800/50 p-3 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 border border-gray-700/50 hover:border-primary/30`}
                    aria-label={social.label}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/30"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                </div>
                <div>
                  <p className="text-white font-medium">Currently Available</p>
                  <p className="text-gray-400 text-sm">Response time: Within 24 hours</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-gray-400 mb-2">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-gray-800/50 border ${
                        errors.name ? 'border-red-500' : 'border-gray-700/50'
                      } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>
                  
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-gray-400 mb-2">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-gray-800/50 border ${
                        errors.email ? 'border-red-500' : 'border-gray-700/50'
                      } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>
                
                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-gray-400 mb-2">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-gray-800/50 border ${
                      errors.subject ? 'border-red-500' : 'border-gray-700/50'
                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                    placeholder="Project Collaboration"
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </div>
                
                {/* Urgency Selector */}
                <div>
                  <label className="block text-gray-400 mb-2">Priority</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['normal', 'urgent', 'low'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, urgency: level }))}
                        className={`py-2 px-4 rounded-xl capitalize transition-all ${
                          formData.urgency === level
                            ? level === 'urgent' 
                              ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                              : level === 'normal'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                              : 'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                            : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-gray-600'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-gray-400 mb-2">
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows="5"
                    className={`w-full bg-gray-800/50 border ${
                      errors.message ? 'border-red-500' : 'border-gray-700/50'
                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.message ? (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm"
                      >
                        {errors.message}
                      </motion.p>
                    ) : (
                      <span></span>
                    )}
                    <span className="text-gray-500 text-sm">
                      {formData.message.length}/500
                    </span>
                  </div>
                </div>
                
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formStatus.loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                    formStatus.loading
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-blue-500 hover:shadow-lg hover:shadow-primary/30'
                  } text-white`}
                >
                  {formStatus.loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
              
              {/* Status Messages */}
              <AnimatePresence>
                {formStatus.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mt-4 p-4 rounded-xl flex items-center space-x-3 ${
                      formStatus.success
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-red-500/10 border border-red-500/30'
                    }`}
                  >
                    {formStatus.success ? (
                      <FaCheckCircle className="text-green-500 text-xl" />
                    ) : (
                      <FaExclamationCircle className="text-red-500 text-xl" />
                    )}
                    <p className={formStatus.success ? 'text-green-400' : 'text-red-400'}>
                      {formStatus.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContact;