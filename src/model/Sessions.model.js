const mongoose = require('mongoose')

const collectionName = 'session'

const collectionSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type:String,
        unique:true,
    },
    age: Number,
    password: String
})

// luego se guarda en un const, en este ejemplo se llama Products
const Sessions = mongoose.model(collectionName, collectionSchema)
//para luego exportarlo
module.exports = Sessions