import Footer from "../home/sections/Footer.jsx";

function NotFound() {
    return (
        <div className='flex flex-col scroll-smooth'>    
            <div className="min-h-screen bg-linear-to-b from-[#18230F] via-[#2b5016] to-[#324d22] flex justify-center items-center text-center">
                404 ERROR 
            </div>
            
            <Footer />
        </div>
    );  
}

export default NotFound;