
// -----------------------------------------------------------------------------------------------------------
// Create a database named "task-manager" and CRUD Opration: CREATE READ UPDATE DELETE

// var mongodb = require('mongodb')
// var MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;

const { MongoClient, ObjectId } = require('mongodb')

var url = "mongodb://localhost:27017/task-manager";
var mydb = 'task-manager';

const id = new ObjectId()
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {

    if (err) {
        return console.log("unable to create database");
    };
    console.log("Database created!");

    var dbo = db.db(mydb);

    var myobj = { _id: id, name: "Mohit 45 Upadhyay", age: "22" };
    dbo.collection("users").insertOne(myobj, (err, res) => {
        if (err) {
            return console.log("unable to insert data");
        }

        console.log(res.ops);
        console.log("1 document inserted");
        db.close();
    });

    var myobj = [
        { name: "Mohit Upadhyay", age: "22" },
        { name: "Neeraj", age: "21" },
        { name: "Chirag", age: "24" },
        { name: "Ajay", age: "25" }
    ];
    dbo.collection("users").insertMany(myobj, (err, res) => {
        if (err) {
            return console.log("unable to insert data");
        }
        console.log(res.ops);
        console.log("Many document inserted");
        db.close();
    });

    var myobj = [
        { title: 'Study', des: "Study", completed: "false" },
        { title: 'Dance practice', des: "Dance practice", completed: "false" },
        { title: 'Singing', des: "Singing", completed: "true" },
        { title: 'laundary', des: "loundary", completed: "false" }
    ];
    dbo.collection("tasks").insertMany(myobj, (err, res) => {
        if (err) {
            return console.log("unable to insert Task");
        }
        console.log(res.ops);
        console.log("Many Task inserted");
        db.close();
    });

});


const { MongoClient, ObjectId } = require('mongodb')

//Create a database named "task-manager" and CRUD Opration: CREATE READ UPDATE DELETE
var url = "mongodb://localhost:27017/task-manager";
var mydb = 'task-manager';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {

    if (err) {
        return console.log("unable to create database");
    };
    console.log("Database created!");

    var dbo = db.db(mydb);

    var user = {
        _id: new ObjectId("635a2080ed9e1840d2381011")
    }
    dbo.collection('users').findOne(user, (err, res) => {
        if (err) {
            console.log("error in finding");
        }
        console.log(res);
        db.close();
    });

    dbo.collection('users').find({ age: "22" }).toArray((err, res) => {
        if (err) {
            console.log("error in finding");
        }
        console.log(res);
        db.close();
    });

    dbo.collection('users').find({ age: "22" }).count((err, res) => {
        console.log(res);
        db.close();
    });

    dbo.collection('tasks').findOne({ _id: new ObjectId('635a2409a62b1e447a802f44') }, (err, res) => {
        if (err) {
            return console.log(err);
        }
        console.log(res);
    })

    dbo.collection('tasks').find({ completed: "false" }).toArray((err, res) => {
        if (err) {
            return console.log(err);
        }
        console.log(res);
        db.close();
    })

});


const { MongoClient, ObjectId } = require('mongodb')

//Create a database named "task-manager" and CRUD Opration: CREATE READ UPDATE DELETE
var url = "mongodb://localhost:27017/task-manager";
var mydb = 'task-manager';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {

    if (err) {
        return console.log("unable to create database");
    };
    console.log("Database created!");

    var dbo = db.db(mydb);

    dbo.collection('users').updateOne(
        { _id: new ObjectId('635a27883199594968edc83b') },
        {
            $inc: { age: -1 }
        }
    ).then((res) => {
        console.log(res);
        db.close();
    }).catch((err) => {
        console.log(err);
        db.close();
    })

    dbo.collection('tasks').updateMany({ completed: false }, {
        $set: {
            completed: true
        }
    }).then((res) => {
        console.log(res);
        db.close();
    }).catch((err) => {
        console.log(err);
        db.close();
    })

});


const { MongoClient, ObjectId } = require('mongodb')

//Create a database named "task-manager" and CRUD Opration: CREATE READ UPDATE DELETE
var url = "mongodb://localhost:27017/task-manager";
var mydb = 'task-manager';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {

    if (err) {
        return console.log("unable to create database");
    };
    console.log("Database created!");

    var dbo = db.db(mydb);
    
        dbo.collection('users').deleteMany({ age: 22 })
        .then((res) => {
            console.log(res);
            db.close();
        }).catch((err) => {
            console.log(err);
            db.close();
        })

        dbo.collection('tasks').deleteOne({ title: 'Singing' })
        .then((res) => {
            console.log(res);
            db.close();
        }).catch((err) => {
            console.log(err);
            db.close();
        })
});

