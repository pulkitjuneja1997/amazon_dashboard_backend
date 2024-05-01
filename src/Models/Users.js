const mongooseInsatnce = require('../../Connection');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const users_schems = {
    domain: {
        type: 'string',
        required: true
    },
    email: {
       type: 'string',
       required: true
    },
    password: {
        type: 'string',
        required: false
    },
    token: {
        type:'string',
        required: true
    }
}


const usersSchema = mongooseInsatnce.mongoose.Schema(users_schems);


// usersSchema.methods.encodePassword = async function ( next ){
//     var user = this;
//     try{
//         const salt     = bcrypt.genSaltSync(10);
//         const password = bcrypt.hashSync( JSON.stringify(user), salt );

//         user.password = password
//         console.log(user);
//         return {success: true, data: user };

//     } catch( err ){
//         return {success: false, error: err.message}
//     } 


// }

// usersSchema.methods.generateToken = async function(next){

//     let user = this;
//     console.log( 'user', user );
//     try{
//        const token =  await jwt.sign({ ...user }, 'Welcome_TO_Amazon_CENTRAL_APP', {
//             expiresIn: 3600
//         })
        
//         user.token = token;
//         return {success: true, data: user }; 
//     } catch( err ){
//         return {success: false, error: err.message}
//     } 
    

// }




usersSchema.methods.encodePassword =  function ( next ){
    var user = this;
    try{
        const salt     = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync( JSON.stringify(user), salt );

        user.password = password
        console.log(user);
        return {success: true, data: user };

    } catch( err ){
        return {success: false, error: err.message}
    } 

}

usersSchema.methods.generateToken = function(next){

    let user = this;
    console.log( 'user', user );
    try{
       const token =  jwt.sign({ ...user }, 'Welcome_TO_Amazon_CENTRAL_APP', {
            expiresIn: 3600
        })
        
        user.token = token;
        return {success: true, data: user }; 
    } catch( err ){
        return {success: false, error: err.message}
    } 
    

}



console.log('opppppppppp');
const usersModel = mongooseInsatnce.mongoose.model( 'Users', usersSchema, 'Users');

exports.usersModel = usersModel;