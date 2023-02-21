let jwt=require('jsonwebtoken')

module.exports =  model=> async(req,res,next) =>{

    try{
        if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(" ").pop()
        const {_id}=jwt.verify(token,process.env.SECRATE_KEY)
        const data = await model.findOne({_id})
        req.user = data 
        return  next()
        }else{
            res.status(401).send({
                status: false,
                message: "token not found",
                data:[]
            })
        }
    }
    catch(e){
        res.status(401).send({
            status: false,
            message: "invalid token",
            data:[]
        })
    }
}