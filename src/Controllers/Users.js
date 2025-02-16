const usersModel = require('../Models/Users');
require('dotenv').config({path: `.env.${process.env.NODE_ENV}`})


async function usersControllers(req, res){

    try{
 
        const newUser = new usersModel.usersModel(req.body);
        console.log('newUser', newUser);
        const encodePasswordResults = await newUser.encodePassword(); 

        if( encodePasswordResults.success ){
            const generateTokenResults  = await newUser.generateToken();
            console.log( generateTokenResults )
            if( generateTokenResults.success ){
                const savedUser = await newUser.save();
                res.status(200).json( { messasge: 'User hasbeen successfully registered', url: process.env.FRONTEND_URL + 'home', userData: {
                    token: generateTokenResults.data.token,
                    email: generateTokenResults.data.email
                } });
            } else{
                res.status(400).json(  {error: 'Uanble to register User. Please try again'} );
            }
        } else{
            res.status(400).json( {error: 'Uanble to register User. Please try again'} );
        }
        

    } catch(err){
        res.status(400).json({error:err.message});
    }

}



exports.usersControllers = usersControllers;