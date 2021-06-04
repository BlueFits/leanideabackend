var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

var indexRouter = require('./routes/index');
const userRouter = require("./routes/user");
var app = express();

//Mongoose Connection
const mongoDB = "mongodb+srv://christianAdmin:mongopassword@cluster0.ubkpu.mongodb.net/leanIdea?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("connected", () => console.log("connected to mongo (*_*)"));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Cors
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/user", userRouter);

module.exports = app;