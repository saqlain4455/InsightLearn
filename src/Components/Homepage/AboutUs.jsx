import { Link } from "react-router-dom";
import { TiArrowRightThick } from "react-icons/ti";
import { HiAcademicCap, HiUsers, HiLightBulb, HiTrophy } from "react-icons/hi2";
import Footer from "../Common/Footer.jsx"
function AboutUs() {
  const stats = [
    { number: "10K+", label: "Active Learners" },
    { number: "500+", label: "Courses Available" },
    { number: "100+", label: "Expert Instructors" },
    { number: "95%", label: "Success Rate" }
  ];

  const values = [
    {
      icon: <HiAcademicCap className="w-10 h-10" />,
      title: "Quality Education",
      description: "We provide industry-standard courses designed by experts to ensure the highest quality learning experience."
    },
    {
      icon: <HiUsers className="w-10 h-10" />,
      title: "Community Driven",
      description: "Join a vibrant community of learners and instructors who support each other's growth and success."
    },
    {
      icon: <HiLightBulb className="w-10 h-10" />,
      title: "Innovation First",
      description: "We constantly update our curriculum to reflect the latest trends and technologies in the coding world."
    },
    {
      icon: <HiTrophy className="w-10 h-10" />,
      title: "Career Success",
      description: "Our goal is to help you achieve your career aspirations through practical skills and real-world projects."
    }
  ];

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="relative flex flex-col mx-auto text-center w-11/12 max-w-7xl items-center text-white justify-between">
        <div className="mt-20">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
            About{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Our Platform
            </span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-3xl mx-auto text-base md:text-lg">
            We're on a mission to make quality coding education accessible to everyone, everywhere. 
            Learn the skills you need to thrive in the digital age.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 w-full">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-[#181B1E] border border-slate-700 rounded-lg p-6 
                         transition-all duration-300 hover:border-sky-500 hover:scale-105"
            >
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                {stat.number}
              </h3>
              <p className="text-slate-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="w-11/12 mx-auto max-w-7xl mt-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side */}
          <div className="w-full lg:w-1/2 text-white">
            <h2 className="font-bold text-3xl md:text-4xl">
              Our{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            <p className="mt-6 text-slate-400 text-base md:text-lg leading-relaxed">
              We believe that education is the key to unlocking human potential. Our platform 
              was created to break down barriers to learning and provide world-class coding 
              education to anyone with the determination to learn.
            </p>
            <p className="mt-4 text-slate-400 text-base md:text-lg leading-relaxed">
              Through innovative teaching methods, hands-on projects, and a supportive community, 
              we're helping thousands of students transform their careers and achieve their dreams.
            </p>
          </div>

          {/* Right side */}
          <div className="w-full lg:w-1/2 text-white">
            <h2 className="font-bold text-3xl md:text-4xl">
              Our{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Vision
              </span>
            </h2>
            <p className="mt-6 text-slate-400 text-base md:text-lg leading-relaxed">
              We envision a world where everyone has the opportunity to learn, grow, and succeed 
              in the tech industry, regardless of their background or location.
            </p>
            <p className="mt-4 text-slate-400 text-base md:text-lg leading-relaxed">
              By democratizing access to quality coding education, we're building a more inclusive 
              and diverse tech ecosystem where talent and passion matter more than privilege.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="w-11/12 mx-auto max-w-7xl mt-24">
        <div className="text-center text-white">
          <h2 className="font-bold text-3xl md:text-4xl">
            What We{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Stand For
            </span>
          </h2>
          <p className="mt-6 text-slate-400 max-w-3xl mx-auto text-base md:text-lg">
            Our core values guide everything we do and shape the learning experience we provide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-[#181B1E] border border-slate-700 rounded-lg p-8 
                         transition-all duration-300 hover:border-sky-500 hover:scale-105"
            >
              <div className="text-sky-400 mb-4">
                {value.icon}
              </div>
              <h3 className="text-white font-bold text-xl md:text-2xl mb-3">
                {value.title}
              </h3>
              <p className="text-slate-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 mt-24">
        <div className="home-page py-16 lg:py-20">
          <div className="w-11/12 mx-auto max-w-7xl text-center">
            <h2 className="font-bold text-3xl md:text-4xl">
              Ready to{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Start Learning?
              </span>
            </h2>
            <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
              Join our community today and take the first step towards mastering coding skills 
              that will shape your future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
              <Link to="/signup">
                <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold 
                                 transition-all duration-300 hover:scale-105 hover:shadow-lg 
                                 flex items-center gap-2">
                  Get Started Now
                  <TiArrowRightThick />
                </button>
              </Link>
              
              <Link to="/catalog">
                <button className="bg-[#181B1E] text-white px-8 py-3 rounded-lg font-semibold 
                                 border border-slate-700 transition-all duration-300 
                                 hover:border-sky-500 hover:scale-105">
                  Browse Courses
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;