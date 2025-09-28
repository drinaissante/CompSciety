import "@css/NavBar.css"

import { useState, useEffect, useRef } from "react";

import logo from "@assets/CompSciety.png"

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: 'Home', navTo: "/", type: "page", },
  { name: 'About', navTo: "/about",  type: "page", },
  { name: 'Events', navTo: "/events",  type: "page", },
  { name: 'Blog', navTo: "/blogs",  type: "page", },
  { name: 'Contact', type: "section", }
];

function NavBar() {
  const [isDark, setIsDark] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const menuRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation(); 

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
    
    const handleClickOutsideMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false)
      }
    };
    

    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutsideMenu);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    }
  }, [openMenu]); // openMenu is necessary since in react, every time na may changes dito ( sa openMenu reference object ), magru-run yung nasa loob ng code.

  const handleLink = (e, type, link) => {
    e.preventDefault();

    if (type === "page") {
      if (location.pathname === link.navTo) {

          window.scrollTo({ top: 0, behavior: "smooth"})
      } else {
          navigate(link.navTo);
      }

    } else if (type === "section") {
      document.getElementById(link.name.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <header className="fixed w-full z-50 shadow-md text-white transition-colors">
      <div className="mx-auto flex items-center justify-between px-3 py-3">

        <div className="flex items-center gap-4 lg:ml-50">
          <button
            ref={menuRef}
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
            className="transition-all lg:h-21 h-12 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>

        <nav className="hidden lg:flex gap-25 text-sm font-bold bg-[#18230F] border border-[#255F38] rounded-full px-8 py-5 lg:px-25">
          {navLinks.map((link, index) => (
            <a key={index} className="hover:text-[#5e936c] transition cursor-pointer" target="_blank" rel="noopener noreferrer"
              onClick={(event) => handleLink(event, link.type, link)}>
                {link.name}
            </a>
          ))}
        </nav>
        
        <button className="cursor-pointer lg:mr-40 hover:text-[#1f7d53] transition" onClick={() => setIsDark(!isDark)} aria-label="Toggle Theme">
          {isDark ? <MdLightMode size={40} /> : <MdDarkMode size={40} />}
        </button>
      </div>

      {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${ openMenu ? 'max-h-96 py-4' : 'max-h-0' } bg-[#5e936c] text-white text-lg flex flex-col items-center gap-4 rounded`} >
        {navLinks.map((link, index) => (
          <a
            key={index}
            href='#'
            onClick={(event) => {
              event.preventDefault();
              
              if (link.type === "page") {
                navigate(link.navTo);
              } else if (link.type === "section") {
                const target = document.getElementById(link.name.toLowerCase());

                if (!target) return;

                // Scroll to the target element
                target.scrollIntoView({ behavior: 'smooth' });

                // Smoothly wait until scroll ends
                let lastY = window.scrollY;

                const checkScroll = () => {
                  const currentY = window.scrollY;

                  if (Math.abs(currentY - lastY) < 2) {
                    setOpenMenu(false); // Close menu when scrolling stops
                  } else {
                    lastY = currentY;
                    requestAnimationFrame(checkScroll);
                  }

                };

                requestAnimationFrame(checkScroll);
              }
              
            }}
            className="hover:underline hover:bg-green-800 w-full flex items-center justify-center h-10"
          >
            {link.name}
          </a>
        ))}
      </div>

      
    </header>
  );
}

export default NavBar;