const Sequelize = require("sequelize");
const {DataTypes} = Sequelize;
const sequelize = new Sequelize("SequlizeDB","root","",{
    dialect: 'mysql',         
    host: 'localhost',
    // define: {
    //     freezeTableName: true,
    //     timestamps: false
    // }
});

// sequelize.authenticate().then(()=> {
//     console.log('Connected');
// }).catch((err)=> {
//     console.log(err);
// })

// sequelize.sync({force:true});
// sequelize.Drop()
sequelize.drop({match: /_test$/});


const User = sequelize.define('user',{
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age:{
        type: DataTypes.INTEGER,
        defaultValue: 22
    },
    good: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},{
    freezeTableName: true,
    timestamps: false
})

// User.Drop()
// sequelize.models.user;

User.sync({alter:true}).then((data)=> {
    // console.log("Table and model synced successfully!");
    // const user = User.build({username: "Neeraj", password: 'nee123', age: 21, good: false});
    // console.log();
    // return user.save();
    return User.create({username: "Bhagwati47", password: 'all123', age: 21, good: true});
})
.then((res)=>{
    console.log(res.toJSON(),"User Added Succesfully!");
    res.username = 'Jaspreet';
    // return res.destroy();
    // return res.reload();
    return res.save();
    // return res.save(fields: ['age']);
})
.then((res1)=>{
    console.log(res1.toJSON(),"User updated Succesfully!");
})
.catch((err)=> {
    console.log(err);
})