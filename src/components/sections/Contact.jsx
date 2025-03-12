const Contact = () => {
    return (
      <section id="contact" className="section-container">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        <div className="max-w-md mx-auto">
          <div className="card p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
              I'm currently available for freelance work and full-time positions. 
              Feel free to reach out if you'd like to connect!
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:aryansalian5678@gmail.com" className="text-primary hover:underline">
                  aryansalian5678@gmail.com
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">
                  India
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">
                  6361801455
                </span>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="mailto:aryansalian5678@gmail.com" 
                className="btn-primary inline-block"
              >
                Send Message
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Contact;