import "@css/NavBar.css"

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import logo from "@assets/CompSciety.png"

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";


import { useAuth } from "./auth/authContext/auth.jsx";
import { doSignOut } from "./auth/authService.jsx";

import { fetchProfileURL } from "./db/database.jsx";
import ProfileImage from "./state/ProfileImage.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth/firebase.jsx";

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

  const [ profilePic, setProfilePic ] = useState(null);

  const location = useLocation(); 

  const navigate = useNavigate();
  const { currentUser, userLoggedIn } = useAuth();
  
  const logout = (e) => {
    e.preventDefault();
  
    doSignOut().then(() => { navigate('/login') });
  }

  useEffect(() => {
      async function fetchProfile() {
          try {
              const profile_link = await fetchProfileURL();

              setProfilePic(profile_link);
          } catch (error) {
              console.error(error);
          }
      }

      const unsub = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
              fetchProfile();
          } else {
              setProfilePic(null);
          }
      });

      fetchProfile();

      return unsub;
  });

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

  const handleLinkMobile = (e, type, link) => {
    e.preventDefault();
    
    if (type === "page") {
      if (location.pathname === link.navTo) {

          window.scrollTo({ top: 0, behavior: "smooth"})
      } else {
          navigate(link.navTo);
      }
    } else if (type === "section") {
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
      
  }

  return (
    <nav className="fixed w-full z-50 shadow-md text-white transition-colors select-none">
      <div className="mx-auto flex items-center justify-between px-3 py-3">

        <div className="flex items-center gap-4 lg:ml-30 transition-all ease-in-out">
          <button
            ref={menuRef}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer hover:text-[#5e936c] transition"
            onClick={() => setOpenMenu(!openMenu)}
            aria-label="Toggle Menu"
          >
            <span className="w-6 h-0.5 bg-current mb-1 rounded"></span>
            <span className="w-6 h-0.5 bg-current mb-1 rounded"></span>
            <span className="w-6 h-0.5 bg-current rounded"></span>
          </button>

          <div className="sm:w-[70px] sm:h-[70px] sm:flex items-center justify-center">
            {userLoggedIn && profilePic ? (
              <div className="rounded-3xl border-2 shadow-lg cursor-pointer" onClick={() => navigate("/me")}>
                <ProfileImage imageUrl={profilePic} width={70} height={70} />
              </div>
            ) : (
              <div className="sm:w-[70px] sm:h-[70px] rounded-full animate-pulse" />
            )}
          </div>

          <img
            src={logo}
            alt="Logo"
            className="transition-all lg:h-21 h-12 cursor-pointer"
            draggable={false}
            onClick={(e) => {
              e.preventDefault();

              if (location.pathname !== "/") {
                navigate("/");
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
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
        
        <span className="lg:mr-20 flex items-center justify-start gap-8">
          <button className="cursor-pointer hover:text-[#1f7d53] transition" onClick={() => setIsDark(!isDark)} aria-label="Toggle Theme">
            {isDark ? <MdLightMode size={40} /> : <MdDarkMode size={40} />}
          </button>

            {/* <How to change btn link from Join Button to Login Button> */}
          <button 
            className="text-center border-3 border-solid border-green-400 opacity-90 rounded-lg py-2 px-6 cursor-pointer hover:bg-green-800 transition"
            onClick={(e) => {
              if (!userLoggedIn) {
                navigate("/login");
              } else {
                logout(e);
              }
            }}
          >
            { !userLoggedIn ? "Login"  : "Logout" }
          </button>

        </span>
      </div>

      {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${ openMenu ? 'max-h-96 py-4' : 'max-h-0' } bg-[#5e936c] text-white text-lg flex flex-col items-center gap-4 rounded`} >
        {navLinks.map((link, index) => (
          <a
            key={index}
            href='#'
            onClick={(event) => handleLinkMobile(event, link.type, link)}
            className="hover:underline hover:bg-green-800 w-full flex items-center justify-center h-10"
          >
            {link.name}
          </a>
        ))}
      </div>

      
    </nav>
  );
}

export default NavBar;