let mongoose=require('mongoose')
mongoose.set('strictQuery', true)
let url=process.env.URL
 mongoose.connect(url).then(()=>{console.log("connection sussessfuly ")}).catch((e)=>{console.log(e)})
