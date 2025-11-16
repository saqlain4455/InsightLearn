
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const controller={
    CATEGORIES_API:BASE_URL+"/course/showCategory",
    GETDETAILSBYID:BASE_URL+"/course/getCategoryDetails",
    
}
export const Auth={
    USER_INFO:BASE_URL+"/user/userinfo",
    GENERATE_OTP:BASE_URL+"/user/sendotp",
    SIGN_UP:BASE_URL+"/user/Signup",
    LOGIN:BASE_URL+"/user/Login"
}

export  const Course ={
    CREATE_COURSE:BASE_URL+"/course/createcourse",
    GET_DETAILS:BASE_URL+"/course/CourseDetails",
    GETFULL_COURSEDETAILS:BASE_URL+"/course/FullCourseDetails",
    PAYMENT_ID:BASE_URL+"/course/payment"
}
export const section ={
    CREATE_SECTION:BASE_URL+"/course/CreateSection"
}
export const subsection={
    CREATE_SUBSECTION:BASE_URL+"/course/createSubsection",
    
}
export  const User={
    GET_USER_DETAILS:BASE_URL+"/user/userinfo"
}

export const Ratings ={
    CREATE_REVIEW:BASE_URL+"/course/createratingandreviews"
}

export const contact={
        CREATE_CONTACT:BASE_URL+"/Profile/send"
}