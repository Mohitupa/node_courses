const http = require('http');

const url = "http://api.weatherstack.com/current?access_key=4965c94f7ec428f216e90d18485002fb&query=22,75&units=m";

const req = http.request(url,(res) => {
    let data = '';
    res.on('data',(chunk) => {
        data = data + chunk.toString()
    })

    res.on('end',() => {
        const body = JSON.parse(data);
        console.log(body);
    })
})

req.on('error',(err)=> {
    console.log("error: undifiend", err);
})
req.end();