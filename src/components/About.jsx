function About() {
  return (
    <div id="about" className="bg-[#e8ffd7] flex flex-col items-center text-center p-5 gap-8 text-black">
      <span className="font-bold text-4xl">About CompSciety</span>

      <p className="text-lg sm:text-2xl max-w-4xl mx-auto">
        CompSciety exists to build a strong, united, and future-ready generation of Computer Science
        students, not merely to keep up with the times, but to define them. Guided by the values of excellence,
        innovation, integrity, collaboration, and inclusivity, we strive to turn knowledge into action, elevate
        the role of Computer Science in society, and contribute to the advancement of the field within and
        beyond the university.
      </p>

      <div className="flex flex-col lg:flex-row justify-center gap-6 m-10 w-full max-w-6xl ">
        <div className="bg-[#5e936c] rounded-2xl flex flex-col gap-3 p-8 text-white text-center flex-1 transform transition duration-300 hover:scale-103">
          <span className="font-bold text-xl lg:text-2xl">Mission</span>
          <p>
            To cultivate a united community of socially responsible future-ready scholars and innovators committed to excellence, ethical reasoning, and technological advancement in the service of the people and society.
          </p>
        </div>

        <div className="bg-[#5e936c] rounded-2xl flex flex-col gap-3 p-8 text-white text-center flex-1 transform transition duration-300 hover:scale-103">
          <span className="font-bold text-xl lg:text-2xl">Vision</span>
          <p>
            To empower students through inclusive education, collaborative innovation, and
            ethical leadership, fostering a culture of service that responds to the evolving needs of the Filipino nation and the global community.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
