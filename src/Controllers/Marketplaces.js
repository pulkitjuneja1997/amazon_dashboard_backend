const CircularJSON = require("circular-json");
const fs = require('fs');

exports.storeWoocommerceKeys = function( req, res ){

   let cc = CircularJSON.stringify(req);
   fs.writeFileSync('./woocommerce.txt', CircularJSON.stringify(req) );
   res.send(req);

}