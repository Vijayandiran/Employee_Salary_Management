const mongoose = require("mongoose");

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i1syrn5.mongodb.net/${process.env.DATABASE}`

const connection = mongoose.connect(connectionString)

connection.then(() => {
    console.log("MongoDB is connected")
}).catch((err) => {
    console.log("DB Connection Error", err)
})