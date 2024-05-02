const express   = require('express');
const http   = require('http');
const https  = require('https');
const routes = require('./routes')
require('dotenv').config();
require('./Connection');
const cors = require('cors');
const fs = require('fs');
const path = require('path')

const app = express();

// app.use(express.urlencoded());
// app.use(express.json());

app.use(cors());


routes.appRoutes(app);
app.get( '/', function( req, res ){
    res.status(200).json({'success': true, data: ['homepage']})
})

const PORT = process.env.PORT || 8000;


// var options = {
//     key: fs.readFileSync( path.join(__dirname, 'cert', 'key.pem') ),
//     cert: fs.readFileSync( path.join(__dirname, 'cert', 'cert.pem') )
// };

// var options = {
//     key: fs.readFileSync( path.join(__dirname, 'new_cert', 'trtest+3-key.pem') ),
//     cert: fs.readFileSync( path.join(__dirname, 'new_cert', 'trtest+3.pem') )
// };
  
// http.createServer(app).listen(process.env.PORT);
// https.createServer(options, app).listen(8000, () => {
//     console.log('running on port 8000')
// });

// console.log(GOOGLE_APP_CREDENTIALS)
app.listen( PORT, () => {
    console.log( `app is running on ${PORT}`)
})



