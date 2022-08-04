const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const bodyParser = require("body-parser");

const MongoClient = require("mongodb").MongoClient;

// body parser before crud handlers

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());

const port = 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
// app.post("/quotes", (req, res) => {
//   console.log(req.body);
// });

const info = require("./info.json");

let mongoPass = info.mongoPass;
const connectionString = `mongodb+srv://oussa:${mongoPass}@oussa.t23qw.mongodb.net/?retryWrites=true&w=majority`;
console.log(connectionString);

//callback version

// MongoClient.connect(connectionString, async (err, client) => {
//   if (err) console.error(err);
//   console.log("connected to database");
//   const database = await client.db("star-wars-quotes");
//   const quotesColl = await db.collection("quotes");

//   app.use(bodyParser.urlencoded({ extended: true }));

//   const port = 3000;
//   app.listen(port, () => {
//     console.log(`server running on port ${port}`);
//   });

//   app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
//   });
//   app.post("/quotes", (req, res) => {
//     console.log(req.body);
//   });
// });

app.put("/quotes", (req, res) => {
  console.log(req.body);
});
// promise version

MongoClient.connect(connectionString, {})
  .then((client) => {
    console.log("database connected");

    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");

    app.get("/", (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then((results) => {
          console.log(results);
          res.render("index.ejs", { quotes: results });
        })
        .catch((err) => console.error(err));
      // res.sendFile(__dirname + "/index.html");
    });

    app.post("/quotes", (req, res) => {
      console.log(req.body);
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("  /");
        })
        .catch((error) => console.error(error));
    });
  })
  .catch((err) => console.error(err));

// async await version => 'awaiting'
