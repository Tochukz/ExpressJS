const express = require('express');

const app = express();

app.get('/name/:username', (req, res) => {
  res.status(200);
  res.set('Content-Type', 'text/html');
  res.send(
    `<html>
      <body>
        <h1> Hello ${req.params.username}</h1>
      </body>
    </html>`
  )
});
app.get('*', (req, res) => {
  res.end('Hello world');
});

const port = 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
