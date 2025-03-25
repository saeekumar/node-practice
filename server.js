require("dotenv").config();
var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const pool = require("./src/config/db").pool;
const empRouter = require("./src/employee/employee.router");
const authRouter = require("./src/auth/auth.router");




app.use('/auth', authRouter);
app.use('/employee', empRouter);



const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log("Hello server");
    console.log("server up and running on PORT :", port);
});