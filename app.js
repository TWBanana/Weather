const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

// parse the body of the post request
app.use(express.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

// catch the request send from the client, <form action="post">
app.post("/", function(req, res) {
    
    // this can retrieve the input from the client, where input name="cityName" in index.html
    const query = req.body.cityName;

    const apiKey = "73cfb9536b85fb31365e2ac3c78c18fe";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query 
                +"&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response);
        // get back the data in Hexadecimal data
        response.on("data", function(data) {
            // convert to json
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            // convert json to string
            // const object = {
            //     name: "kevin",
            //     favouriteFood: "Apple"
            // }
            // console.log(JSON.stringify(object));

            // get specific the temp for data  
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is current: " + weatherDescription +"</p>");
            res.write("<h1>The tempature in " + query + " is: " + temp + "</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
            
        })
    });
})






app.listen(3000, function() {
    console.log("Server is running on port 3000");
})