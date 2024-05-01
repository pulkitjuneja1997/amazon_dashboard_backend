const mongoose = require('mongoose');
const db = mongoose.connect('mongodb+srv://pulkitjuneja1997:kkHozKDOUz34iYo4@samplecluster.rfpqhgr.mongodb.net/Amazon');

db.then( (response) => {
    console.log('db is connected')
}).catch( (err) => {
    console.log('db is not connected')
})

exports.mongoose = mongoose;