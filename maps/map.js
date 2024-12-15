const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('google maps');
})

app.get('/distance', (req, res) => {
    res.status(200).json({
        distance : "5km"
    })
})

app.listen(3001, ()=>{
    console.log("server is running on port 3001")
})