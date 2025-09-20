import cs_wizards from "../assets/CS_WIZARDS.jpg"

// TODO: check if pwede ilipat in exchange sa announcement carousel
function Partners() {
    return (
        <div id="partners" className="absolute -bottom-13 left-1/2 -translate-x-1/2 lg:w-[50%] w-[80%] h-30 bg-green-700 rounded-full">
            <h2 className="text-xl font-extrabold m-2 text-center">Our Partners</h2>

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