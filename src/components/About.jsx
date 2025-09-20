import mascot from "../assets/mascot.png";

import MotionDiv from "./MotionDiv.jsx"

function About() {
  return (
    <div
      id="about"
      className="relative rounded-[50px] bg-[#18230F] flex flex-col items-center gap-10 p-10 m-6 mt-15 sm:p-10 sm:mt-30 sm:mr-50 sm:ml-50"
    >
      <MotionDiv className="absolute -top-6 left-1/7 font-outfit font-bold text-4xl sm:text-7xl text-white sm:-top-10 sm:left-10">
        About CompSciety
      </MotionDiv>

      <MotionDiv className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-8 max-w-6xl w-full">

        <div className="flex flex-col max-w-3xl">
          <p className="text-base m-5 sm:text-xl sm:m-0 text-white">
            CompSciety exists to build a strong, united, and future-ready generation of Computer Science
            students, not merely to keep up with the times, but to define them. Guided by the values of excellence,
            innovation, integrity, collaboration, and inclusivity, we strive to turn knowledge into action, elevate
            the role of Computer Science in society, and contribute to the advancement of the field within and
            beyond the university.
          </p>
        </div>

        <img
          src={mascot}
          alt="CompSciety Mascot"
          className="sm:ml-20 w-32 sm:w-44 h-auto"
        />
      </MotionDiv>

      <div className="flex flex-col lg:flex-row justify-center gap-6 w-full max-w-6xl">
        <MotionDiv className="bg-[#1F7D53] rounded-2xl flex flex-col gap-3 p-8 text-white text-center flex-1 transform transition duration-300 hover:scale-105">
          <span className="font-outfit font-bold text-xl lg:text-2xl">Mission</span>

          <p>
            To cultivate a united community of socially responsible future-ready scholars and innovators committed to excellence, ethical reasoning, and technological advancement in the service of the people and society.
          </p>
        </MotionDiv>

        <MotionDiv transition={{ duration: 1.2, ease: "easeOut" }} className="bg-[#1F7D53] rounded-2xl flex flex-col gap-3 p-8 text-white text-center flex-1 transform transition duration-300 hover:scale-105">
          <span className="font-outfit font-bold text-xl lg:text-2xl">Vision</span>
          
          <p>
            To empower students through inclusive education, collaborative innovation, and ethical leadership, fostering a culture of service that responds to the evolving needs of the Filipino nation and the global community.
          </p>
        </MotionDiv>

      </div>

      <div className="absolute -bottom-7 px-8 py-3 rounded-full text-lg font-bold text-white bg-gradient-to-r from-green-400 to-blue-400 shadow-[0_0_10px_5px_rgba(0,255,0,0.6)] flex align-center hover:opacity-90 transition">
        Learn More
      </div>

    </div>
  );
}

export default About;
