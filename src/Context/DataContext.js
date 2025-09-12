import React, { createContext, useContext, useMemo } from 'react';

const DataContext = createContext();
import GlobalGameJam from '../assets/Certificates/globalgamejam.png';
import DataScient from '../assets/Certificates/DataScientDicoding.png';
import EndlessGame from '../assets/Certificates/endlessgame.png';
import IGDX from '../assets/Certificates/igdx2024.png';
import JavaDicoding from '../assets/Certificates/JavaDicoding.png';
import SQLDicoding from '../assets/Certificates/SqlDicoding.png';
import VisualData from '../assets/Certificates/visualdata.png';
import VueJSWantek from '../assets/Certificates/VueJSWantek.png';
import BackendCyber from '../assets/Certificates/backendCyberlabs.png';

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Data dari berbagai komponen
  const certificates = [
     {
          id: 1,
          title: "Global Game Jam 2025",
          issuer: "Global Game Jam",
          date: "2025",
          image: GlobalGameJam 
        },
        {
          id: 2,
          title: "IGDX Career Seminar",
          issuer: "IGDX",
          date: "2024",
          image: IGDX
        },
        {
          id: 3,
          title: "Learn Basic Data Science",
          issuer: "Dicoding",
          date: "2023",
          image: DataScient
        },
        {
          id: 4,
          title: "Learn Basic Structured Query Languange(SQL)",
          issuer: "Dicoding",
          date: "2023",
          image: SQLDicoding
        },
        {
          id: 5,
          title: "Learn Basic Java",
          issuer: "Dicoding",
          date: "2022",
          image: JavaDicoding
        },
        {
          id: 6,
          title: "Create Endless Runner Game with Theree.js",
          issuer: "Gamelab Indonesia",
          date: "2023",
          image: EndlessGame
        },
        {
          id: 7,
          title: "Learn Basic Visual Data",
          issuer: "Dicoding",
          date: "2024",
          image: VisualData
        },
        {
          id: 8,
          title: "Front-end Development with The Progressive JavaScript Framework Vue.js",
          issuer: "Wanteknologi",
          date: "2023",
          image: VueJSWantek
        },
        {
          id: 9,
          title: "Backend Development with JavaScript Framework Express.js",
          issuer: "Cyberlabs",
          date: "2023",
          image: BackendCyber
        },
  ];

  const projects = [
    {
      id: 1,
      title: "Epic Adventure Game",
      description: "Game petualangan 3D",
      technologies: ["Unity", "C#", "Blender"]
    },
    {
      id: 2,
      title: "Space Shooter Mobile",
      description: "Game shooter mobile",
      technologies: ["Unity", "C#", "Photoshop"]
    }
    // ... tambahkan data project lainnya
  ];

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
      title: "Samsung Innovation Campus ",
      company: "Samsung Electronic Indonesia",
      period: "2024",
      description: "Learn about IoT technology development using the Python programming language and make MQTT simulations at Wokwi and Mosquitto",
      technologies: ["Python", "IoT"]
    }
  ];

  const technologies = ["Unity", "C#", "JavaScript", "PHP", "Tailwind", "Python"];

  // Hitung jumlah secara dinamis
  const statsData = useMemo(() => ({
    certificates: certificates.length,
    projects: projects.length,
    experience: experiences.reduce((total, exp) => {
      // Hitung tahun experience dari period
      const years = exp.period.includes('Present') ? 
        new Date().getFullYear() - parseInt(exp.period.split(' - ')[0]) : 
        parseInt(exp.period.split(' - ')[1]) - parseInt(exp.period.split(' - ')[0]);
      return total + years;
    }, 0),
    technologies: technologies.length
  }), [certificates, projects, experiences, technologies]);

  const value = {
    certificates,
    projects, 
    experiences,
    technologies,
    statsData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};