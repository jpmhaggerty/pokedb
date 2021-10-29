const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

app.get('/api/:pokemon/', (req, res) => {
  if (req.params.pokemon === 'pokemon') {
    //return SQL data
    res.send("SQL " + req.params.pokemon);
  } else {
    //return pokemon data
    res.send("Data " + req.params.pokemon);
  }
});

app.get('/api/:pokemon/img', (req, res) => {
  // do something with image
  res.send("Image " + req.params.pokemon);
})

