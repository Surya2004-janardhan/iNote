const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook";

const connect_to_mongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected to mongo Successfully");
    } catch (err) {
        console.error("Failed to connect to mongo", err);
    }
}

module.exports = connect_to_mongo;