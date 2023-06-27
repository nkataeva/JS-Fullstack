const http = require('express');

const port = 3000;

let server = http();

server.listen(port, () => {
  console.log(`Server running at `);
});

server.get("/", (req, res) => {
    res.send("<title>HELLO NASTYA<title/>")
})