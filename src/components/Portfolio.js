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

import layananMasyarakat from '../assets/Portofolio/layananmasyarakat.png';

import SanityImage from '../assets/Portofolio/Sanity.png';

import ThePill from '../assets/Portofolio/thePill.png';
import thePillVideo from '../assets/Portofolio/video/ThePillVideo.mp4';

import ADayWhenIWakeUp from '../assets/Portofolio/daywheniwakeup.png';
import aDayWhenIWakeUpVideo from '../assets/Portofolio/video/ADayWhenIWakeupPrototipe.mp4';

import wayoflight from '../assets/Portofolio/WayOfLight.png';
import wayoflightVideo from '../assets/Portofolio/video/ThePillVideo.mp4';

const Portfolio = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [showAll, setShowAll] = useState(false);
  const [popupMedia, setPopupMedia] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Translate Website (Indonesia & English)",
      description: "I created this website while I was learning about APIs, so it's based on mymemory translate. On this website, you can translate from Indonesian to English or vice versa.",
      image: translateWeb,
      technologies: ["Html", "CSS", "JavaScript", "API"],
      status: "Completed",
      link: "https://translatewebsiteindotoingg.netlify.app/",
      type: "website"
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
      },
      type: "game"
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
      },
      type: "game"
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
      },
      type: "website"
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
      },
      type: "website"
    },
    {
      id: 6,
      title: "Community Service Website",
      description: "I created this website using express.js and react.js to provide services for public complaints in various provinces in Indonesia. This website has three roles: admin, staff, and visitors or reporters. This website is also connected to a MySQL database.",
      image: layananMasyarakat,
      technologies: ["Javascript", "MySQL", "React", "Express.jss"],
      status: "Completed",
      link: "https://github.com/NakhalanAtqiyaAP/Pengaduan_App",
      type: "website"
    },
     {
      id: 7,
      title: "Sanity",
      description: "This game was my first game after participating in a game jam and my first published. It draws inspiration from Doom, where players must shoot enemies but also pay attention to their breath bar, which decreases as gameplay progresses. Therefore, players must find a place to refill it. Because the game is set underwater, players must find a way out while eliminating monsters. This project was created with a team during the 2025 Global Game Jam event. I served as both game designer and game programmer.",
      image: SanityImage,
      technologies: ["Unity", "C#", "Team Leader", "Game Design"],
      status: "Completed",
      link: "https://globalgamejam.org/games/2025/sanity-2",
      type: "game"
    },
     {
      id: 8,
      title: "The Pill",
      description: "This game is a narrative, 3D horror game. I was the project leader, also responsible for game design and programming. Although the game wasn't completed due to internal issues, I managed to create a satisfactory prototype. I didn't publish the game because it wasn't finished yet.",
      image: ThePill,
      technologies: ["Unity", "C#", "Team Leader", "Game Design"],
      status: "Prototype",
     media: {
        type: "video",
        src: thePillVideo
      },
      type: "game"
    },
     {
  id: 9,
  title: "A Day When I Wake Up",
  description: (
    <>
      This game is a narrative, 2D platformer. I was the project leader, also responsible for game design and programming. 
      The game tells the story of a person who wakes up as a bird and travels the world to discover what really happened. 
      The project was never completed due to internal team issues, which delayed the project, and ultimately resulted in only a prototype. 
      However, I've already written the story <a 
        href="https://medium.com/@nakhalanatqiya/rebirth-39fe50401c66" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
      >here</a>.
        </>
      ),
      image: ADayWhenIWakeUp,
      technologies: ["Unity", "C#", "Team Leader", "Game Design"],
      status: "Prototype",
      media: {
        type: "video",
        src: aDayWhenIWakeUpVideo
      },
      type: "game"
    },
     {
      id: 10,
      title: "Way of Light",
      description: "This game is a hack and slash, narrative, and 3D RPG game. I was the project leader, programming, and game designer. The game features a supernatural theme that aims to feature Indonesian demons. We've developed various concepts, including story and character concepts. However, during production, it turned out the scope of an RPG game was too large, so we ultimately shut down the game, leaving it as a prototype.",
      image: wayoflight,
      technologies: ["Unity", "C#", "Team Leader", "Game Design"],
      status: "Prototype",
      media: {
        type: "video",
        src: wayoflightVideo
      },
      type: "game"
    },
  ];

  // Get unique types for filter buttons
  const types = ["all", ...new Set(projects.map(project => project.type))];
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.type === activeFilter);

  const loadMore = () => {
    setVisibleCount(filteredProjects.length);
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
          Check out my latest projects ({filteredProjects.length})
        </p>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
          {types.map((type, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 text-sm md:text-base pixel-border ${
                activeFilter === type 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => {
                setActiveFilter(type);
                setVisibleCount(4);
                setShowAll(false);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </motion.button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
          {filteredProjects.slice(0, visibleCount).map((project, index) => (
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
                <div className="absolute top-2 left-2 px-2 py-1 text-xs pixel-border bg-blue-600 text-white">
                  {project.type}
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

        {filteredProjects.length > 4 && (
          <div className="text-center mt-8">
            {!showAll ? (
              <button 
                className="pixel-button bg-blue-600 text-white py-2 px-6 hover:bg-blue-700"
                onClick={loadMore}
              >
                LOAD MORE ({filteredProjects.length - visibleCount} MORE)
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

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No projects found for this category.</p>
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