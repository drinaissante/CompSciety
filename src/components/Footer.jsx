import logo from "../assets/CompSciety LOGO.png"

function Footer() {
    return (
    <div className="bg-[#2c4330] text-white flex flex-col justify-evenly">
        <div className="flex">
            {/* logo */}
            <img src={logo} width="80px" />
            <span className="py-5">
                CompSciety EST 2025
            </span>
        </div>

        <div className="flex">
            {/* social media */}
        </div>

        <div>
            {/* contact */}
        </div>
    </div>
    )
}

export default Footer;