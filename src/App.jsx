import { useEffect, useState } from 'react';
import './App.css'

import NavBar from './NavBar.jsx'
import Dock from './extras/Dock.jsx';
import { motion } from 'framer-motion';

import { VscHome, VscArchive, VscAccount, VscSettingsGear } from "react-icons/vsc"
import Footer from './components/Footer.jsx';

function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },  
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
  ];

  return (
    <div>
      {showAnimation && (
        <motion.div
          initial={{opacity: 0, scale: 0.6}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 2}}
          transition={{duration: 1}}
          className="fixed inset-0 flex items-center justify-center bg-white z-50"
        >

          {/* PUT GLASS BREAKING MATRIX THING ANIMATION HERE */}

          <span className="text-3xl font-bold text-green-700">Welcome to CompSciety!</span>

        </motion.div>
      )}

      {!showAnimation && (
        <>
          <NavBar />

          <Dock 
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
          />

        </>
      )}



      {/* animated cursor  ?? */}


      {/* header with navbar */}

      <NavBar />

      {/* main content */}

      <Dock 
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />

      {/* footer */}
      <Footer />
      
    </div>
  )
}

export default App
