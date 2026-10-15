const mongoose = require("mongoose");

/**
 * - job description schema:string
 * - resume text:string
 * - self description:string
 * 
 * - match score:number
 *
 * -technical questions: [{question:"", answer:"", intention:""}] array
 * - behavioral questions: [{question:"", answer:"", intention:""}] array
 * - skills gaps: [{
 *                  skill:"", 
 *                  severity:
 *                          {type: string,
 *                           enum: ["low", "medium", "high"]
 *                          }
 *                    }] array
 * - preparation plan: [{
 *                          day:number,
 *                          focus:string,
 *                         tasks:[{task:string}]
 *                      }] array of objects
 *
 */

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true,"Question is required"],
    },
    intention:{
        type: String,
        required: [true,"Intention is required"],
    },
    answer:{
        type: String,
        required: [true,"Answer is required"],
    },
},
{
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true,"Question is required"],
    },
    intention:{
        type: String,
        required: [true,"Intention is required"],
    },
    answer:{
        type: String,
        required: [true,"Answer is required"],
    },
},
{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type: String,
        required: [true,"Skill is required"],
    },
    severity:{
        type: String,
        enum: ["low", "medium", "high"],
        required: [true,"Severity is required"],
    }
},
{
    _id: false
})

const preparationPlanSchema = new mongoose.Schema({
    day:{
        type: Number,
        required: [true,"Day is required"],
    },
    focus:{
        type: String,
        required: [true,"Focus is required"],
    },
    tasks: [{
        type: String,
        required: [true, "Task is required"],
    }]
},
{
    _id: false
})

const InterviewReportSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  jobDescription: {
    type: String,
    required: [true,"Job description is required"],
  },
    resume: {
    type: String,
    },
    selfDescription: {
        type: String,
    },
    matchScore: {
        type: Number,
        min:0,
        max:100,
    },
    technicalQuestions: [ technicalQuestionSchema ],
    behavioralQuestions: [ behavioralQuestionSchema ],
    skillGaps: [ skillGapSchema ],
    preparationPlan: [ preparationPlanSchema ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{
    timestamps: true
})

const interviewReportModel = mongoose.model("InterviewReport", InterviewReportSchema);

module.exports = interviewReportModel;