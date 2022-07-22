const mongoose = require("mongoose");
const DB_URI = `mongodb://localhost:27017/teamredsocial`


mongoose.connect(DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
        if (error) {
            console.log(`ERROR DE CONEXIÓN =>>>${error}`)
        }
        else {
            console.log("CONEXIÓN EXITOSA!")
        }
    });

module.exports = mongoose;