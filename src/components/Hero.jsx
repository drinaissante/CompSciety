import GridDistortion from "../extras/GridDistortion.jsx";

import bg from "../assets/bg.png";

import TextType from "../extras/TextTyping.jsx"

import ShinyText from "../extras/ShinyText.jsx";

import ScrollFloat from "../extras/ScrollFloat.jsx";

import Particles from "../extras/Particles.jsx";


function Hero() {
    return (
    <section 
        id="home" 
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-800 via-green-900 to-gray-200">
            
            <Particles
                className="fixed inset-0 w-full h-full z-0"
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={120}
                moveParticlesOnHover={true}
                alphaParticles={true}
                disableRotation={false}
            />
        <div className="">
            {/* <GridDistortion
                imageSrc={bg}
                grid={10}
                mouse={0.1}
                strength={0.15}
                relaxation={0.9}
            /> */}
        </div>

        <TextType 
            text={["Text typing effect", "for your websites", "Happy coding!"]}
            typingSpeed={80}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
        />

{/* 
        <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className='custom-class'
            >
            React Bits
        </GlitchText> */}
        

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