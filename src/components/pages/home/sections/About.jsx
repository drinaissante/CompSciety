import mascot from "@assets/mascot.png";

import MotionDiv from "../../../MotionDiv.jsx";

function About() {
  return (
    <div
      id="about"
      className="relative rounded-[50px] bg-[#18230F] flex flex-col items-center gap-10 p-10 m-6 mt-35 sm:p-10 sm:mt-50 sm:mr-50 sm:ml-50 shadow-[0_0_1px_0.8px_rgba(0,255,0,0.3)]"
    >
      <MotionDiv className="absolute -top-6 font-outfit font-bold text-4xl sm:text-7xl text-white sm:-top-10 sm:left-10">
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

        {/* Mission */}
        <MotionDiv className="bg-[#255F38] rounded-2xl flex flex-col gap-7 p-8 text-white text-center flex-1 transform transition-all duration-300 hover:scale-105 max-w-lg">
          <span className="font-outfit font-bold text-xl lg:text-3xl">Mission</span>

          <p className="text-lg">
            To cultivate a united community of socially responsible future-ready scholars and innovators committed to excellence, ethical reasoning, and technological advancement in the service of the people and society.
          </p>
        </MotionDiv>

        {/* Vision */}
        <MotionDiv transition={{ duration: 1.2, ease: "easeOut" }} className="bg-[#255F38] rounded-2xl flex flex-col gap-7 p-8 text-white text-center flex-1 transform transition-all duration-300 hover:scale-105 max-w-lg">
          <span className="font-outfit font-bold text-xl lg:text-3xl">Vision</span>
          
          <p className="text-lg">
            To empower students through inclusive education, collaborative innovation, and ethical leadership, fostering a culture of service that responds to the evolving needs of the Filipino nation and the global community.
          </p>
        </MotionDiv>

      </div>

      {/* Learn More Btn */}
      <div className="absolute -bottom-7 px-12 py-3 rounded-full text-lg font-bold text-white bg-gradient-to-r from-green-400 to-blue-400 shadow-[0_0_7px_3px_rgba(0,255,0,0.6)] flex align-center hover:opacity-90 transition">
        Learn More
      </div>

    </div>
  );
}

export default About;
