// const doWorkPromise = new Promise((resolve,reject)=> {
//     setTimeout(()=>{
//         reject('This went wrong!');
//         resolve([0,7,2]);
//         // console.log();
//     }, 2000)
// })

// doWorkPromise.then((res)=> {
//     console.log('Success!',res);
// }).catch((err) => {
//     console.log('Error!',err);
// })

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setInterval(() => {
            resolve(a + b)
        }, 2000);
    })
}


// add(1, 2).then((res) => {
//     console.log('Success!', res);
//     add(res, 6).then((res) => {
//         console.log('Success!', res);
//     }).catch((err) => {
//         console.log('Error!', err);
//     })
// }).catch((err) => {
//     console.log('Error!', err);
// })

add(1, 2).then((res) => {
    console.log('Success!', res);
    return add(res, 6);
}).then((res) => {
    console.log('Success!', res);
}).catch((err) => {
    console.log('Error!', err);
})