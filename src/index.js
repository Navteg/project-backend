const { port, DB_CONFIG } = require("./utils/constants.js");
const knex = require("knex");
const express = require("express");
const app = express();

const getData = require("./app/handlers/get-data");
const PopulateData = require("./app/handlers/populate-data");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const db = knex(DB_CONFIG);
app.set("db", db);

// Get data
app.get("/get-data", function (req, res) {
  getData(req, res);
});

// Populate data
app.get("/update-data", function (req, res) {
  PopulateData(req, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
