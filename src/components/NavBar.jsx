import "../css/NavBar.css"

import logo from "../assets/CompSciety.png"
import { useState, useEffect } from "react";

import GooeyNav from "../extras/GooeyNav.jsx"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import { MdDarkMode, MdLightMode } from "react-icons/md";

function NavBar() {
  const [isDark, setIsDark] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // toggle theme
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  // when the user scrolls, close the menu
  useEffect(() => {
    const handleScroll = () => {
      if (openMenu && window.scrollY > 350) {
         // 350 lang pinaka-optimal. close the menu when user scrolls 350 pixels below or above

        setOpenMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [openMenu]);

  const navLinks = ['Home', 'About', 'Events', 'Partners', 'Contact'];

  return (
    <header className="fixed w-full z-50 shadow-md bg-[#2c4330] text-black dark:text-white transition-colors">
      <div className="mx-auto flex items-center justify-between px-4 py-3">

        <div className="flex items-center gap-4">
          <button
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer hover:text-[#5e936c] transition"
            onClick={() => setOpenMenu(!openMenu)}
            aria-label="Toggle Menu"
          >
            <span className="w-6 h-[2px] bg-current mb-1 rounded"></span>
            <span className="w-6 h-[2px] bg-current mb-1 rounded"></span>
            <span className="w-6 h-[2px] bg-current rounded"></span>
          </button>

          <img
            src={logo}
            alt="Logo"
            className="lg:h-16 h-12 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>

        <nav className="hidden lg:flex gap-10 text-lg font-medium">
          {navLinks.map((link, index) => (
            <a key={index} href='#' className="hover:text-[#5e936c] transition"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }}>
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">

          <div className="hidden sm:flex gap-3">
            <a href="https://facebook.com/compscietybulsu2025/" target="_blank"><FaFacebook size={30} /></a>
            <a href="https://instagram.com/compscietybulsu2025/" target="_blank"><FaInstagram size={30} /></a>
            <a href="https://linkedin.com/in/computer-science-society-bulsu-705740378/" target="_blank"><FaLinkedin size={30} /></a>
          </div>

          <div className="bg-[#5e936c] text-xl flex text-center px-10 py-1 rounded-full">
            Join 
          </div>

          <button className="cursor-pointer" onClick={() => setIsDark(!isDark)} aria-label="Toggle Theme">
            {isDark ? <MdLightMode size={30} /> : <MdDarkMode size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          openMenu ? 'max-h-96 py-4' : 'max-h-0'
        } bg-[#5e936c] text-white text-lg flex flex-col items-center gap-4`}
      >
        {navLinks.map((link, index) => (
          <a
            key={index}
            href='#'
            onClick={(event) => {
              event.preventDefault();
              document
                .getElementById(link.toLowerCase())
                ?.scrollIntoView({ behavior: 'smooth' });
              setOpenMenu(false);
            }}
            className="hover:underline hover:bg-green-800 w-full flex items-center justify-center h-10"
          >
            {link}
          </a>
        ))}
      </div>

      
    </header>
  );
}

export default NavBar;