const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

let address = process.argv[2]

if(!address) {
   return console.log("Please Provide Address.....");
} else {
    geocode(address, (err, obj) => {
        if (err) {
            return console.log(err);
        }
        forcast(obj.Latitude, obj.Logitude, (err, data) => {
            if (err) {
                return console.log(err);
            }
            console.log('[' + data.weather_descriptions[0] + ']' + '. It is currently ' + data.temperature + '°C degrees out. This feels like ' + data.feelslike + '°C.');
        })
    })   
}