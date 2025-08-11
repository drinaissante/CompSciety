import logo from "../assets/CompSciety LOGO.png"

import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

function Footer() {
    return (
    <div className="bg-[#2c4330] text-white flex justify-evenly">

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
        <div className="flex flex-col pt-4">
            <span className="font-bold">Follow Us</span>

            <div className="pt-3 flex gap-5">
                {/* <a href="">
                    <FaYoutube />
                </a> */}

                <a href="https://www.facebook.com/compscietybulsu2025" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                </a>

                
                <a href="https://www.instagram.com/compscietybulsu2025/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>

                
                <a href="https://www.linkedin.com/in/computer-science-society-bulsu-705740378/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </a>
            </div>


            <span className="pt-3 pb-1 text-xs">
                @ 2025 Computer Science Society. All Rights Reserved.
            </span>
        </div>

        {/* contact */}
        <div className="flex flex-col pt-4">
            <span>
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