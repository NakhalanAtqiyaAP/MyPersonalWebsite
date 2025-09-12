import React, { useState } from 'react';
import GlobalGameJam from '../assets/Certificates/globalgamejam.png';
import DataScient from '../assets/Certificates/DataScientDicoding.png';
import EndlessGame from '../assets/Certificates/endlessgame.png';
import IGDX from '../assets/Certificates/igdx2024.png';
import JavaDicoding from '../assets/Certificates/JavaDicoding.png';
import SQLDicoding from '../assets/Certificates/SqlDicoding.png';
import VisualData from '../assets/Certificates/visualdata.png';
import VueJSWantek from '../assets/Certificates/VueJSWantek.png';
import BackendCyber from '../assets/Certificates/backendCyberlabs.png';

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [showAll, setShowAll] = useState(false);

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

  // Fungsi untuk memuat lebih banyak sertifikat
  const loadMore = () => {
    setVisibleCount(certificates.length);
    setShowAll(true);
  };

  // Fungsi untuk mengurangi jumlah sertifikat yang ditampilkan
  const showLess = () => {
    setVisibleCount(4);
    setShowAll(false);
  };

  const openModal = (cert) => {
    setSelectedCertificate(cert);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="certificates" className="py-8 md:py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-2 pixel-font fade-in">
          <span className="glitch-text" data-text="CERTIFICATES">CERTIFICATES</span>
        </h2>
      <p className="text-center text-gray-600 mb-8 md:mb-12 text-sm md:text-base"> My achievements and certifications ({certificates.length})</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {certificates.slice(0, visibleCount).map((cert, index) => (
            <div key={cert.id} className={`bg-white p-3 md:p-4 pixel-border fade-in`} style={{animationDelay: `${index * 0.1}s`}}>
              <div 
                className="h-32 md:h-40 bg-gray-200 mb-3 md:mb-4 overflow-hidden pixel-border cursor-pointer"
                onClick={() => openModal(cert)}
              >
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex justify-between items-start mb-2 md:mb-3">
                <h3 className="text-md md:text-lg font-bold text-gray-800">{cert.title}</h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs pixel-border">{cert.date}</span>
              </div>
              
              <p className="text-gray-600 mb-3 md:mb-4 text-sm">{cert.issuer}</p>
              
              <button 
                className="w-full pixel-button bg-gray-800 text-white py-2 text-xs hover:bg-gray-900"
                onClick={() => openModal(cert)}
              >
                VIEW CERTIFICATE
              </button>
            </div>
          ))}
        </div>

        {/* Tombol Load More/Show Less */}
        {certificates.length > 4 && (
          <div className="text-center mt-8">
            {!showAll ? (
              <button 
                className="pixel-button bg-gray-800 text-white py-2 px-6 hover:bg-gray-900"
                onClick={loadMore}
              >
                LOAD MORE ({certificates.length - visibleCount} MORE)
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

        {/* Modal untuk menampilkan gambar sertifikat */}
        {isModalOpen && selectedCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div className="relative max-w-4xl w-full bg-white p-4 md:p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
              <button 
                className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300"
                onClick={closeModal}
                aria-label="Close modal"
              >
                &times;
              </button>
              
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">{selectedCertificate.title}</h3>
                <p className="text-gray-600">{selectedCertificate.issuer} - {selectedCertificate.date}</p>
              </div>
              
              <div className="overflow-hidden">
                <img 
                  src={selectedCertificate.image} 
                  alt={selectedCertificate.title} 
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>
              
              <div className="mt-4 flex justify-end">
                <button 
                  className="pixel-button bg-gray-800 text-white py-2 px-4 text-sm hover:bg-gray-900"
                  onClick={closeModal}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;