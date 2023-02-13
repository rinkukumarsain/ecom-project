const { success, error } = require("../../responseApi/responseApi");


const fingertips=async(req,res)=>{
    const staticData=
        {
            videoUrl:"https://www.youtube-nocookie.com/embed/tXHviS-4ygo?autoplay=0&controls=0&disablekb=1&playsinline=1&cc_load_policy=0&cc_lang_pref=auto&widget_referrer=file%3A%2F%2F%2FC%3A%2FUsers%2Fsm318%2FDownloads%2Feduport.webestica.com%2Feduport.webestica.com%2Findex.html&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=true&enablejsapi=1&widgetid=1",
            OnlineCourses:"10K",
            ExpertTutors:"200+",
            OnlineStudents:"60K+",
            CertifiedCourses:"6K+"
        }
        if(staticData)
        {
            success(res, "Success", 200, staticData)
        }else{
            error(res,"No Data Found",400)
        }
}
module.exports={fingertips}