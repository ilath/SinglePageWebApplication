/*jslint          node    : true, continue  : true,
  devel   : true, indent  : 2,    maxerr    : 50,
  newcap  : true, nomen   : true, plusplus  : true,
  regexp  : true, sloppy  : true, var       : false,
  white   : true
*/

'use strict';

var
    countUp,

    http      = require( 'http' ),
    express   = require( 'express' ),
    socketIo  = require( 'socket.io' ),

    app       = express(),
    server    = http.createServer( app ),
    io        = socketIo.listen( server ),
    countIdx  = 0
    ;

countUp = function () {
  countIdx++;
  console.log( countIdx );
  io.sockets.send( countIdx );
};

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.use( express.static( __dirname + '/' ) );
}

app.get( '/', function( request, response ) {
  response.redirect( '/socket.html' );
});

server.listen( 3000 );
console.log(
  'Express server Listening on port %d in %s mode',
   server.address().port, app.settings.env
);

setInterval( countUp, 1000 );
