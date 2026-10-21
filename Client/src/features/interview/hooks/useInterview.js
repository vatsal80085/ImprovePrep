import {getAllInterviewReports, getInterviewReportById, generateInterviewReport} from "../services/interview.api.js"
import {useCallback, useContext} from "react"
import {InterviewContext} from "../interview.context.jsx"

export const useInterview=()=>{

    const context=useContext(InterviewContext)
    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }
    const {loading,setLoading,report,setReport,reports,setReports}=context
    
    const generateReport=useCallback(async({resumeFile,selfDescription,jobDescription})=>{
        setLoading(true)
        try{
            const response=await generateInterviewReport({resumeFile,selfDescription,jobDescription})
            setReport(response.interviewReport)
            return response
        } catch (error) {
            console.error("Error generating interview report:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }, [setLoading, setReport])

    const getReportById=useCallback(async(interviewId)=>{
        setLoading(true)
        try{
            const response=await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
            return response
        } catch (error) {
            console.error("Error fetching interview report by ID:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }, [setLoading, setReport])

    const getAllReports=useCallback(async()=>{
        setLoading(true)
        try{
            const response=await getAllInterviewReports()
            setReports(response.interviewReports)
            return response
        } catch (error) {
            console.error("Error fetching all interview reports:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }, [setLoading, setReports])

    return {loading,setLoading,report,setReport,reports,setReports, generateReport, getReportById,getAllReports}
}