let mongooose=require('mongoose')
const jwt=require('jsonwebtoken')
let registerSchema=new mongooose.Schema({

    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    confirmpassword:{
        type:String,
        require:true
    },
    otp:{
        type:Number
    },
    otpExpireTime:{
        type: Date
    },
    tokens:[{
        tokenobj:{
            type:"string",
            required:true
        }
   }]
})

registerSchema.methods.generateAuthToken=async function(){

    try{
        const token=jwt.sign({_id:this._id.toString(),email:this.email.toString()},process.env.SECRATE_KEY)
        this.tokens=this.tokens.concat({tokenobj:token}) 
        await this.save()
        return token
    }catch(e){
        console.log(e)
    }
}

let registerModle = mongooose.model('registerModle',registerSchema);
module.exports=registerModle