const { MongoClient, ObjectId } = require('mongodb')

//Create a database named "task-manager" and CRUD Opration: CREATE READ UPDATE DELETE
var url = "mongodb://localhost:27017/task-manager";
var mydb = 'task-manager';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {

    if (err) {
        return console.log("unable to create database");
    };
    console.log("Database created!");

    var dbo = db.db(mydb);

    // var myobj = {_id: id, name: "Mohit 45 Upadhyay", age: "22" };
    // dbo.collection("users").insertOne(myobj, (err, res) => {
    //     if (err) {
    //         return console.log("unable to insert data");
    //     }

    //     console.log(res.ops);
    //     console.log("1 document inserted");
    //     db.close();
    // });

    // var myobj = [
    //     { name: "Mohit Upadhyay", age: "22" },
    //     { name: "Neeraj", age: "21" },
    //     { name: "Chirag", age: "24" },
    //     { name: "Ajay", age: "25" }
    // ];
    // dbo.collection("users").insertMany(myobj, (err, res) => {
    //     if (err) {
    //         return console.log("unable to insert data");
    //     }
    //     console.log(res.ops);
    //     console.log("Many document inserted");
    //     db.close();
    // });

    // var myobj = [
    //     { title: 'Study', des: "Study", completed: "false" },
    //     { title: 'Dance practice', des: "Dance practice", completed: "false" },
    //     { title: 'Singing', des: "Singing", completed: "true" },
    //     { title: 'laundary', des: "loundary", completed: "false" }
    // ];
    // dbo.collection("tasks").insertMany(myobj, (err, res) => {
    //     if (err) {
    //         return console.log("unable to insert Task");
    //     }
    //     console.log(res.ops);
    //     console.log("Many Task inserted");
    // db.close();
    // });
    // var user = {
    //     _id: new ObjectId("635a2080ed9e1840d2381011")
    // }
    // dbo.collection('users').findOne(user, (err,res) => {
    //     if(err) {
    //         console.log("error in finding");
    //     } 
    //     console.log(res);
    //     db.close();
    // });

    // dbo.collection('users').find({ age: "22" }).toArray((err, res) => {
    //     if (err) {
    //         console.log("error in finding");
    //     }
    //     console.log(res);
    //     db.close();
    // });

    // dbo.collection('users').find({ age: "22" }).count((err, res) => {
    //     console.log(res);
    //     db.close();
    // });

    // dbo.collection('tasks').findOne({_id: new ObjectId('635a2409a62b1e447a802f44')}, (err,res) => {
    //     if(err) {
    //        return console.log(err);
    //     }
    //     console.log(res);
    // })

    // dbo.collection('tasks').find({completed: "false"}).toArray((err,res) => {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log(res);
    //     db.close();
    // })

    // dbo.collection('users').updateOne(
    //     { _id: new ObjectId('635a27883199594968edc83b') },
    //     {
    //         $set: { name: 'Tanmay upadhyay' }
    //     }
    // ).then((res) => {
    //     console.log(res);
    //     db.close();
    // }).catch((err) => {
    //     console.log(err);
    //     db.close();
    // })

    // dbo.collection('users').updateOne(
    //     { _id: new ObjectId('635a27883199594968edc83b') },
    //     {
    //         $inc: { age: -1 }
    //     }
    // ).then((res) => {
    //     console.log(res);
    //     db.close();
    // }).catch((err) => {
    //     console.log(err);
    //     db.close();
    // })

    // dbo.collection('tasks').updateMany({completed: false}, {
    //     $set: {
    //         completed : true
    //     }
    // }).then((res) => {
    //     console.log(res);
    //     db.close();
    // }).catch((err) => {
    //     console.log(err);
    //     db.close();
    // })

        // dbo.collection('users').deleteMany({ age: 22 })
        // .then((res) => {
        //     console.log(res);
        //     db.close();
        // }).catch((err) => {
        //     console.log(err);
        //     db.close();
        // })

        // dbo.collection('tasks').deleteOne({ title: 'Singing' })
        // .then((res) => {
        //     console.log(res);
        //     db.close();
        // }).catch((err) => {
        //     console.log(err);
        //     db.close();
        // })
});