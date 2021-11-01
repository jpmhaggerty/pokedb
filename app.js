const fetch = require("cross-fetch");
const express = require("express");
const app = express();
const port = 3000;
const url = "https://pokeapi.co/api/v2/";
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

async function fetchPokemonDetails(id) {
  // Check our local db for details
  return new Promise((resolve, reject) => {
    knex
      .select("*")
      .from("pokemon")
      .where({ id })
      .then((data) => {
        if (data.length > 0) {
          return resolve(data);
        } else {
          fetch(`${url}pokemon/${id}`).then((data) => {
            let json = data.json();
            //console.log("Returning from catch statement", json);
            // Put details into database

            return resolve(json);
          });
        }
      });
  });
}

app.get("/api/:pokemon/", (req, res) => {
  fetchPokemonDetails(req.params.pokemon).then((json) => {
    //console.log("Returned json:", json);
    res.json(json);
  });
});

app.get("/api/:pokemon/img", (req, res) => {
  // do something with image

  knex("pokemon")
  .insert([{name: "name"},
    {height: 10},
    {weight: 15},
    {image: "some URI"},
]);

  res.send("Image " + req.params.pokemon);
});
