const express = require('express');

const sequelize = require("./db/database")
const Appointments = require("./models/appointment");
const Ctas = require("./models/cta");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

let pateint = null;

sequelize
    .sync({ force: true })
    // sync()
    .then((result) => {
        return Appointments.create({
            name: "mohit Upadhyay",
            description: "CTA",
            email: "mohitu531@gmail.com",
            contact_number: "+918770792589",
            date: "2022-11-29",
            time: "22:00"
        })
        // console.log(result);
    })
    .then((appointment) => {
        pateint = appointment.id
        // console.log(res);
        return Ctas.create({
            title: "CTA",
            description: "CTA Pateint for 3 year",
            image: "./cta1.png"
        })
    }).then((cta) => {
        // console.log(cta);
        return Appointments.findAll()
        // return Appointments.findAll({ where: pateint })
    }).then((user) => {
        // console.log(user);
    })
    .catch((err) => {
        console.log(err);
    })



app.listen(port, () => {
    console.log("server is listening at " + port);
})