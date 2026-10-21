import axios from "axios";

const api=axios.create({
    baseURL: "http://localhost:3000",
    withCredentials:true,

})

/**
 * 
 * @description Service to generate new interview report on the basis of user self description,resume pdf and job desciption 
 */
export const generateInterviewReport=async({resumeFile,selfDescription,jobDescription})=>{
    const formData=new FormData()
    formData.append("resume",resumeFile)
    formData.append("selfDescription",selfDescription)
    formData.append("jobDescription",jobDescription)

    const response=await api.post("/api/interview",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    return response.data
}

/**
 * 
 * @description Service to get interview report by interviewId
 */
export const getInterviewReportById=async(interviewId)=>{
    const response=await api.get(`/api/interview/${interviewId}`)
    return response.data
}

/**
 * 
 * @description Service to get all interview reports of the user
 */
export const getAllInterviewReports=async()=>{
    const response=await api.get("/api/interview")
    return response.data
}
