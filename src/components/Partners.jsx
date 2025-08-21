import cs_wizards from "../assets/CS_WIZARDS.jpg"

function Partners() {
    return (
        <div id="partners" className="bg-[#3e5f44] flex flex-col items-center py-8">
            <h2 className="text-4xl font-extrabold mb-8">Our Partners</h2>

            <div className="flex flex-wrap gap-8 justify-center">
                <img 
                    src={cs_wizards}
                    alt="logo"
                    className="h-16 w-16 object-contain border-4 rounded-full"
                />
            </div>
        </div>
    )
}

export default Partners;