import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

import translateWeb from '../assets/Portofolio/translateWeb.png';

import squareGame from '../assets/Portofolio/GameSquarepng.png';
import squareGamePDF from '../assets/Portofolio/gameSquare.pdf';

import unityGame from '../assets/Portofolio/GameUnity#1.png';
import unityGameV from '../assets/Portofolio/gameUnity.mp4';

import landingPage from '../assets/Portofolio/landingpage.png';
import landingPagePDF from '../assets/Portofolio/landingpage.pdf';

import mvc from '../assets/Portofolio/mvc.png';
import pdfMVC from '../assets/Portofolio/mvc.pdf';

const Portfolio = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [showAll, setShowAll] = useState(false);
  const [popupMedia, setPopupMedia] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Translate Website (Indonesia & English)",
      description: "I created this website while I was learning about APIs, so it's based on mymemory translate. On this website, you can translate from Indonesian to English or vice versa.",
      image: translateWeb,
      technologies: ["Html", "CSS", "JavaScript", "API"],
      status: "Completed",
        link: "https://translatewebsiteindotoingg.netlify.app/"
    },
    {
      id: 2,
      title: "Website Game",
      description: "This is my biggest achievement when coding using Java script and PHP, on this website there are two types of games, namely Snakegame and SquareGame (fighting game)",
      image: squareGame,
      technologies: ["Unity", "C#", "Adobe Photoshop", "Mobile"],
      status: "Completed",
      media: {
        type: "pdf",
        src: squareGamePDF
      }
    },
    {
      id: 3,
      title: "Unity Platformer Game",
      description: "Actually, the game I made in Unity is not yet completely finished. So the concept of the game is that players jump and face various obstacles.",
      image: unityGame,
      technologies: ["Unity", "C#", "2D Game", "UI Design"],
      status: "Prototype",
      media: {
        type: "video",
        src: unityGameV
      }
    },
    {
      id: 4,
      title: "Landing Page Website",
      description: "I developed this website only for study materials, this website is made with HTML, CSS and JavaScript. This website is a responsive website.",
      image: landingPage,
      technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
      status: "Completed",
      media: {
        type: "pdf",
        src: landingPagePDF
      }
    },
    {
      id: 5,
      title: "Peminjaman MVC",
      description: "On this website there are various features, namely adding, editing and deleting data. This website is made with the MVC concept using PHP and MySQL as a database.",
      image: mvc,
      technologies: ["PHP", "MySQL", "MVC", "CRUD", "Responsive"],
      status: "Completed",
      media: {
        type: "pdf",
        src: pdfMVC
      }
    }
  ];

  const loadMore = () => {
    setVisibleCount(projects.length);
    setShowAll(true);
  };

  const showLess = () => {
    setVisibleCount(4);
    setShowAll(false);
  };

  const handleViewProject = (project) => {
    if (project.link) {
      window.open(project.link, "_blank");
    } else if (project.media) {
      setPopupMedia(project.media);
    }
  };

  return (
    <section id="portfolio" className="py-8 md:py-12 px-4 pixel-grid">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-2 pixel-font fade-in">
          <span className="glitch-text" data-text="PORTFOLIO">PORTFOLIO</span>
        </h2>
        <p className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base">
          Check out my latest game projects ({projects.length})
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
          {projects.slice(0, visibleCount).map((project, index) => (
            <div 
              key={project.id} 
              className={`bg-white pixel-border overflow-hidden hover:shadow-lg transition-all fade-in`} 
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="h-40 sm:h-48 bg-gray-200 overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 px-2 py-1 text-xs pixel-border bg-white">
                  {project.status}
                </div>
              </div>
              
              <div className="p-4 md:p-5">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-800 text-xs pixel-border cursor-pointer"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#2563eb",
                        color: "#fff",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <button 
                  className="w-full pixel-button bg-blue-600 text-white py-2 text-xs md:text-sm hover:bg-blue-700"
                  onClick={() => handleViewProject(project)}
                >
                  VIEW PROJECT
                </button>
              </div>
            </div>
          ))}
        </div>

        {projects.length > 4 && (
          <div className="text-center mt-8">
            {!showAll ? (
              <button 
                className="pixel-button bg-blue-600 text-white py-2 px-6 hover:bg-blue-700"
                onClick={loadMore}
              >
                LOAD MORE ({projects.length - visibleCount} MORE)
              </button>
            ) : (
              <button 
                className="pixel-button bg-gray-600 text-white py-2 px-6 hover:bg-gray-700"
                onClick={showLess}
              >
                SHOW LESS
              </button>
            )}
          </div>
        )}
      </div>

      {/* Popup Modal */}
<AnimatePresence>
  {popupMedia && (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative max-w-4xl w-full h-[80vh] p-4 bg-white pixel-border">
        <button 
          className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 pixel-border"
          onClick={() => setPopupMedia(null)}
        >
          X
        </button>

        {/* PDF Viewer */}
        {popupMedia.type === "pdf" && (
          <iframe 
            src={popupMedia.src} 
            title="PDF Preview" 
            className="w-full h-full"
          ></iframe>
        )}

        {/* Image Viewer */}
        {popupMedia.type === "image" && (
          <img src={popupMedia.src} alt="Preview" className="w-full h-auto" />
        )}

        {/* Video Viewer */}
        {popupMedia.type === "video" && (
          <video src={popupMedia.src} controls autoPlay className="w-full h-auto"></video>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
};

export default Portfolio;
