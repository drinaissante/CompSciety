import TextType from "../extras/TextTyping.jsx"
import Galaxy from "../extras/Galaxy.jsx"

import logo from "../assets/CompSciety.png"

function Hero() {
    return (
    <section 
        id="home" 
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-green-950 to-green-700">
        <TextType 
            text={["Text typing effect", "SUP", "Happy coding!"]}
            typingSpeed={80}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
        />

        <img src={logo} className="w-1/4 m-10" />

        <h1 className="text-center text-5xl font-bold mb-4 bg-gradient-to-t from-white via-green-600 to-green-900 bg-clip-text text-transparent">
            Welcome to CompSciety!
        </h1>
        <p className="text-xl mb-8 bg-gradient-to-t from-white to-green-700 bg-clip-text text-transparent">
            Background here.
        </p>

  </section>
    )
}

export default Hero;