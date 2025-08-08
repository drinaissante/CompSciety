import cs_wizards from "../assets/CS_WIZARDS.jpg"

import PixelTransition from "../extras/PixelTransition.jsx";

function Partners() {
    return (
        <div id="partners" className="flex flex-col items-center py-8 bg-gray-50">
            <h2 className="text-2xl fontbold mb-8 text-green-800">Our Partners</h2>
            <div className="flex flex-wrap gap-8 justify-center">
                <img 
                    src={cs_wizards}
                    alt="logo"
                    className="h-16 w-16 object-contain border-4 rounded-full"
                />
            </div>

                <PixelTransition
                firstContent={
                    <img
                    src={cs_wizards}
                    alt="default pixel transition content, a cat!"
                    />
                }
                secondContent={
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "grid",
                            placeItems: "center",
                            backgroundColor: "white"
                        }}
                    >
                    <img 
                        src={cs_wizards}
                        alt="logo"
                        className="h-16 w-16 object-contain border-4 rounded-full"
                    />
                    <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Meow!</p>
                    </div>
                }
                gridSize={12}
                pixelColor='green'
                animationStepDuration={0.4}
                className="h-16 w-16 object-contain border-4 rounded-full"
                />
        </div>
    )
}

export default Partners;