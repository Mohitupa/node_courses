const express = require("express");
// require("./db/postgres");
const countriesRouter = require("./routes/countries");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


// app.get("/ndhs-master/country-list", async (req, res) => {
//     try {
//         const response = await pool.query("SELECT * FROM countries");
//         res.status(201).send(response.rows);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });

app.use(countriesRouter);

// async function retrieveData() {
//   try {
//     const res = await pool.query("SELECT * FROM countries");
//     console.log(res.rows);
//   } catch (error) {
//     console.error(error);
//   }
// }
// retrieveData();

app.listen(port, () => {
  console.log("server is listening at " + port);
});
