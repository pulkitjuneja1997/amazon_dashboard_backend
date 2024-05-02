const CircularJSON = require("circular-json");
const fs = require('fs');

exports.connecToWoocommerce = function( req, res ){

   try{
      fs.writeFileSync('./woocommerce.txt', CircularJSON.stringify(req) );
      res.send( JSON.parse(CircularJSON.stringify(req)));

   } catch( err ){
      res.status(400).json( { error: err.message } )
   }
   

}