import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BookOpen, Tag, User, PlayCircle, CheckCircle, Star } from "lucide-react";
import { connectionApi } from "../../services/apiconnector";
import { Ratings } from "../../services/apis";
import CategoryCourseDetails from "./CategoryCourseDetails";

const Coursedetails = () => {
  const location = useLocation();
  const data = location.state.details;
  console.log(data)
 return(
  <>
    <CategoryCourseDetails  data={data}/>
  </>
 )
}
export default Coursedetails;