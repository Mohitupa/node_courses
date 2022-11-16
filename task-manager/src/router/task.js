const express = require('express');
const auth = require("./../middleware/auth")
const Tasks = require('../model/task')

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
    // const task = new Tasks(req.body);
    const task = new Tasks({
        ...req.body, owner: req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send(err);
    }

    // task.save().then(() => { 
    //     res.status(201).send(task);
    // }).catch((err) => {
    //     res.status(400).send(err);
    // });
})

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=0
//GET /tasks?shortBy=createAt_dec
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        // sort[parts[0]] = parts[1] === 'decs' ? -1 : 1;
        sort[parts[0]] = parts[1]
    }
    try {
        // const task = await Tasks.find({ owner: req.user._id });
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort
            }
        });
        res.status(201).send(req.user.tasks);
    } catch (err) {
        res.status(500).send(err);
    }

    // Tasks.find({}).then((tasks) => {
    //     res.status(201).send(tasks);
    // }).catch((err) => {
    //     res.status(500).send();
    // });
})


router.get('/tasks/:id', auth, async (req, res) => {
    let _id = req.params.id;

    try {
        let task = await Tasks.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send('Error!, Task not found.');
        }
        res.status(201).send(task);
    } catch (err) {
        res.status(500).send(err);
    }

    // Tasks.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send('Error!, Task not found.');
    //     }
    //     res.status(201).send(task);
    // }).catch((err) => {
    //     res.status(500).send();
    // });
})


router.patch('/tasks/:id', auth, async (req, res) => {
    let updates = Object.keys(req.body)
    const allowUpdate = ['title', 'desc', 'completed'];
    const isValidOpration = updates.every((update) => allowUpdate.includes(update))
    let _id = req.params.id;

    if (!isValidOpration) {
        return res.status(404).send('Error!,  Invalid Update.');
    }

    try {
        const task = await Tasks.findById({ _id, owner: req.user._id });
        // const task = await Tasks.findById(_id);
        // const task = await Tasks.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send('Error!, Task Not Found.');
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save();

        res.status(201).send(task);
    } catch (err) {
        res.status(404).send(err);
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    let _id = req.params.id;

    try {
        const task = await Tasks.findByIdAndDelete({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send('Error!, Task Not Found.');
        }
        res.status(200).send(task);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;