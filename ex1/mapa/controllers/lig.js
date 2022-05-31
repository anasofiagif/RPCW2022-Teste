var Lig = require('../models/lig')

module.exports.listarPorOrigem = function(n){
    return Lig
            .find({origem: n}, {_id: 1, destino: 1})
            .exec()
}

module.exports.listar = function(n){
    return Lig
            .find({}, {})
            .exec()
}