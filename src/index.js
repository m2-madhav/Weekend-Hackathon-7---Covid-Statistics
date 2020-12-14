const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const roundTo = require("round-to");

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require("./connector");

const { data } = require("./data");

app.get("/totalRecovered", (req, res) => {
  let recoveredCount = 0;
  data.map((item) => {
    recoveredCount += item.recovered;
  });
  res.send({
    data: {
      _id: "total",
      recovered: recoveredCount
    }
  });
  return;
});

app.get("/totalDeath", (req, res) => {
  let deathCount = 0;
  data.map((item) => {
    deathCount += item.death;
  });
  res.send({
    data: {
      _id: "total",
      death: deathCount
    }
  });
  return;
});

app.get("/totalActive", (req, res) => {
  let totalActive = 0;
  data.map((item) => {
    totalActive += item.infected - item.recovered;
  });
  res.send({
    data: {
      _id: "total",
      totalActive: totalActive
    }
  });
  return;
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
