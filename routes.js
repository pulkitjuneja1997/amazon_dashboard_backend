const axios = require('axios')
require('dotenv').config();

const fs = require('fs');
const CircularJSON = require('circular-json');
const usersControllersInsatnce = require('./src/Controllers/Users')
const marketplaces = require('./src/Controllers/Marketplaces')

const {CLIENT_ID, REDIRECT_URI, CLIENT_SECRET, FRONTEND_URL} = process.env;

const user_details_url  = 'http://localhost:8000/google/userDetails';
exports.appRoutes = (app) => {

    app.get( '/loginViaGoogle', function(req,res) {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
        console.log(url);
        res.redirect(url);
    })


    app.get( '/google/auth/callback', async function(req,res) {

        const token_response = await axios.post( `https://oauth2.googleapis.com/token`, {
            code: req.query.code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

    
        if( token_response.status == 200 ){

            res.redirect(`${FRONTEND_URL}/home`)
            // res.send( {
            //     status: token_response.status,
            //     token: token_response.data.access_token
            // })
        } else{
            // res.send( {
            //     status: token_response.status,
            //     errors: [
            //         'not able to verify'
            //     ]
            // })
            res.redirect(`${FRONTEND_URL}/signup?status=400`)

        }

    })


    app.get( '/google/userDetails', function(req,res) {
        console.log('usedetails')
        fs.writeFileSync('./usedetailsres.txt', CircularJSON.stringify(req) );
        fs.writeFileSync('./userdetailsresp.txt', CircularJSON.stringify(res) );
    })


    app.post( '/signup', function( req, res ){
       usersControllersInsatnce.usersControllers(req,res)
    })

    app.post( '/storeWoocommerceKeys', function( req, res ){
        marketplaces.connecToWoocommerce(req, res)
    })

}