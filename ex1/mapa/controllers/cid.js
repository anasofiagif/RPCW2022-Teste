var Cid = require('../models/cid')

module.exports.listar = function(){
    return Cid
            .find({}, {_id:1, nome:1, distrito: 1})
            .exec()
}

module.exports.consultar = function(id){
    return Cid
            .findOne({_id: id})
            .exec()
}

module.exports.listarAlf = function(){
    return Cid
            .find({}, {_id:0, nome:1})
            .sort({nome: 1})
            .exec()
}

module.exports.listarPorDistrito = function(d){
    return Cid
            .find({distrito: d}, {nome: 1})
            .exec()
}