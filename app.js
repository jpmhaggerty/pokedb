const fetch = require('cross-fetch');
const express = require('express')
const app = express()
const port = 3000
const url = 'https://pokeapi.co/api/v2/'
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

async function fetchPokemonDetails(id) {
  // Check our local db for details
  knex
  .select('*')
  .from('pokemon')
  .where({id})
  .then((data) => {console.log("Returning data", data); return Promise.resolve(data)})
  .catch((err) => {
    // nothing in database- put something inside the db
    // If it doesn't exist, fetch from external source
    fetch(`${url}pokemon/${id}`).then(data => {
      let json = data.json()
      console.log("Returning data", json)
      return Promise.resolve(json)
    })
  })

}

app.get('/api/:pokemon/', (req, res) => {
    fetchPokemonDetails(req.params.pokemon).then((json) => res.json(json))
});

app.get('/api/:pokemon/img', (req, res) => {
  // do something with image
  res.send("Image " + req.params.pokemon);
})



// knex('pokemon')
//   .insert({/* data to insert */})