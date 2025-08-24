import { useEffect, useState } from 'react';
import './App.css'

import NavBar from './components/NavBar.jsx'


import { motion } from 'framer-motion';

import { VscHome, VscArchive, VscAccount, VscSettingsGear } from "react-icons/vsc"

import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Partners from './components/Partners.jsx';

import Events from './components/Events.jsx';
import Blogs from './components/Blogs.jsx';
import About from './components/About.jsx';
import { FaArrowUp } from 'react-icons/fa';

function App() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 3000);
    return () => clearTimeout(timer);
  }, []);

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

          <span className="text-3xl text-center font-bold text-green-700">Welcome to CompSciety!</span>
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

          {/* separator */}
          <div className="bg-[#2c4330] p-8"></div>

          {/* events */}
          <Events />

          {/* Blogs */}
          <Blogs />

          {/* About CompSciety */}
          <About />

          {/* organization partners */}
          <Partners />

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth"})}
            className="fixed cursor-pointer bottom-8 right-8 bg-green-700 text-white px-3 py-3 rounded shadow"
          >
            <FaArrowUp size={28}/>
          </button>

          {/* footer */}
          <Footer />
          
        </>
      )}
    </div>
  )
}

export default App;
