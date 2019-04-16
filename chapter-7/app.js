/*jslint          node    : true, continue  : true,
  devel   : true, indent  : 2,    maxerr    : 50,
  newcap  : true, nomen   : true, plusplus  : true,
  regexp  : true, sloppy  : true, var       : false,
  white   : true
*/

'use strict';

var
  http            = require('http'),
  express         = require('express'),
  routes          = require('./routes'),
  bodyParser      = require('body-parser'),
  methodOverride  = require('method-override'),
  app             = express(),
  server          = http.createServer( app );

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use( methodOverride() );
  app.use( express.static( __dirname + '/public' ) );
}

routes.configRoutes( app, server );

server.listen( 3000 );

console.log(
  'Express server Listening on port %d in %s mode',
   server.address().port, app.settings.env
);
