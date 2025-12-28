import { useEffect, useState } from 'react';

import NavBar from '../../NavBar.jsx'

import Footer from './sections/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Partners from './sections/Partners.jsx';

import Announcements from './sections/Announcements.jsx';

import About from './sections/About.jsx';

import { FaArrowUp } from 'react-icons/fa';

function App() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    document.title = "Home | BulSU Computer Science Society"

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
        {/* animated cursor  ?? */}

        {/* hero */}
        <Hero />

        {/* announcement carousel here */}
        <Announcements />

        {/* gradient container */}
        <div className="bg-linear-to-br from-[#18230F] via-[#2b5016] to-[#324d22]">
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
    </div>
  )
}

export default App;
