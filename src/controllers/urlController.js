const urlModel = require('../models/urlModel');
const validUrl = require('valid-url')
const shortid = require('shortid');

const baseUrl = 'http:localhost:3000'
const generateUrl=async function(req,res){
   
    //destructuring
    const {longUrl} = req.body 
    
    //check base url is valid or not
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).send({status:false, msg:'Invalid base URL'})
    }
    const urlCode = shortid.generate()
   
    //check long url is valid or not
    if (validUrl.isUri(longUrl)){
        try{
        let url= await urlModel.findOne({longUrl}).select({longUrl:1, shortUrl:1, urlCode:1 } )
        if(url){
            res.status(200).send({status:true,data:url})
        }
        else{
            const shortUrl = baseUrl + '/' + urlCode
            let shortUrlInLowerCase=shortUrl.toLowerCase()
        
            url ={
                longUrl:longUrl,
                shortUrl:shortUrlInLowerCase,
                urlCode:urlCode,
                
            }
            
            const myShortUrl=await urlModel.create(url)

        res.status(201).send({status:true,data:myShortUrl})
    }
}
catch(err){
    res.status(500).send({status:false,msg:err.message})

}
}
    else{
        res.status(401).send("Invalid long url")
    }
}

//.select({longUrl:1, shortUrl:1, urlCode:1 } )


//--------------------------------------------------------------------------------------------------

const redirectToUrlCode=async function(req,res){
    try{
    const urlCode=req.params.urlCode
    const findUrl=await urlModel.findOne({urlCode:urlCode})
    if (findUrl) {
        // when valid we perform a redirect
        res.status(302).redirect(findUrl.longUrl)
        } else {
        // else return a not found 404 status
        return res.status(404).json('No URL Found')
    }
}
catch(err){
    return res.status(500).send({status:false, msg:err.message})
}
}



module.exports.redirectToUrlCode=redirectToUrlCode
module.exports.generateUrl=generateUrl














/*const collegeModel = require('../models/collegeModel');

//---------------------------Validation Functions---------------------------------------------------------

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}


//----------------------------------------------------------------------------------------------------------
const createCollege = async function (req, res) {
    try{
        if (!isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide college details' })
        }
        let {name,fullName,logoLink}=req.body
        
        if(!isValid(name)) {
            res.status(400).send({status: false, message: `name is required`})
            return
        }

        if(!isValid(fullName)) {
            res.status(400).send({status: false, message: `fullName is required`})
            return
        }

        if(!isValid(logoLink)) {
            res.status(400).send({status: false, message: `logoLink is required`})
            return
        }

        if(!(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(logoLink) &&logoLink.includes(".com")==true)) {
            res.status(400).send({status: false, message: `logoLink is not a valid URL`})
            return
        }
        
        let createdCollege= await collegeModel.create(req.body)
        res.status(201).send({ status:true, msg:createdCollege})
} 
catch(err){
    res.status(500).send({status:false,data:err});
    console.log(err)
}
}



module.exports = { createCollege }
*/
/*
min length in mobile number
line 21 in college comtroller-these are keys or their values?
how did you got code for logo link verification
for keys whose unique:true then there too we have to check for duplicacy like email or mobile
is line 66-69 required in internsController
*/
//undefined means something that is not declared
