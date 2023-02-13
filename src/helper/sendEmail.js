const nodemailer=require('nodemailer')
const mail=(to,sub,msg)=>{
let transport=nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
            user:'sunilmoond.img@gmail.com',
            pass:'mwpknffaibbnmhnz'
        }
    }
)

var mailoption={
    from:'sunilmoond.img@gmail.com',
    to:to,
    subject:sub,
    html:msg
}

transport.sendMail(mailoption,function(err,info){
    if(err)
    {
        console.log(err)
    }
    else{
        console.log("email sent",)
    }
})
}

function genrateotp(msg)
{     
return(` <div id="otp" style="
    padding: 10px;
    text-align: center;
    background: rgb(40, 48, 70);
    color: rgb(208, 210, 214);
    border-radius: 10px;">
   ${msg}
</div>`)
}

module.exports={mail,genrateotp}