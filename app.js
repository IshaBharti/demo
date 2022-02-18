const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router=express.Router()
const path=require("path")
const db=require("./db/ connection")
const User=require("./model/user")
require("dotenv").config();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use("/user", require("./routes/user"));
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));





