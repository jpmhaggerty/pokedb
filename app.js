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

async function getFromInternalDatabase(id) {
  return new Promise((resolve, reject) => {
    knex
      .select("pokemon_id", "name", "weight", "height", "image")
      .from("pokemon")
      .where("pokemon_id", id)
      .then((data) => {
        return resolve(data[0]);
      });
  });
}

async function getFromExternalDatabase(id) {
  return new Promise((resolve, reject) => {
    fetch(`${url}pokemon/${id}`)
      .then((data) => data.json())
      .then((json) => {
        let { name, weight, height } = json;
        let pokemon_id = json.id;
        let image = json.sprites.other['official-artwork'].front_default;

        let newPokemon = { pokemon_id, name, weight, height, image };
        //console.log("Returning from catch statement", json);
        // Put details into database
        knex("pokemon")
          .insert(newPokemon)
          .then((json) => {
            return resolve(newPokemon);
          });
      });
  });
}

async function fetchPokemonDetails(id) {
  return new Promise((resolve, reject) => {
    knex
      .select("*")
      .from("pokemon")
      .where({pokemon_id: id})
      .then((data) => {
        if (data.length > 0) {
          return resolve(getFromInternalDatabase(id));
        } else {
          return resolve(getFromExternalDatabase(id));
        }
      });
  });
}

app.get("/api", (req, res) => {
  knex
    .select("*")
    .from("pokemon")
    .then((data) => res.json(data));
});

app.get("/api/:pokemon/", (req, res) => {
  fetchPokemonDetails(req.params.pokemon).then((json) => {
    res.json(json);
  });
});

app.get("/api/:pokemon/img", (req, res) => {
  fetchPokemonDetails(req.params.pokemon).then((json) => {
    res.send(json.image);
  });
});


// app.get("/api/:attribute", (req, res) => {
//   fetchPokemonDetails(req.params.pokemon).then((json) => {
//     res.send(json.image);
//   });
// });

