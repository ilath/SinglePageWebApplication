/*jslint          node    : true, continue  : true,
  devel   : true, indent  : 2,    maxerr    : 50,
  newcap  : true, nomen   : true, plusplus  : true,
  regexp  : true, sloppy  : true, var       : false,
  white   : true
*/

'use strict'

var configRoutes,
    MongoClient = require('mongodb').MongoClient;

//连接字符串
var DB_CONN_STR = 'mongodb://localhost:27017/gomall';    

MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
});

configRoutes = function ( app, server ) {
  app.get( '/', function( request, response ) {
    response.redirect( '/spa.html' );
  });

  app.all( '/:obj_type/*?', function(request, response, next) {
    response.contentType( 'json' );
    next();
  });

  app.get( '/:obj_type/list', function(request, response){
    response.send({ title: request.params.obj_type + ' list' });
  });

  app.post( '/:obj_type/create', function(request, response){
    response.send({ title: request.params.obj_type + ' create' });
  });

  app.get( '/:obj_type/update/:id([0-9]+)', function(request, response){
    response.send({ title: request.params.obj_type + ' with id ' + request.params.id + ' updated' });
  });

  app.get( '/:obj_type/delete/:id([0-9]+)', function(request, response){
    response.send({ title: request.params.obj_type + ' with id ' + request.params.id + ' deleted' });
  });
};

module.exports = { configRoutes : configRoutes };
