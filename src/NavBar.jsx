import "./css/NavBar.css"

import logo from "./assets/CompSciety LOGO.png"

function NavBar() {
    return (
    <nav className="navbar fixed top-0 left-0 w-full z-50">
        <div className="navbar-logo gap-3">
            {/* compsciety logo */}
            <img src={logo} alt="CompSciety Logo" 
            className="h-[50px]" />

            <span className="flex items-center justify-items-center">BulSU Computer Science Society</span>
        </div>
        <div className="navbar-links">
            {/* Upon clicked */}
        </div>
        <div className="hamburger">
            <span className="cursor-target">
                Home
            </span>
            <span className="cursor-target">
                About Us
            </span>
            <span className="cursor-target">
                Contact
            </span>
        </div>
    </nav>
    )
}

export default NavBar;