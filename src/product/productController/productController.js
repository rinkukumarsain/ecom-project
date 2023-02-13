const mostPopularCourses = require('../../model/mostPopularCourses');
const { Aggregate } = require("mongoose");
const { success, error } = require("../../responseApi/responseApi");
let ourTrendingCourses=async(req,res)=>{

  let pipe=[
    {
      '$lookup': {
        'from': 'products', 
        'let': {
          'id': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$category', '$$id'
                    ]
                  }, {
                    '$eq': [
                      '$trending', 1
                    ]
                  }
                ]
              }
            }
          }
        ], 
        'as': 'subcategory'
      }
    }
  ]

  const aggCursor = await mostPopularCourses.aggregate(pipe);
  if(aggCursor)
  {
    success(res, " Success", 200,aggCursor);
  }
  else{
    error(res, "Failed", 400);
  }
}
module.exports={ourTrendingCourses}