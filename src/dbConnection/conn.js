let mongoose=require('mongoose')
mongoose.set('strictQuery', true)
const url='mongodb://127.0.0.1:27017/niceAdmin';
 mongoose.connect(url).then(()=>{console.log("connection sussessfuly ")}).catch((e)=>{console.log(e)})
