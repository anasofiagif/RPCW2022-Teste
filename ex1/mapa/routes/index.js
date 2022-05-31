var express = require('express');
var router = express.Router();
var Cid = require('../controllers/cid')
var Lig = require('../controllers/lig')

// GET /api/distritos
router.get('/distritos', function(req,res){
  Cid.listar()
    .then(dados => {

      var distritos = {}

      dados.forEach(cid => {

        var d = cid.distrito

          if(distritos[d]!=undefined){
            distritos[d].push({"_id": cid._id, "nome": cid.nome})
          }
          else{
            distritos[d] = [{"_id": cid._id, "nome": cid.nome}]
          }

      })

      res.status(200).jsonp(distritos)

    })
    .catch(e => {
      res.status(501).jsonp({erro: e})
    })
})

router.get('/cidades', function(req,res){

  // GET /api/cidades?distrito=DDDD
  if(req.query['distrito'] != undefined){
    Cid.listarPorDistrito(req.query['distrito'])
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(e => {
        res.status(503).jsonp({erro: e})
      })
  }
  // GET /api/cidades
  else{
    Cid.listar()
      .then(dados => {
        res.status(200).jsonp(dados)
      })
      .catch(e => {
        res.status(500).jsonp({erro: e})
      })
  }
})

//GET /api/cidades/nomes
router.get('/cidades/nomes', function(req,res){
  Cid.listarAlf()
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(e => {
      res.status(502).jsonp({erro: e})
    })
})

// GET /api/cidades/:id
router.get('/cidades/:id', function(req,res){
  Cid.consultar(req.params.id)
    .then(dados => {
      res.status(200).jsonp(dados)
    })
    .catch(e => {
      res.status(501).jsonp({erro: e})
    })
})


router.get('/ligacoes', function(req,res){

  // GET /api/ligacoes?origem=XX
  if(req.query['origem'] != undefined){
    Lig.listarPorOrigem(req.query['origem'])
    .then(dados => {

      var list = []

      dados.forEach(l => {
        
        Cid.consultar(l.destino)
          .then(dados => {
            list.push({"idLig": l._id, "idDest": l.destino, "nomeDest": dados.nome})
          })
          .catch(e => {
            res.status(508).jsonp({erro: e})
          })

      })

      res.status(200).jsonp(dados)

    })
    .catch(e => {
      res.status(509).jsonp({erro: e})
    })
    
  }

  // GET /api/ligacoes?dist=YY
  else if(req.query['dist'] != undefined){
    Lig.listar()
    .then(dados => {

      var list = []

      distancia = req.query['dist']

      dados.forEach(l => {

        if(l.distancia >= distancia){
          list.push({"idLig": l._id, "IdOrig": l.origem, "IdDest": l.destino})
        }

      })

      res.status(200).jsonp(list)

    })
    .catch(e => {
      res.status(501).jsonp({erro: e})
    })

  }

})

module.exports = router;
