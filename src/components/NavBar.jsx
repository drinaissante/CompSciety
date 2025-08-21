import "../css/NavBar.css"

import logo from "../assets/CompSciety.png"
import { useState } from "react";

import GooeyNav from "../extras/GooeyNav.jsx"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import { MdDarkMode } from "react-icons/md";

function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const items = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Partners", href: "#partners" },
    { label: "Contact", href: "#contact" },
  ];



  return (
    <header className="fixed w-full bg-[#2c4330] text-white shadow-md flex items-center z-50">
        <div className="flex items-center pl-20 gap-2">
            <img 
              src={logo}
               alt="Logo" 
               className="h-18 cursor-pointer" 
               onClick={() => scrollTo('home')}
              // TODO SCROLL TO TOP
              />

          {/* <h1 className="text-sm font-semibold">BulSU Computer Science Society</h1> */}
        </div>

        {/* Navigation Links */}
        <div className="flex items-center pl-30 gap-8">
          <GooeyNav
            items={items}
            particleCount={10}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />

          {/* <h1 className="py-2">Home</h1>
          <h1 className="py-2">About</h1>
          <h1 className="py-2">Events</h1>
          <h1 className="py-2">Partners</h1>
          <h1 className="py-2">Contact</h1>
          <h1 className="py-2">Light / Dark</h1> */}
          {/* TODO LIGHT AND DARK MODE */}
        </div>

        <div className="pl-30 pr-20 flex gap-5">
            {/* <a href="">
                <FaYoutube />
            </a> */}

            <a href="https://www.facebook.com/compscietybulsu2025" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={23}/>
            </a>

            
            <a href="https://www.instagram.com/compscietybulsu2025/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={23} />
            </a>

            
            <a href="https://www.linkedin.com/in/computer-science-society-bulsu-705740378/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={23} />
            </a>
        </div>
        
        <div className="bg-[#5e936c] text-xl flex text-center px-10 py-1  rounded-full">
            Join
        </div>

        <MdDarkMode className="flex pl-3 text-white" size={30}/>

        {/* For mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center h-10 w-10"
          onClick={() => setOpenMenu(!openMenu)}
          aria-label="Toggle Menu"
        >
          <span className="block w-7 h-1 bg-white mb-1 rounded"></span>
          <span className="block w-7 h-1 bg-white mb-1 rounded"></span>
          <span className="block w-7 h-1 bg-white mb-1 rounded"></span>
        </button>

        {/* Menu */}
        {openMenu && (
          <div className="absolute top-full right-0 w-full bg-green-800 flex flex-col items-center, py-4 md:hidden shadow-lg">
            <h1 className="py-2">Home</h1>
            <h1 className="py-2">About</h1>
            <h1 className="py-2">Events</h1>
            <h1 className="py-2">Partners</h1>
            <h1 className="py-2">Contact</h1>
          <h1 className="py-2">Light / Dark</h1>
          </div>
        )}

    </header>
  )
}

export default NavBar;