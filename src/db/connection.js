const mongoose = require("mongoose")

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/lastwebsite")
.then(console.log("your connection is success"))