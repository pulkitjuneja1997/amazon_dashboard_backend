const CircularJSON = require("circular-json");
const fs = require('fs');
const connection = require('../../Connection');
const users_model = require('../Models/Users');
require('dotenv').config({path:`.env.${process.env.NODE_ENV}`});

exports.connecToWoocommerce = function( req, res ){

   try{
      // let records = await users_model.usersModel.findOne({domain: req.body.domain});
      // console.log(records);
      // if( !false ){
      //    return { success: false, error: 'WooCommerce store is already connected by seller' }
      // } else {

         let return_url   = process.env.FRONTEND_URL + 'home';
       
      
         let callback_url = process.env.BACKEND_URL + 'storeWoocommerceKeys';
         let url = req.body.domain + 'wc-auth/v1/authorize?app_name=Blink&scope=read_write&user_id=blink&return_url=' + return_url + '&callback_url=' + callback_url;
         res.send({ success: true, data: { url: url } }) 
         
      //}
   }  catch( err ){
      res.send({ success: false, error: err.message })
   }
      

}


exports.storeWoocommerceKeys = async function( req, res ){

   fs.writeFileSync('../../woocommerce.json', CircularJSON.stringify(req) )
   fs.writeFileSync('../../woocommerce2.json', CircularJSON.stringify(req.body) )

   // let data    = req.body && req.body.data ? req.body.data : '';

   // try{
   //    let records = await users_model.usersModel.findOne({domain: req.body.domain});
   //    console.log(records);
   //    if( !false ){

   //    } else {

   //       let return_url   = REACT_APP_Frontend_URL + 'home';
      
   //       let callback_url = process.env.REACT_APP_Backend_URL + 'storeWoocommerceKeys';
   //       let url = this.state.domain + 'wc-auth/v1/authorize?app_name=Blink&scope=read_write&user_id=blink&return_url=' + return_url + '&callback_url=' + callback_url;
         
   //       window.location.href = url;

   //    }
   // }  catch( err ){
   //    return { success: false, error: err.message }
   // }
      


}