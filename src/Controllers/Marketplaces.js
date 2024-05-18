const CircularJSON = require("circular-json");
const fs = require('fs');
const connection = require('../../Connection');
const users_model = require('../Models/Users');

if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
}

exports.connecToWoocommerce = function( req, res ){

   try{
      // let records = await users_model.usersModel.findOne({domain: req.body.domain});
      // console.log(records);
      // if( !false ){
      //    return { success: false, error: 'WooCommerce store is already connected by seller' }
      // } else {

         let return_url   = process.env.FRONTEND_URL + 'home';
         console.log(return_url);
      
         let callback_url = process.env.BACKEND_URL + 'storeWoocommerceKeys?email=' + req.body.email ;
         let url = req.body.domain + 'wc-auth/v1/authorize?app_name=Blink&scope=read_write&user_id=blink&return_url=' + return_url + '&callback_url=' + callback_url;
         res.send({ success: true, data: { url: url } }) 
         
      //}
   }  catch( err ){
      res.send({ success: false, error: err.message })
   }
      

}


exports.storeWoocommerceKeys = async function( req, res ){

   console.log( 'storeWoocommerceKeys' );
   console.log( CircularJSON.stringify(req.body) );


   let data    = req.body ? req.body : {};

   console.log( req.quey.email );


   res.send({ success: true, data:'hpy' })

   if( typeof data == 'string' ){
      data = JSON.parse(data);
   }

   try{
      let records = await users_model.usersModel.findOneAndUpdate( {
         email: data
      }, { $set: {
            "woo_keys": req.body
      } })

      console.log(records);

      res.send({ success: true, data:'hpy' })
      
   }  catch( err ){
      res.send({ success: false, error: err.message })
   }
      


}