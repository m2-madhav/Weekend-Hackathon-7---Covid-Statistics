const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const roundTo = require("round-to");

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { collection_connection } = require("./connector");

const { data } = require("./data");

app.get("/totalRecovered", (req, res) => {
  collection_connection
    .aggregate([
      {
        $group: {
          _id: "total",
          recovered: { $sum: "$recovered" }
        }
      }
    ])
    .then((p) => res.send(p));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
