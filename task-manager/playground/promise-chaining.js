require('./../src/db/mongoose');
const User = require('./../src/model/user');

// 635a846712b145e535a81b33
// User.findByIdAndUpdate('635b59964028641db9d46ce6',{age : 22}).then((res)=>{
//     console.log(res);
//     return User.countDocuments({age: 22});
// }).then((res)=>{
//     console.log(res);
// })

const updateAge = async (id,age)=> {
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age: age});
    return count;
}

updateAge('635b59964028641db9d46ce6',21).then((res)=>{
    console.log(res);
}).catch((e)=>{
    console.log(e);
})