const express = require("express")
const axios = require("axios")
const app = express()
const port = process.env.PORT || 3000


app.get('/api/hello', async(req, res) => {
  const visitorName = req.query.visitor_name || "Guest";
  const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  
  try {
    const apiKey = "eebe210d5d17431d88f200351240107"
    const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${clientIP}`)
    const weatherData = weatherResponse.data 
    const temperature = weatherData.current.temp_c;


    const locationResponse = await axios.get(`https://ipapi.co/${clientIP}/json/`);
    const locationData = locationResponse.data;
    const city = locationData.city || 'Unknown Location';
    res.json({
      client_ip: clientIP,
      location: city,
      greeting: `Hello, ${visitorName}!, the weather is ${temperature} degrees Celsius today in ${city}`
    })


  } catch (error) {
    res.status(500).json({error: "An error occured ", details: error.message})
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})