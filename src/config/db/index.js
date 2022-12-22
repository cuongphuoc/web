const mongoose = require('mongoose');
async function connect() {
    try {
    await mongoose.connect('mongodb+srv://web_music:cuongcr34@cluster0.kdurz1c.mongodb.net/?retryWrites=true&w=majority');
    console.log("thanh cong");
    } catch (error) {
    console.log("that bai");
    }
}
module.exports = {connect};