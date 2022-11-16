
setTimeout(() => {
    console.log("2 second are up");
}, 2000);

const name = ['mohit','neeraj','chirag'];
const shortName = name.filter((name) => name.length == 5)

const geocode = (address,callBack) => {
    setTimeout(() => {
        const data = {
            log:0,
            lat:0
        }
        callBack(data);
    },2000);
}

geocode('indore',(data)=> {
    console.log(data);
});