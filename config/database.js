const mongoose = require("mongoose");

mongoose.connect(process.env.URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => console.log("Database connected successfully!"));