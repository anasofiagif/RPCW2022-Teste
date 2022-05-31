var express = require('express');
var router = express.Router();
var axios = require('axios');

var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNDUzMiwiZXhwIjoxNjU0MDQzMzMyfQ.aXGP-q812WH5kzL1E4n5QfqfUm-YV0cHEM0xzuM1kyzPmPtJp4dGCGhL7lIOxYqlORUk6J-gHAC9sHQvj04rP0en_YgLKtPEUCrjIWOTcWvXSy92Vy0RhXtLfyv7TwGYaV1gOdb5NWFwg5lH_ovuhNa_5U8zaHKzRGduvvZl8k2X8ZqMtTrIX_--ccHO33YzmQdUoZY757r6cbNcabnjFThUSm-XGYjVScWpFMs5lG6G2zeXaOuBeiPEYGsfe2sFiCKvxzI-HK6K3jZ5h6yV91AIepSGIR7KO0pDyIEqNJcNTEwfrdQUUHzeRw8nPIkuNWnznJbgLuOOQjFslll3-A"

/* Página inicial */
router.get('/', function(req, res, next) {
  res.render('paginaInicial');
});

router.get('/termos', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token=" + token)
       .then(response => {
          var list = response.data
          res.render('termos', { classList: list});
       })
       .catch(function(erro){
          res.render('error', { error: erro });
       })
  
});


/* Página das classes */
router.get('/classes', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=" + token)
       .then(response => {
          var list = response.data
          res.render('classes', { classList: list});
       })
       .catch(function(erro){
          res.render('error', { error: erro });
       })
  
});

/* Página da classe */
router.get('/classes/c:id', function(req, res, next) {

    axios.all([
      axios.get("http://clav-api.di.uminho.pt/v2/classes/c" + req.params.id + "?token=" + token), 
      axios.get("http://clav-api.di.uminho.pt/v2//classes/c" + req.params.id + "/ti?token=" + token)
    ])
    .then(axios.spread((data1, data2) => {
      var classe = data1.data
      var termos = data2.data
      res.render('classe', {c: classe, t: termos});
    }));

})

module.exports = router;
