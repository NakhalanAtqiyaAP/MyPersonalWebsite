import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MyProfileImage from '../assets/Profile/myprofile2.jpg';
import CV from '../assets/nakhalanatqiya_CV.pdf';
import { 
  FaGamepad, 
  FaCode, 
  FaMusic, 
  FaBook, 
  FaCamera, 
  FaPalette,
  FaGithub,
  FaWhatsapp,
  FaLinkedin,
  FaEnvelope,
  FaTimes,
  FaInstagram,
  FaMedium
} from 'react-icons/fa';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const hobbies = [
    { icon: <FaGamepad className="text-lg" />, name: "Gaming", color: "bg-red-100 text-red-600" },
    { icon: <FaPalette className="text-lg" />, name: "Painting", color: "bg-blue-100 text-blue-600" },
    { icon: <FaMusic className="text-lg" />, name: "Music", color: "bg-yellow-100 text-yellow-600" },
    { icon: <FaBook className="text-lg" />, name: "Reading", color: "bg-green-100 text-green-600" },
    { icon: <FaCamera className="text-lg" />, name: "Photography", color: "bg-purple-100 text-purple-600" },
    { icon: <FaCode className="text-lg" />, name: "Coding", color: "bg-lime-100 text-lime-600" },
  ];

  const socialLinks = [
    {
      icon: <FaGithub className="text-2xl" />,
      name: "GitHub",
      url: "https://github.com/NakhalanAtqiyaAP",
      color: "bg-gray-800 hover:bg-gray-900"
    },
    {
      icon: <FaInstagram className="text-2xl" />,
      name: "Instagram",
      url: "https://www.instagram.com/orangejahad/",
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      name: "Email",
      url: "mailto:nakhalanatqiyaarifin@gmail.com",
      color: "bg-red-500 hover:bg-red-600"
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      name: "WhatsApp",
      url: "https://wa.me/6285715383055",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/nakhalan-atqiya-arifin-putra-4b5b082a3/",
      color: "bg-blue-700 hover:bg-blue-800"
    },
    {
      icon: <FaMedium className="text-2xl" />,
      name: "Medium",
      url: "https://medium.com/@nakhalanatqiya",
      color: "bg-gray-900 hover:bg-gray-800"
    }
  ];

  const ProgressBar = ({ color, targetWidth, duration = 1500 }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = parseInt(targetWidth, 10);
      if (start === end) return;

      let stepTime = duration / end;

      const timer = setInterval(() => {
        start += 1;
        setWidth(start);
        if (start >= end) clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    }, [targetWidth, duration]);

    return (
      <div className="w-full bg-gray-200 h-2 pixel-border mt-2 overflow-hidden">
        <div
          className={`${color} h-full transition-all duration-200`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    );
  };

  const AboutMeTyping = ({ text, speed = 30 }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);

      return () => clearInterval(interval);
    }, [text, speed]);

    return (
      <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
        {displayedText}
        <span className="animate-pulse">|</span>
      </p>
    );
  };

  const Counter = ({ target, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = parseInt(target.replace(/\D/g, ""), 10); 
      if (start === end) return;

      let totalMilSecDur = parseInt(duration);
      let incrementTime = (totalMilSecDur / end);

      let timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }, [target, duration]);

    return (
      <span>
        {count}
        {target.includes("+") && "+"}
      </span>
    );
  };

  // Contact Modal Component
  const ContactModal = () => {
    return (
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white pixel-border p-6 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button 
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes className="text-xl" />
              </motion.button>
              
              <h3 className="text-xl font-bold text-gray-800 mb-6 pixel-font text-center">
                GET IN TOUCH
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${social.color} text-white pixel-border p-4 flex flex-col items-center justify-center transition-colors rounded-none`}
                  >
                    {social.icon}
                    <span className="mt-2 text-sm">{social.name}</span>
                  </motion.a>
                ))}
              </div>
              
              <motion.div 
                className="mt-6 pt-4 border-t border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-center text-gray-600 text-sm">
                  Feel free to reach out! I'm always open to discussing new projects and opportunities.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <section id="profile" className="py-8 md:py-12 px-4 pixel-grid min-h-screen flex items-center">
      <div className="container mx-auto max-w-5xl fade-in">
        <div className="pixel-border bg-white p-6 md:p-8 lg:p-10 relative">
          {/* Pixel corners */}
          <div className="absolute top-0 left-0 w-3 h-3 bg-blue-600"></div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-blue-600"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-blue-600"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-600"></div>
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 md:gap-10 lg:gap-12">
            {/* Avatar Section */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 pixel-border bg-gray-100 overflow-hidden relative mb-4 group">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <img 
                    src={MyProfileImage} 
                    alt="Nakhalan Atqiya Arifin Putra" 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:animate-pixelate"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              </div>
              
              {/* Hobbies Section */}
              <div className="bg-blue-50 pixel-border p-4 w-full max-w-xs mb-4">
                <h4 className="text-sm font-semibold text-blue-800 mb-3 pixel-font text-center">HOBBIES & INTERESTS</h4>
                <div className="grid grid-cols-2 gap-3">
                  {hobbies.map((hobby, index) => (
                    <div key={index} className={`flex flex-col items-center justify-center p-2 pixel-border ${hobby.color}`}>
                      <div className="mb-1">{hobby.icon}</div>
                      <span className="text-xs font-medium">{hobby.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-white pixel-border p-5 w-full max-w-xs shadow-lg">
                <h4 className="text-sm font-semibold text-gray-800 mb-4 pixel-font text-center border-b border-gray-200 pb-2">
                  ACHIEVEMENTS
                </h4>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-blue-50 pixel-border hover:bg-blue-100 transition-colors">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 mr-2"></div>
                      <span className="text-xs text-gray-700">Projects</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600 pixel-font">
                      <Counter target="8+" />
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-purple-50 pixel-border hover:bg-purple-100 transition-colors">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 mr-2"></div>
                      <span className="text-xs text-gray-700">Experience</span>
                    </div>
                    <span className="text-lg font-bold text-purple-600 pixel-font">
                      <Counter target="3+" />
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-green-50 pixel-border hover:bg-green-100 transition-colors">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 mr-2"></div>
                      <span className="text-xs text-gray-700">Technologies</span>
                    </div>
                    <span className="text-lg font-bold text-green-600 pixel-font">
                      <Counter target="6+" />
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-red-50 pixel-border hover:bg-red-100 transition-colors">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 mr-2"></div>
                      <span className="text-xs text-gray-700">Certificates</span>
                    </div>
                    <span className="text-lg font-bold text-red-600 pixel-font">
                      <Counter target="9+" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="flex-1">
              {/* Header */}
              <div className="text-center lg:text-left mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 pixel-font">
                  <span className="glitch-text" data-text="HELLO_WORLD">HELLO_WORLD</span>
                </h2>
                <h3 className="text-xl text-blue-600 mb-4 pixel-font">{"// Software Engineer"}</h3>
                <div className="h-1 w-20 bg-blue-600 mx-auto lg:mx-0 mb-4"></div>
              </div>
              
              {/* Bio Information */}
              <div className="bg-gray-50 pixel-border p-5 md:p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5">
                  {/* Left Column */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700">Full Name</div>
                        <div className="text-gray-600">Nakhalan Atqiya Arifin Putra</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-500 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700">Age</div>
                        <div className="text-gray-600">18 Years</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700">Location</div>
                        <div className="text-gray-600">Bogor, Indonesia</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 mr-3 flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-gray-700">Email</div>
                        <div className="text-gray-600 break-words overflow-hidden">nakhalanatqiyaarifin@gmail.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-500 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700">Phone</div>
                        <div className="text-gray-600">+62 857-1538-3055</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-pink-500 mr-3 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700">Specialization</div>
                        <div className="text-gray-600">Game Developer & Website Developer</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* About Me */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-4 h-4 bg-blue-600 mr-2 flex-shrink-0"></div>
                    About Me
                  </h4>
                  <div className="bg-white pixel-border p-4">
                    <AboutMeTyping 
                      text= 
                {`I  have over 3 years of programming experience, most of which has focused on website programming. 
                However, I also enjoy game development. 
                It allows me to combine the systematic world with the imaginative world.
                I have a passion for coding development and creating gameplay ideas and stories.`}
                      speed={15} 
                    />
                  </div>
                </div>
              </div>
              
              {/* Skills */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="w-4 h-4 bg-blue-600 mr-2 flex-shrink-0"></div>
                  Core Technologies
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  <div className="text-center bg-gray-100 pixel-border p-3">
                    <div className="text-gray-600 font-bold text-sm">Unity</div>
                    <ProgressBar color="bg-gray-600" targetWidth="90" />
                  </div>

                  <div className="text-center bg-violet-100 pixel-border p-3">
                    <div className="text-violet-600 font-bold text-sm">C#</div>
                    <ProgressBar color="bg-violet-600" targetWidth="50" />
                  </div>

                  <div className="text-center bg-yellow-100 pixel-border p-3">
                    <div className="text-yellow-600 font-bold text-sm">JavaScript</div>
                    <ProgressBar color="bg-yellow-600" targetWidth="75" />
                  </div>

                  <div className="text-center bg-purple-100 pixel-border p-3">
                    <div className="text-purple-500 font-bold text-sm">PHP</div>
                    <ProgressBar color="bg-purple-600" targetWidth="75" />
                  </div>

                  <div className="text-center bg-green-100 pixel-border p-3">
                    <div className="text-green-600 font-bold text-sm">Tailwind</div>
                    <ProgressBar color="bg-green-600" targetWidth="60" />
                  </div>

                  <div className="text-center bg-sky-100 pixel-border p-3">
                    <div className="text-sky-600 font-bold text-sm">Python</div>
                    <ProgressBar color="bg-sky-600" targetWidth="20" />
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <motion.a 
                  href={CV}
                  download="CV_NakhalanAtqiyaArifinPutra.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }} 
                  className="flex-1 text-center pixel-button bg-blue-600 text-white py-3 text-sm md:text-base hover:bg-blue-700"
                >
                  DOWNLOAD CV
                </motion.a>
                
                {/* New Contact Me Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 pixel-button bg-green-600 text-white py-3 text-sm md:text-base hover:bg-green-700"
                >
                  CONTACT ME
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal />
    </section>
  );
};

export default Profile;