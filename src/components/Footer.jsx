import logo from "../assets/CompSciety.png"

import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

function Footer() {
    return (
    <div className="flex flex-col lg:flex-row bg-[#2c4330] text-white justify-evenly">

        {/* logo */}
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

        {/* social media */}
        <div className="flex flex-col p-4 gap-2">
            <span className="font-bold">Follow Us</span>

            <div className="flex gap-5">
                {/* <a href="">
                    <FaYoutube />
                </a> */}

                <a href="https://www.facebook.com/compscietybulsu2025" target="_blank" rel="noopener noreferrer">
                    <FaFacebook  size={23}/>
                </a>

                
                <a href="https://www.instagram.com/compscietybulsu2025/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram  size={23}/>
                </a>

                
                <a href="https://www.linkedin.com/in/computer-science-society-bulsu-705740378/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin  size={23}/>
                </a>
            </div>

            <span className="text-xs">
                @ 2025 Computer Science Society. All Rights Reserved.
            </span>
        </div>

        {/* contact */}
        <div id="contact" className="flex flex-col p-4">
            <span className="font-bold">
                Contact Us
            </span>
            <span className="pt-2 text-sm">
                compscietybulsu2025@gmail.com
            </span>
        </div>
    </div>
    )
}

export default Footer;