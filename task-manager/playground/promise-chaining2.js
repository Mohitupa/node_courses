require('./../src/db/mongoose');
const Task = require('./../src/model/task');

// User.findByIdAndDelete('635a85ec0fdb752cd1474731').then((res)=>{
//     console.log(res);
//     return User.countDocuments({});
// }).then((res)=>{
//     console.log(res);
// })

const taskDeleteById = async (id) => {
    const task = Task.findByIdAndDelete(id);
    const count = Task.countDocuments({});
    return task;
}

taskDeleteById('635b939b434fdb4d060b2d71').then((res) => {
    console.log(res);
}).catch((e) => {
    console.log(e);
})
