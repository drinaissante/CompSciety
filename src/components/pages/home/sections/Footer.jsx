import { Link, useLocation } from "react-router-dom";

import logo from "@assets/CompSciety.png"

import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";

function Footer() {
    const location = useLocation();

    const handleLink = (e, link) => {
        if (location.pathname === link) {
            e.preventDefault();

            window.scrollTo({ top: 0, behavior: "smooth"})
        }
    }

    return (
    <div className="flex flex-col lg:flex-row bg-[#18230F] text-white justify-evenly">

        {/* logo & social media*/}
        <div>
            <div className="flex items-center">
                <img src={logo} width="80px" />

                <div className="flex flex-col">
                    <span className="pt-2 pb-1">
                        CompSciety
                    </span>
                    <span className="text-xs text-gray-300">
                        EST 2025
                    </span>
                </div>
            </div>

            <div className="flex gap-6 mt-5 mb-5 ml-5">
                <a href="https://www.youtube.com/@ComputerScienceSociety-BulSU" target="_blank" rel="noopener noreferrer">
                    <FaYoutube size={23}/>
                </a>

                <a href="https://www.tiktok.com/@compscietybulsu" target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={23}/>
                </a>
                
                <a href="https://www.youtube.com/@ComputerScienceSociety-BulSU" target="_blank" rel="noopener noreferrer">
                    <FaTiktok size={23}/>
                </a>

                
                <a href="https://www.instagram.com/compscietybulsu2025/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={23}/>
                </a>

                
                <a href="https://www.linkedin.com/in/computer-science-society-bulsu-705740378/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={23}/>
                </a>
            </div>
        </div>

        {/* navigation */}
        <div className="flex flex-col p-4 gap-2">
            <span className="text-sm font-bold ">
                Navigation
            </span>

            <ul className="flex flex-col gap-3 mt-1 [&_li]:text-gray-100/50 [&_li]:hover:text-white text-sm">
                <li>
                    <Link 
                        to="/" 
                        onClick={(e) => handleLink(e, "/")}> Home 
                    </Link> 
                </li>
                <li> 
                    <Link 
                        to="/about" 
                        onClick={(e) => handleLink(e, "/about")}> About 
                    </Link> 
                </li>
                <li> 
                    <Link 
                        to="/events" 
                        onClick={(e) => handleLink(e, "/events")}> Events
                    </Link> 
                </li>
                <li> 
                    <Link 
                        to="/blogs" 
                        onClick={(e) => handleLink(e, "/blogs")}> Blog
                    </Link> 
                </li>
            </ul>
        </div>

        {/* contact */}
        <div id="contact" className="flex flex-col p-4">
            <span className="text-sm font-bold">
                Contact Us
            </span>
            <span className="pt-2 text-sm text-gray-100/50">
                compscietybulsu2025@gmail.com
            </span>
        </div>
    </div>
    )
}

export default Footer;