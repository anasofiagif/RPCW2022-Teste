const mongoose = require('mongoose')

var cidSchema = new mongoose.Schema({
    _id: String,
    nome: String, 
    populacao: String,
    descricao: String,
    distrito: String,
})

// exportar o modelo
module.exports = mongoose.model('cid', cidSchema)