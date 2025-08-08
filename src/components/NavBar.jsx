import "../css/NavBar.css"

import logo from "../assets/CompSciety LOGO.png"

function NavBar() {
    return (
        <header className="bg-green-700 text-white p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="text-xl font-bold">BulSU Computer Science Society</h1>
        </div>
      </header>
    )
}

export default NavBar;