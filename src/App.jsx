import { useEffect, useState } from 'react';
import './App.css'

import NavBar from './components/NavBar.jsx'

import { motion } from 'framer-motion';

import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Partners from './components/Partners.jsx';

import Announcements from './components/Announcements.jsx';

import About from './components/About.jsx';
import { FaArrowUp } from 'react-icons/fa';


function App() {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScrollBtn = () => {
      const currentY = window.scrollY;

      if (currentY > 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    }

    window.addEventListener('scroll', handleScrollBtn);

    return () => window.removeEventListener('scroll', handleScrollBtn);
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
        </motion.div>
      )}

      {!showAnimation && (
        <>
          {/* animated cursor  ?? */}

          {/* header with navbar */}
          <NavBar />

          {/* hero */}
          <Hero />

          {/* announcement carousel here */}
          <Announcements />

          {/* gradient container */}
          <div className="bg-gradient-to-br from-[#18230F] to-[#27391C]">
            {/* About CompSciety */}
            <About />

            {/* organization partners */}
            <Partners />
          </div>

          {showScrollBtn && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth"})}
              className="fixed cursor-pointer bottom-8 right-8 bg-green-700 text-white px-3 py-3 rounded-xl shadow-emerald-200 transform transition duration-300 hover:-translate-y-2 text-xl"
            >
              <FaArrowUp/>
            </button>
          )}

          {/* footer */}
          <Footer />
          
        </>
      )}
    </div>
  )
}

export default App;
