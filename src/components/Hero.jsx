import TextType from "../extras/TextTyping.jsx"

import Galaxy from "../extras/Galaxy.jsx"

function Hero() {
    return (
    <section 
        id="home" 
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-green-950 to-green-700">
            
            {/* <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={9}
                speed={0.1}
                particleBaseSize={120}
                moveParticlesOnHover={true}
                alphaParticles={true}
                disableRotation={false}
            /> */}

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
            text={["Text typing effect", "SUP", "Happy coding!"]}
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
        

        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-t from-white via-green-600 to-green-900 bg-clip-text text-transparent">
            Welcome to CompSciety!
        </h1>
        <p className="text-xl mb-8 bg-gradient-to-t from-white to-green-700 bg-clip-text text-transparent">
            Background here.
        </p>
        
        <Galaxy 
            className="absolute w-full h-[800px]"
            mouseRepulsion={false}
            mouseInteraction={true}
            density={1}
            saturation={0.3}
            hueShift={100}
        />
  </section>
    )
}

export default Hero;