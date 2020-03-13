// required modules
const express = require("express");
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const fetch = require("node-fetch");

// required json files
var favMusic = require(__dirname + "/favoritesMusic.json");

// Implementing modules
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());

// GET request to get info
router.get("/music", (req, res) => {
  // fetch the itunes API

  fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      req.query.search
    )}&limit=10&entity=song`
  )
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      // console.log(JSON.stringify(data))
      res.send(JSON.stringify(data.results));
    });
  console.log(res);
});

// Post request to displayed to favorites page and stored in json files
router.post("/favoritesMusic", (req, res) => {
  console.log("access");
  favMusic.push(req.body);
  fs.writeFile(
    __dirname + "favoritesMusic.json",
    JSON.stringify(favMusic),
    err => {
      if (err) {
        console.log("not working", err);
      } else {
        console.log("yeah");
      }
    }
  );
});

// GET request
router.get("/favoritesMusic", (req, res) => {
  fs.readFile(__dirname + "/favoritesMusic.json", (err, data) => {
    if (err) {
      console.log("cant read");
    } else {
      res.send(favMusic);
    }
  });
});

// Delete request
router.delete("/favoritesMusic", (req, res) => {
  console.log("access");
  favMusic = favMusic.filter(i => {
    return i.id != req.body.deleted;
  });
  fs.writeFile(
    __dirname + "favoritesMusic.json",
    JSON.stringify(favMusic),
    err => {
      if (err) {
        console.log("not working", err);
      } else {
        console.log("yeah");
      }
    }
  );
});

// export results
module.exports = router;
