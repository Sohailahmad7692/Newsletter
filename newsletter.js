const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const https=require('https')
const { response } = require('express')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/newsletter.html')
})
app.post('/',(req,res)=>{
    const firstname=req.body.firstname
    const lastname=req.body.lastname
    const email=req.body.email
    const data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname
            }
        }]
    }
    const jsonData=JSON.stringify(data)
    const url='https://us2.api.mailchimp.com/3.0/lists/d85206e1bd'
    const options={
        method:"POST",
        auth:"sohailahmad:ce487c7fccc7235f9f1de7ac7e3c5274-us2"
    }
    const request=https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
        if (response.statusCode===200){
            res.sendFile(__dirname+'/success.html')
        }
        else{
            res.sendFile(__dirname+'/Failure.html')
        }
    })
    request.write(jsonData)
    request.end()

    console.log(firstname,lastname,email)
    // res.send(`<h1>${firstname}</h1>`)
})
// ce487c7fccc7235f9f1de7ac7e3c5274-us2
// d85206e1bd
app.listen(process.env.PORT||800,()=>{
    console.log('server is running')
})