import React from 'react';
import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Lead Project & Backend Developer",
      company: "PT Narantraya",
      period: "2024 - 2025",
      description: "Leading a team covering both backend and frontend to create a topup management website project. Using Express.js and React.js",
      technologies: ["React.js", "Express.js", "Golang", "Team Leadership"]
    },
    {
      id: 2,
      title: "Global Game Jam 2025",
      company: "Global Game Jam",
      period: "2025",
      description: "I created a game like the classic Doom game in 3 days with my friends. I became a game programmer and game designer.",
      technologies: ["Unity", "C#", "Game Design"]
    },
    {
      id: 3,
      title: "Samsung Innovation Campus",
      company: "Samsung Electronic Indonesia",
      period: "2024",
      description: "Learn about IoT technology development using the Python programming language and make MQTT simulations at Wokwi and Mosquitto",
      technologies: ["Python", "IoT"]
    },
    {
      id: 4,
      title: "Become CEO Lightcess Production",
      company: "Lightcess Production",
      period: "2024 - 2025",
      description: "I became the CEO of a game studio that I created myself with my school friends",
      technologies: ["Leadership", "Game Developer"]
    }
  ];

  return (
    <section id="experience" className="py-8 md:py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        {/* Title */}
        <motion.h2
          className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-2 pixel-font"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="glitch-text" data-text="EXPERIENCE">EXPERIENCE</span>
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          My journey in world of programming ({experiences.length})
        </motion.p>

        {/* Cards */}
        <motion.div
          className="space-y-6 md:space-y-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              className="pixel-border bg-white p-4 md:p-6 relative cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1 }
              }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 0px 12px rgba(59,130,246,0.5)", 
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute -left-1 md:-left-2 top-6 w-3 h-3 md:w-4 md:h-4 bg-blue-600 transform rotate-45"></div>

              {/* Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 md:mb-4">
                <div className="mb-2 md:mb-0">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">{exp.title}</h3>
                  <p className="text-blue-600 font-semibold text-sm md:text-base">{exp.company}</p>
                </div>
                <p className="text-gray-500 bg-gray-100 px-2 py-1 pixel-border text-xs md:text-sm md:mt-0 self-start md:self-auto">
                  {exp.period}
                </p>
              </div>

              {/* Description */}
              <motion.p
                className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {exp.description}
              </motion.p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 md:gap-2">
                {exp.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-800 text-xs pixel-border"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "#2563eb",
                      color: "#fff"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
