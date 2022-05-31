const mongoose = require('mongoose')

var ligSchema = new mongoose.Schema({
    _id: String,
    origem: String, 
    destino: String,
    distancia: String
})

// exportar o modelo
module.exports = mongoose.model('lig', ligSchema)