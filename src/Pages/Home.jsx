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

function Hero() {
  return (
    <div className="w-full min-h-screen">
      <div className="relative flex flex-col mx-auto text-center w-11/12 items-center text-white justify-between ">

        {/* Become Instructor Button */}
        <Link to="/signup">
          <div className="group mx-auto mt-[80px]">
            <div className="flex flex-row gap-2 items-center 
                            bg-[#181B1E] text-gray-500 
                            px-4 py-1 rounded-full border 
                            transition-all duration-200 
                            hover:scale-110 hover:bg-[#010B13] w-fit">
              <p>Become an instructor</p>
              <TiArrowRightThick />
            </div>
          </div>
        </Link>

        {/* Hero Heading */}
        <div className="mt-4">
          <h1 className="font-bold text-2xl">
            Empower Your Future With <span className="text-sky-500">Coding Skills</span>
          </h1>
          <p className="mt-4">
            With our coding resources, you can learn at your own pace, from anywhere in the world.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4 mt-4 rounded">
          <CTAButton linkto={"/learnmore"} active={true}>
            LEARN MORE
          </CTAButton>
          <CTAButton linkto={"/Demo"} active={false}>
            Book a Demo
          </CTAButton>
        </div>

        {/* Image with overlay */}
        <div className="w-[45%] mx-auto mt-8 relative">
          <img src={image} className="w-full h-auto relative z-10 rounded-lg" />

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
        <div>
          <CodeBlocks
            heading={
              <div className="text-xl font-bold">
                Unlock Your <span className="text-sky-500">Coding potential</span> with our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts to ensure you get the best learning experience."
            }
            postion={"lg:row"}
            cta1={{
              active: true,
              linkto: "/signup",
              text: "try it yourself",
            }}
            cta2={{
              active: false,
              linkto: "/login",
              text: "learn more",
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
        <div>
          <CodeBlocks
            heading={
              <div className="text-xl font-bold">
                Unlock Your <span className="text-sky-500">Coding potential</span> with our online courses
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts to ensure you get the best learning experience."
            }
            postion={"row-reverse"}
            cta1={{
              active: true,
              linkto: "/signup",
              text: "try it yourself",
            }}
            cta2={{
              active: false,
              linkto: "/login",
              text: "learn more",
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

      <div className="w-11/12 mx-auto max-w-content     ">
            <div className="flex flex-col items-center justify-between  text-white gap-4">

              <h1 className="font-bold text-3xl  ">
                Unlock The  <span className="text-sky-600">Power Of Code</span>
              </h1>
              <p className="mb-4">
                Dive into our extensive library of coding resources, from beginner tutorials to advanced projects, and start your journey towards mastering programming today.
              </p>

                
               
            </div>
              <SelectSection />


      

      </div>
    

      {/* Footer CTA Section */}
      <div className="bg-gray-100">
        <div className="home-page lg:h-[333px]">
          <div className="w-11/12 flex flex-row mx-auto items-center h-full max-w-maxContent justify-center gap-5">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row items-center gap-2">
                explore now
                <TiArrowRightThick />
              </div>
            </CTAButton>

            <CTAButton active={false} linkto={"/login"}>
              explore more
            </CTAButton>
          </div>


             

        </div>


  <div className="w-11/12 flex flex-col mx-auto  max-w-maxContent justify-between  gap-7   ">
           <div className="flex flex-row  justify-center mt-10 mb-10">
            {/* left div */}
              <div className="text-3xl w-[45%] px-10 font-bold">
                Get the skills you need for a <span className="text-sky-500" >bright future</span>
              </div>
              {/* right div */}
              <div className="flex flex-col gap-3 w-[40%] items-center ">
                 <div>
                  the info i supposed to write 
                 </div>

                
                <CTAButton active={true} linkto={"/signup"} >
                <div>
                explore more  
                 </div>
                </CTAButton>
                 
              </div>
           </div>
                 <TimeLine />
                 <LearningLanguage />

              </div>
      </div>

          <Instructor />


    </div>
  );
}

export default Hero;
