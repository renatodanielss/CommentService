/*
	/módulo: queries.js
	/Descrição: módulo responsável por executar as queries do banco de dados
	/Autor: Renato Daniel Santana Santos
*/

var promise = require('bluebird');

var options = {
  // inicializar opções
  promiseLib: promise
};

//carrega recurso pg-promise responsável por realizar a conexão com o banco de dados PostgreSQL
var pgp = require('pg-promise')(options);
var connectionString = 'postgresql://pgpadrao:pgpadrao123@localhost:5432/db_onepageenterprises'; //string de conexão ao banco de dados
var db = pgp(connectionString); //cria o objeto de conexão e atribui a string de conexão

// Crud do banco de dados
module.exports = {
	getAllComments: getAllComments,
	getSingleComment: getSingleComment,
	createComment: createComment,
	updateComment: updateComment,
	removeComment: removeComment
};

//funcão responsável por obter todos os comentários em ordem decrescente
function getAllComments(req, res, next) {
	db.any('select * from tbl_comentario order by datahora desc')
	.then(function (data) {
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved ALL comments'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

//funcão responsável por obter um comentário
function getSingleComment(req, res, next) {
	var commentID = parseInt(req.params.id);
	db.one('select * from tbl_comentario where id = $1', commentID)
	.then(function (data) {
		res.status(200)
		.json({
			status: 'success',
			data: data,
			message: 'Retrieved ONE comment'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

//funcão responsável por criar uma comentário
function createComment(req, res, next) {
	db.none('insert into tbl_comentario(id, comentario, datahora, usuario)' +
	' values(default, ${comentario}, current_timestamp, ${usuario})',
	req.body)
	.then(function () {
		res.status(200)
		.json({
			status: 'success',
			message: 'Inserted one comment'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

//funcão responsável por editar uma comentário
function updateComment(req, res, next) {
	db.none('update tbl_comentario set comentario=$1 where id=$2',
	[req.body.comentario, parseInt(req.body.id)])
	.then(function () {
		res.status(200)
		.json({
			status: 'success',
			message: 'Updated comment'
		});
	})
	.catch(function (err) {
		return next(err);
	});
}

//funcão responsável por deletar uma comentário
function removeComment(req, res, next) {
  var commentID = parseInt(req.body.id);
  db.result('delete from tbl_comentario where id = $1', commentID)
	.then(function (result) {
		res.status(200)
		.json({
			status: 'success',
			message: `Removed ${result.rowCount} comment`
		});
	})
	.catch(function (err) {
		return next(err);
	});
}