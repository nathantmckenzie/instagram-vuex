const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const client = require("./elephantSQL");
const port = 7002;

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const users = await client.query("SELECT * FROM users;");
    const posts = await client.query("SELECT * FROM posts where user_id = 1;");
    res.json({ users, posts });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
