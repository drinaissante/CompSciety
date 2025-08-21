function About() {
    return (
        <div className="bg-[#e8ffd7] flex flex-col justify-center align-middle text-center p-5 gap-4 text-black">
            <span className="font-bold text-4xl">About CompSciety</span>

            <p className="text-2xl w-[60ch] mx-auto">
                CompSciety exists to build a strong, united, and future-ready generation of Computer Science
                students, not merely to keep up with the times, but to define them. Guided by the values of excellence,
                innovation, integrity, collaboration, and inclusivity, we strive to turn knowledge into action, elevate
                the role of Computer Science in society, and contribute to the advancement of the field within and
                beyond the university.
            </p>

            <div className="flex justify-center gap-4 m-10">
                <div className="bg-[#5e936c] text-2xl mt-5 rounded-2xl flex flex-col gap-3 p-10 text-white">
                    <span className="font-bold self-center">Mission</span>

                    <p className="w-[50ch] break-after-auto text-center">
                        To cultivate a united community of socially responsible future-ready scholars and innovators committed to excellence, ethical reasoning, and technological advancement in the service of the people and society.
                    </p>
                </div>

                <div className="bg-[#5e936c] text-2xl mt-5 rounded-2xl flex flex-col gap-4 p-10 text-white">
                    <span className="font-bold self-center">Vision</span>

                    <p className="w-[50ch] break-after-auto text-center">
                        To empower students through inclusive education, collaborative innovation, and
                        ethical leadership, fostering a culture of service that responds to the evolving needs of the Filipino nation and the global community.
                    </p>
                </div>
            </div>
            
        </div>

    );
}

export default About;