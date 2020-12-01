const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('static'));


app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/static' + '/index.html');
});

app.listen(PORT, function() {
  console.log(`Example app listening on port ${PORT}!`);
});
