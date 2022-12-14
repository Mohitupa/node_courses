const { default: mongoose } = require('mongoose');


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    desc: {
        type: String,
        required: true,
        trim: true,
    },
    completed: { type: Boolean, default: false },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

const Tasks = mongoose.model('task', taskSchema)

module.exports = Tasks;