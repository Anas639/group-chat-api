import express from "express";

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.json({
    msg: "hello",
    status: true
  });
});

app.listen(port, () => {
  console.log('listening on port ', port);
});
