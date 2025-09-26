import { Squares } from "../../squares-background.js"

import { Link, useNavigate } from "react-router-dom";

import MotionDiv from "../../MotionDiv.jsx"
import { useAuth } from "../../auth/authContext/auth.jsx";
import { doSignOut } from "../../auth/authService.jsx";

function Hero() {
  const navigate = useNavigate();
  const { currentUser, userLoggedIn } = useAuth();

  const logout = (e) => {
    e.preventDefault();

    doSignOut().then(() => { navigate('/login') });
  }

  return (
    <section
      id="home"
      className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-[#27391C] rounded-xl"
    >

      {/* Animated squares background */}
      <Squares
        direction="diagonal"
        speed={0.2}
        squareSize={67}
        borderColor="darkgray"
        hoverFillColor="#1F7D53"
        className="absolute"
      />

      {userLoggedIn && (
          <div className="absolute">
            <h1> Hello, {currentUser.email}! </h1>
            <button onClick={logout}>
              Logout
            </button>
          </div>
      )}

      <div className="flex flex-col lg:ml-70 text-wrap text-center mx-auto lg:text-left lg:mx-0 z-10 pointer-events-none">
        <MotionDiv transition={{duration: 1.7, ease: "easeOut"}} className="xl:text-7xl lg:text-6xl lg:w-[12ch] text-5xl font-bold mb-4 bg-gradient-to-t from-white to-green-700 bg-clip-text text-transparent">
            Welcome to CompSciety!
        </MotionDiv>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
            <MotionDiv transition={{duration: 1.7, ease: "easeOut"}} className="lg:text-xl lg:mx-0 mb-8 mx-auto w-[40ch] bg-gradient-to-t from-white to-green-700 bg-clip-text text-transparent">
                This is the official Computer Science Society Website. PLACEHOLDER X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X
            </MotionDiv>

            <MotionDiv transition={{duration: 2, ease: "easeOut"}} >
              <button className="pointer-events-auto text-2xl lg:my-0 lg:ml-120 cursor-pointer bg-gradient-to-r">
                  <span className="px-8 py-3 rounded-full text-lg font-bold text-white bg-gradient-to-r from-green-400 to-blue-400 shadow-[0_0_10px_5px_rgba(0,255,0,0.6)] flex align-center hover:opacity-90 transition">
                    { !userLoggedIn
                        ?
                          <Link to="/signup">
                            Join Now
                          </Link>
                        : 
                        //  TODO logout
                          <div onClick={logout}>
                            Logout
                          </div>
                    }
                      
                      {/* <a href="https://youtu.be/dQw4w9WgXcQ?feature=shared">Join Now</a>  */}
                      {/* Note to self, change link as Dialog Box for the Sign Up Form */}
                  </span>
              </button>
            </MotionDiv>

          </div>
      </div>  

    </section>
  )
}

export default Hero
