const mongoose = require("mongoose");

exports.connectToDb = async () => {
    try {
        await mongoose.connect(`${process.env.url}`);
        console.log(`Database Connected Successfully`);
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
};
