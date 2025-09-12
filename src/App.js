import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Profile from './components/Profile';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Certificates from './components/Certificates';
import Footer from './components/Footer';


function App() {
  const [activeSection, setActiveSection] = useState('profile');

  const profileRef = useRef(null);
  const experienceRef = useRef(null);
  const portfolioRef = useRef(null);
  const certificatesRef = useRef(null);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    
    const sectionRefs = {
      'profile': profileRef,
      'experience': experienceRef,
      'portfolio': portfolioRef,
      'certificates': certificatesRef
    };
    
    if (sectionRefs[sectionId] && sectionRefs[sectionId].current) {
      sectionRefs[sectionId].current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      const sections = [
        { id: 'profile', ref: profileRef },
        { id: 'experience', ref: experienceRef },
        { id: 'portfolio', ref: portfolioRef },
        { id: 'certificates', ref: certificatesRef }
      ];
      
      let currentSection = 'profile';
      
      for (const section of sections) {
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop;
          const sectionHeight = section.ref.current.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App bg-white min-h-screen">
      <Header activeSection={activeSection} setActiveSection={scrollToSection} />
      
      <div ref={profileRef}>
        <Profile />
      </div>
      
      <div ref={experienceRef}>
        <Experience />
      </div>
      
      <div ref={portfolioRef}>
        <Portfolio />
      </div>
      
      <div ref={certificatesRef}>
        <Certificates />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;