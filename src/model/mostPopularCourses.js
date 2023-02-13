// const { number } = require('joi')
const mongoose=require('mongoose')

let categoryschema= mongoose.Schema({

    name:{
        type:String
    },
    slug:{
        type:String
    },
    content:{
        type:String
    },
    image:{
        type:String
    },
     category:{
       type: mongoose.Schema.Types.ObjectId
    }
  
})

let mostPopularCoursesModel=new mongoose.model('mostPopularCourses',categoryschema)

module.exports=mostPopularCoursesModel