let categoryModel = require("../../model/mostPopularCourses");
const { success, error } = require("../../responseApi/responseApi");
const { Aggregate } = require("mongoose");
let mongoose = require("mongoose");

// recursion adding subchild under parent
// let mostPopularCourses = async (req, res) => {
//   try {
//     let find = await categoryModel.find();
//     let root = [];
//     let child = [];

//     find.forEach((node) => {
//       if (node.category == null && !node.trending) return root.push(node);
//       if (node.category) return child.push(node);
//     });

//     function recursion(child, root) {
//       for (var a of root) {
//         a._doc.subcategory = [];
//         for (var b of child) {
//           if (b.category.toString() == a._id.toString()) {
//             a._doc.subcategory.push(b);
//           }
//         }
//         if (a._doc.subcategory != null) {
//           recursion(child, a._doc.subcategory);
//         }
//       }
//     }
//     recursion(child, root);
//     if (root) {
//       success(res, "Success", 200, root);
//     } else {
//       error(res, "Failed", 400);
//     }

//   } catch (e) {
//     console.log(e)
//   }
// };

let mostPopularCourses=async(req,res)=>{
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
                      '$popular', 1
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

  const aggCursor = await categoryModel.aggregate(pipe);
  if(aggCursor)
  {
    success(res, " Success", 200,aggCursor);
  }
  else{
    error(res, "Failed", 400);
  }
}
module.exports = {
  mostPopularCourses,
};
