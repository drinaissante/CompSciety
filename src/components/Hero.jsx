import GridDistortion from "../extras/GridDistortion.jsx";

import bg from "../assets/bg.png";

function Hero() {
    return (
    <section className="flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-full relative">
            {/* <GridDistortion
                imageSrc={bg}
                grid={10}
                mouse={0.1}
                strength={0.15}
                relaxation={0.9}
            /> */}
        </div>


        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-600 to-green-900 bg-clip-text text-transparent">
            Welcome to CompSciety!
        </h1>
        <p className="text-xl mb-8 bg-gradient-to-r from-green-300 to-green-700 bg-clip-text text-transparent">
            Background here.
        </p>
  </section>
    )
}

export default Hero;