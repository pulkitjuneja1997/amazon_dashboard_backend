const CircularJSON = require("circular-json");
const fs = require('fs');

exports.connecToWoocommerce = function( req, res ){

   fs.writeFileSync('./woocommerce.txt', CircularJSON.stringify(req) );
   res.send( JSON.parse(CircularJSON.stringify(req)));

}