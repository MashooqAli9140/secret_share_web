const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//create newSchema for user sign up
const usersignupdata = new Schema( {
    username:{type: String , required: true },
    email:{type: String , required: true },
    password:{type: String , required: true },
    confirmpassword :{type: String , required: true },

},
{ collection: 'USER_SIGNUP_DATA'}
)

module.exports = mongoose.model('Signupdata' , usersignupdata )