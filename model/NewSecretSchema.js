const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create new secret schema
const newsecretdata = new Schema( {
      username: { type: String , required: true },
      title: { type: String , required: true},
      newsecret: { type: String , required: true}
},
{ collection:'NEW_SECRET_DATA',
  timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
}

)

module.exports = mongoose.model('NewSecretSchema' , newsecretdata )