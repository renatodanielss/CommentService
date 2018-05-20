/*
	/módulo: index.js
	/Descrição: módulo responsável por iniciar a aplicação Expression e responsável por mapear os serviços de
	/CRUD que ficaram disponíveis através de um Web Service que utiliza a arquitetura Restful e retorna os dados
	/através da notação json.
	/Autor: Renato Daniel Santana Santos
*/

var express = require('express');
var router = express.Router();
var db = require('../queries');


router.get('/api/comments', db.getAllComments);
router.get('/api/comments/:id', db.getSingleComment);
router.post('/api/comments/create', db.createComment);
router.post('/api/comments/update', db.updateComment);
router.post('/api/comments/delete', db.removeComment);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

router.get('/update', function(req, res, next) {
  res.render('update', { title: 'Update' });
});

router.get('/delete', function(req, res, next) {
  res.render('delete', { title: 'Delete' });
});

module.exports = router;