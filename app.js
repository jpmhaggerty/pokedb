const express = require('express')
const app = express()
const port = 3000
const url = 'https://pokeapi.co/api/v2/'

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

async function fetchPokemonDetails(id) {
  let res = await fetch(`${url}pokemon/${id}`)
  let json = await res.json()
  return json
}

app.get('/api/:pokemon/', (req, res) => {
  if (req.params.pokemon === 'pokemon') {
    //return SQL data
    res.send("SQL " + req.params.pokemon);
  } else {
    //return pokemon data
    let id = parseInt(req.params.pokemon)

    if (isNaN(id)) {
      res.status(400).send("Invalid ID")
      return
    }

    let json = fetchPokemonDetails(id)
    res.json(json);
  }
});

app.get('/api/:pokemon/img', (req, res) => {
  // do something with image
  res.send("Image " + req.params.pokemon);
})

