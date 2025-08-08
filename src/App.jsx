import { useEffect, useState } from 'react';
import './App.css'


import NavBar from './components/NavBar.jsx'
import Dock from './extras/Dock.jsx';


import { motion } from 'framer-motion';

import { VscHome, VscArchive, VscAccount, VscSettingsGear } from "react-icons/vsc"
import { FaArrowUp } from "react-icons/fa"

import Footer from './components/Footer.jsx';
import MainContent from './components/MainContent.jsx';
import Hero from './components/Hero.jsx';
import Partners from './components/Partners.jsx';

function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },  
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
  ];

  return (
    <div className='min-h-screen flex flex-col scroll-smooth'>
      {showAnimation && (
        <motion.div
          initial={{opacity: 0, scale: 0.4}}
          animate={{opacity: 1, scale: 1.2}}
          exit={{opacity: 0, scale: 2}}
          transition={{duration: 4}}
          className="fixed inset-0 flex items-center justify-center bg-white z-50"
        >

          {/* PUT GLASS BREAKING MATRIX THING ANIMATION HERE */}

          <span className="text-3xl font-bold text-green-700">Welcome to CompSciety!</span>
          <span className='text-black'>GABBY DITO YUNG BROKEN GLASS</span>


        </motion.div>
      )}

      {!showAnimation && (
        <>
          {/* animated cursor  ?? */}

          {/* header with navbar */}
          <NavBar />

          {/* hero */}
          <Hero />

          {/* CONTENT */}
          <MainContent />

          {/* events */}

          {/* organization partners */}
          <Partners />

          <Dock 
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />

          <button
            onClick={() => window.scrollTo({ top: 0 })}
            className="fixed cursor-pointer bottom-8 right-8 bg-green-700 text-white px-3 py-3 rounded shadow"
          >
            <FaArrowUp />
          </button>

          {/* footer */}
          <Footer />
          
        </>
      )}
    </div>
  )
}

export default App
