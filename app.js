const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser")
const https = require("https")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;

var data = {
  members : [
    {
      email_address : email,
      status : "subscribed",
      merge_fields : {
        FNAME : fName,
        LNAME : lName
      }
    }
  ]
}

const jsonData = JSON.stringify(data);

const url = "https://us18.api.mailchimp.com/3.0/lists/fe8eb1ce49"
const options = {
  method : "post",
  auth : "Mohamed:510e32495d06224a9a1d213a8bb610ad-us18"
}


const request = https.request(url, options, function(response){
if (response.statusCode === 200){
  res.sendFile(__dirname + "/success.html")
}
else{
  res.sendFile(__dirname + "/failure.html")
}

  response.on("data", function(data){
    console.log(JSON.parse(data));
    console.log(response.statusCode);
  })
})

request.write(jsonData);
request.end()

})


app.post("/failure", function(req, res){
  res.redirect("/")
})




app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
})


// api key:
// 510e32495d06224a9a1d213a8bb610ad-us18

// audience id:
// fe8eb1ce49
