import express from"express"
import { createCourse,getAllCourse,FullCourseDetails,CourseDetails,updateCourse ,DeleteCourse,purchasedPayment} from "../controllers/Course.js";
import { auth,isInstructor ,isStudent,isAdmin} from "../middleware/verify.js";
import { CreateSection ,UpdateSection,deleteSection} from "../controllers/Section.js";
import { createSubSection,updateSubSection,deleteSunSection } from "../controllers/SubSection.js";
import { createReviews,averageRating,getAllReviews } from "../controllers/RatingandReviews.js";
import { createCategory,showCategory,getCategoryDetails} from "../controllers/Category.js";


const Router =express.Router()
Router.post("/createcourse",auth,isInstructor ,createCourse)
Router.get("/getAllCourse", auth,getAllCourse)
Router.post("/FullCourseDetails", auth,FullCourseDetails)
Router.post("/CourseDetails",auth,CourseDetails)
Router.put("/updateCourse",auth,isInstructor,updateCourse)
Router.delete("/deleteCourse",auth,isInstructor,DeleteCourse)


/*section routes*/
Router.post("/CreateSection",auth,isInstructor,CreateSection )
Router.put("/UpdateSection",auth,isInstructor,UpdateSection)
Router.delete("/DeleteSection",auth,isInstructor,deleteSection)
/*subsection */
Router.post("/createSubsection",auth,isInstructor,createSubSection)
Router.put("/updateSubsection",auth,isInstructor,updateSubSection)
Router.delete("/deletesubsection",auth,isInstructor,deleteSunSection)

/*ratingandreviews*/
Router.post("/createratingandreviews",auth,isStudent,createReviews)
Router.post("/averageratingandreviews",averageRating)
Router.get("/getAllReviewsandreviews",getAllReviews)
/*createCategory*/
Router.post("/createCategory",auth,isAdmin,createCategory)
Router.get("/showCategory",showCategory)
Router.post("/getCategoryDetails",getCategoryDetails)



/* purchase Payment */
Router.post("/payment",auth,purchasedPayment)

export default Router