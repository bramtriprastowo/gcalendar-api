require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
require("./config/database");
const apiRouter = require("./routes/index");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/v1', apiRouter);

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST;
app.listen(PORT, () => console.log(`Server: ${HOST}:${PORT}`));