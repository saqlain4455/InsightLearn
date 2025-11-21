import { Link } from "react-router-dom";
import { TiArrowRightThick } from "react-icons/ti";
import CTAButton from "../Components/Homepage/Button.jsx";
import image from "../assets/pexels-olly-3807755.jpg";
import CodeBlocks from "../Components/Homepage/CodeBlocks.jsx";
import TimeLine from "../Components/Homepage/TimeLine.jsx";
import LearningLanguage from "../Components/Homepage/LearningLanguage.jsx";
import Instructor from "../Components/Homepage/Instructor.jsx";
import SelectSection from "../Components/Homepage/SelectSection.jsx";
import Cards from "../Components/Homepage/Cards.jsx";
import { HiHome } from "react-icons/hi2";
import Footer from "../Components/Common/Footer.jsx";

function Home() {
  return (
    <div className="w-full min-h-screen">
      <div className="relative flex flex-col mx-auto text-center w-11/12 max-w-7xl items-center text-white justify-between">

        {/* Become Instructor Button */}
        <Link to="/signup">
          <div className="group mx-auto mt-20">
            <div className="flex flex-row gap-2 items-center 
                            bg-[#181B1E] text-gray-500 
                            px-4 py-2 rounded-full border border-slate-700
                            transition-all duration-300 
                            hover:scale-105 hover:bg-[#010B13] hover:border-sky-500 w-fit">
              <p className="text-sm">Become an Instructor</p>
              <TiArrowRightThick />
            </div>
          </div>
        </Link>

        {/* Hero Heading */}
        <div className="mt-8">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl">
            Empower Your Future With{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Coding Skills
            </span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            With our coding resources, you can learn at your own pace, from anywhere in the world.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <CTAButton linkto={"/learnmore"} active={true}>
            Learn More
          </CTAButton>
          <CTAButton linkto={"/Demo"} active={false}>
            Book a Demo
          </CTAButton>
        </div>

        {/* Image with overlay */}
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto mt-12 relative">
          <img 
            src={image} 
            alt="Student learning to code on laptop" 
            className="w-full h-auto relative z-10 rounded-lg shadow-2xl transition-all duration-300 hover:shadow-sky-500/20" 
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 z-0 rounded-lg"
            style={{
              background:
                "linear-gradient(to bottom, rgba(135,206,250,0.15), rgba(255,255,255,0.05), rgba(135,206,250,0.15))",
            }}
          ></div>

          {/* Shadow effect */}
          <div
            className="absolute inset-0 z-0 pointer-events-none rounded-lg"
            style={{
              boxShadow:
                "0 -5px 15px rgba(255,255,255,0.2), 0 5px 15px rgba(0,0,0,0.1)",
            }}
          ></div>
        </div>

        {/* Section 1 CodeBlock */}
        <div className="mt-20 w-full mx-auto   flex flex-row items-center justify-center">
          <CodeBlocks
            heading={
              <div className="text-2xl md:text-3xl font-bold ">
                Unlock Your{" "}
                <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Coding Potential
                </span>{" "}
                with Our Online Courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts to ensure you get the best learning experience."
            }
            postion={"lg:row"}
            cta1={{
              active: true,
              linkto: "/signup",
              text: "Try It Yourself",
            }}
            cta2={{
              active: false,
              linkto: "/login",
              text: "Learn More",
            }}
            codeblock={`<!doctype html>
<html>
<head><title>Hello</title></head>
<body>
<script>
function hello() {  console.log("Hello World");}
hello();
</script>
</body>
</html>`}
            codecolor={"text-yellow-300"}
          />
        </div>

        {/* Section 2 CodeBlock */}
        <div className="mt-20 w-full  flex flex-row items-center justify-center">
          <CodeBlocks
            heading={
              <div className="text-2xl md:text-3xl font-bold r">

                Start Your Journey{" "}
                <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                  From Beginner to Pro
                </span>
              </div>
            }
            subHeading={
              "Master the fundamentals and advance to complex projects with our structured learning path."
            }
            postion={"row-reverse"}
            cta1={{
              active: true,
              linkto: "/signup",
              text: "Get Started",
            }}
            cta2={{
              active: false,
              linkto: "/catalog",
              text: "View Courses",
            }}
            codeblock={`<!doctype html>
<html>
<head><title>Hello</title></head>
<body>
<script>
function hello() {  console.log("Hello World");}
hello();
</script>
</body>
</html>`}
            codecolor={"text-yellow-300"}
          />
        </div>
      </div>

      <div className="w-11/12 mx-auto max-w-7xl mt-24 ">
        <div className="flex flex-col items-center justify-between i text-white gap-9">
          <h1 className="font-bold text-3xl md:text-4xl text-center">
            Unlock The{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              Power Of Code
            </span>
          </h1>
          <p className="mb-8 text-slate-400 max-w-3xl text-center">
            Dive into our extensive library of coding resources, from beginner tutorials to advanced projects, and start your journey towards mastering programming today.
          </p>
          <SelectSection />
        </div>
        
      </div>

      {/* Footer CTA Section */}
      <div className="bg-gray-100 mt-24">
        <div className="home-page py-16 lg:py-20">
          <div className="w-11/12 flex flex-col sm:flex-row mx-auto items-center h-full max-w-7xl justify-center gap-6">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row items-center gap-2">
                Explore Now
                <TiArrowRightThick />
              </div>
            </CTAButton>

            <CTAButton active={false} linkto={"/catalog"}>
             Check courses
            </CTAButton>
          </div>
        </div>

        <div className="w-11/12 flex flex-col mx-auto max-w-7xl justify-between gap-7 pb-16">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mt-10 mb-10">
            {/* left div */}
            <div className="text-2xl md:text-3xl lg:text-4xl w-full lg:w-[45%] px-0 lg:px-10 font-bold text-center lg:text-left">
              Get the Skills You Need for a{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
                Bright Future
              </span>
            </div>
            
            {/* right div */}
            <div className="flex flex-col gap-6 w-full lg:w-[40%] items-center">
              <div className="text-slate-400 text-center lg:text-left">
                Join thousands of learners who have transformed their careers through our comprehensive courses and expert guidance.
              </div>

              <CTAButton active={true} linkto={"/signup"}>
                <div>Explore More</div>
              </CTAButton>
            </div>
          </div>
          
          <TimeLine />
          <LearningLanguage />
        </div>
      </div>

      <Instructor />
      <Footer />
    </div>
  );
}

export default Home;