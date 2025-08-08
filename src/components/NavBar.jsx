import "../css/NavBar.css"

import logo from "../assets/CompSciety LOGO.png"
import { useState } from "react";

function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="fixed w-full bg-green-700 text-white pl-50 shadow-md flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
            <img 
              src={logo}
               alt="Logo" 
               className="h-13 cursor-pointer" 
               onClick={window.scrollTo({ top: 0})}
              />

          {/* <h1 className="text-sm font-semibold">BulSU Computer Science Society</h1> */}
        </div>

        {/* Navigation Links */}
        <div className="flex items-center pr-50 gap-2">
          <h1 className="py-2">Home</h1>
          <h1 className="py-2">About</h1>
          <h1 className="py-2">Events</h1>
          <h1 className="py-2">Partners</h1>
          <h1 className="py-2">Contact</h1>
        </div>

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
          </div>
        )}

    </header>
  )
}

export default NavBar;