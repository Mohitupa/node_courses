const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setInterval(() => {
            if(a < 0 ||  b < 0) {
                reject("Must be Positive number")
            }
            resolve(a + b)
        }, 2000);
    })
}




const doWork = async () => {
    let sum1 = await add(1,99)
    let sum2 = await add(1,79)
    return sum1+sum2;
}

doWork().then((res) => {
    console.log(res);
}).catch((e) => {
    console.log('e',e);
})

// add(1, 2).then((res) => {
    //     console.log('Success!', res);
    //     return add(res, 6);
    // }).then((res) => {
    //     console.log('Success!', res);
    // }).catch((err) => {
    //     console.log('Error!', err);
    // })