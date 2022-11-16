const express = require("express");
const multer = require("multer");
const sharp = require('sharp');
const User = require("../model/user");
const auth = require("./../middleware/auth");
const router = new express.Router();

router.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.genrateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }

    // user.save().then(() => {
    //     res.send(user);
    // }).catch((err) => {
    //     res.status(201).status(400);
    //     res.send(err);
    // });
});

router.post("/users/login", async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.send("Fields is required");
        }
        const user = await User.findByCradential(req.body.email, req.body.password);
        const token = await user.genrateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = await req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        // console.log(req.user.tokens);
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/users/logoutAll", auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

// router.get('/users',auth, async (req, res) => {

//     try {
//         const users = await User.find({})
//         res.status(201).send(users);
//     } catch (err) {
//         res.status(500).send(err);
//     };

// User.find({}).then((users) => {
//     res.status(201).send(users);
// }).catch((err) => {
//     res.status(500).send();
// });
// })

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
});

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error("Please Upload png|jpg|jpeg Image"));
        }
        cb(undefined, true);
    },
});

router.post(
    "/users/me/avatar",
    auth,
    upload.single("avatar"),
    async (req, res) => {
        // req.user.avatar = req.file.buffer;
        const buffer = await sharp(req.file.buffer).resize({width:250,height: 250}).png().toBuffer();
        req.user.avatar = buffer;
        await req.user.save();
        res.send("uploaded");
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);

router.get(
    "/users/:id/avatar",
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user || !user.avatar) {
                throw new Error();
            }
            res.set('Content','images/png');
            res.send(user.avatar);
        } catch (err) {
            res.status(404).send();
        }
    }
)

router.delete("/users/me/avatar", auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send("Deleted");
});

// router.get('/users/:id', async (req, res) => {
//     let _id = req.params.id;

//     try {
//         let user = await User.findById(_id);
//         if (!user) {
//             return res.status(404).send('Error!, User Not Found.');
//         }
//         res.status(201).send(user);
//     } catch (err) {
//         res.status(500).send(err);
//     };

//     // User.findById(_id).then((user) => {
//     //     if (!user) {
//     //         return res.status(404).send('Error!, User Not Found.');
//     //     }
//     //     res.status(201).send(user);
//     // }).catch((err) => {
//     //     res.status(500).send();
//     // });
// })

router.patch("/users/me", auth, async (req, res) => {
    let updates = Object.keys(req.body);
    const allowUpdate = ["name", "email", "password", "age"];
    const isValidOpration = updates.every((update) =>
        allowUpdate.includes(update)
    );
    // let _id = req.params.id;

    if (!isValidOpration) {
        return res.status(404).send("Error!,  Invalid Update.");
    }
    console.log(req.user);

    try {
        // const user = await User.findById(_id);
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();

        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        // if (!user) {
        //     return res.status(404).send('Error!, User Not Found.');
        // }
        res.status(201).send(req.user);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.delete("/users/me", auth, async (req, res) => {
    // let _id = req.params.id;
    let _id = req.user._id;

    try {
        // const user = await User.findByIdAndDelete(_id)
        // if (!user) {
        //     return res.status(404).send('Error!, User Not Found.');
        // }
        await req.user.remove();
        res.status(200).send(req.user);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
