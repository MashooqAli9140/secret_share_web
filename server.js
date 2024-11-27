require("dotenv").config();
const express = require("express");
const app = express();
const Usersignupdata = require('./model/Signupdata.js');
const NewSecretdata = require('./model/NewSecretSchema.js');
const nodemailer = require("nodemailer"); // nodemailer for reset the passwords
const Bodyparser = require("body-parser");
const Bcrypt = require( "bcrypt");
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing (CORS)
const jwt = require("jsonwebtoken");
const helmet = require('helmet'); // Helmet helps with security headers
const JWT_SECRET = process.env.JWT_SECRET;
const path = require("path");


// Set Content Security Policy for fonts (adjust the URLs as needed)
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com" , "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css" ],
        // Add any other necessary sources for your app
      },
    })
  );






app.use(Bodyparser.json());

// Enable CORS with specified origin for frontend communication
app.use(cors({ origin: "https://secret-share-web.onrender.com"}));

app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve React's index.html for frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


//connect DB
const mongoose = require("mongoose");
const connectDB = require('./config/connectDB.js');
connectDB();

//HANDLE SIGNUP USER DATA 
app.post("/signup" , async (req , res ) => {
        const { username , email , password , confirmpassword } = req.body;
        if( !username , !email , !password , !confirmpassword ) return res.status(400).json({msge: "please fill all the fields"});

        try {

        //check if username is already registered or not
        const registeredusername = await Usersignupdata.findOne( { username });
        //if username is already registered then 
        if( registeredusername ) return res.status(509).json({msge: "username is already registered"});

        //check if email is already registered or not
        const registeredEmail = await Usersignupdata.findOne( { email });
        //if username is already registered then 
        if( registeredEmail ) return res.status(509).json({msge: "email is already registered"});

        //if bothpw are not same then 
        if( password !== confirmpassword ) return res.status(400).json({msge: "password missmatch"});

        //now secure the PW using BCRYPT
        const HashedPW = await Bcrypt.hash( password , 10 );

        //save the user details to DB
        const saveUserdetails = await Usersignupdata.create( {
            username: username,
            email:email,
            password:HashedPW,
            confirmpassword:confirmpassword
        })
         console.log(" new user details are here-->" , saveUserdetails )
         res.status(201).json({msge:"New user created successfully"})

        } catch (error) {
            console.log( error,"error while saving the user data");
            res.status(500).json({ msge: `${error}` });
        }
})



//HANDLE LOGIN USER DATA 
app.post("/login" , async (req , res ) => {
        const { username, password } = req.body;
        if( !username || !password ) return res.status(400).json({msge: "please fill all the fields"});

        try {

        //check if username is registered or not
        const Founduser = await Usersignupdata.findOne( { username });

        //if username is in not found 
        if( !Founduser ) return res.status(400).json({msge: "username is not found"});
        
        //check if pw is same or not
        const MatchedPW = await Bcrypt.compare( password , Founduser.password )

        //if PW is not matched then 
        if( !MatchedPW ) return res.status(400).json({msge: "password is incorrect"});

        const token = jwt.sign( {
            id: Founduser._id,
            username: Founduser.username
        },
        JWT_SECRET
    )
         console.log("Login success" , Founduser )
         return res.status(200).json( {data: token })
         
        } catch (error) {
            console.log( error,"error while Login");
            res.status(500).json({ msge: `${error}` });
        }
})



//HANDLE NEW SECRET TO ADD TO DB
app.post("/newsecret" , async (req , res ) => {
    const { username , title , newsecret } = req.body;
    if( !username ) return res.status(400).json({msge: "USERNAME IS MISSING"});
    if( !title ) return res.status(400).json({msge: "TITLE IS MISSING"});
    if( !newsecret ) return res.status(400).json({msge: "NEWSECRET IS MISSING"});

    try {    
    const SaveNewSecret = await NewSecretdata.create( {
       username,
       title,
       newsecret,
    })
     console.log(" new user details are here-->" , SaveNewSecret )
     res.status(201).json({success: "true" , msge:"new secret added" , data: SaveNewSecret })

    } catch (error) {
        console.log( error,"error while saving the new secret");
        res.status(500).json({success: "false" , msge:"error while adding new secret" , error });
    }
})


//HANDLE EDIT REQ 
app.put("/Edit-Secret/:id" , async (req , res ) => {
    const { id } = req.params;
    const { title , newsecret } = req.body;
    console.log( id );
    if( !id ) return res.status(400).json({msge: "userID IS MISSING"});
    if( !title ) return res.status(400).json({msge: "TITLE IS MISSING"});
    if( !newsecret ) return res.status(400).json({msge: "NEWSECRET IS MISSING"});
    try {    
    const SaveNewSecret = await NewSecretdata.findByIdAndUpdate(
         id,
         { title , newsecret },
         { new: true } // Return the updated document
        )

    if( !SaveNewSecret ) return res.status(404).json( {msge:"secret is not found"} )
     console.log("Edited secret details are here-->" , SaveNewSecret )
     res.status(201).json({success: "true" , msge:"secret edited and update in DB" , data: SaveNewSecret })

    } catch (error) {
        console.log( error,"error while updating the secret");
        res.status(500).json({success: "false" , msge:"error while updating the secret" , error });
    }
})


//HANDLE DELETE REQ 
app.delete("/delete-Secret/:postid" , async (req , res ) => {
    const { postid } = req.params;

    if( !postid ) return res.status(400).json({msge: "postid IS MISSING"});

    try {    
    const DeleteSecret = await NewSecretdata.findByIdAndDelete(postid)
     console.log("Edited secret details are here-->" , DeleteSecret )
     res.status(200).json({success: "true" , msge:"secret deleted and update in DB" , data: DeleteSecret })

    } catch (error) {
        console.log( error,"error while deleting the secret");
        res.status(500).json({success: "false" , msge:"error while deleting the secret" , error });
    }
})









//getting all the secrets shared by users 
app.get("/get-secret" , async (req , res ) => {
    try {    
    const Getallthesecrets = await NewSecretdata.find();
     console.log("all secrets are here",Getallthesecrets )
     res.status(200).json( { data: Getallthesecrets , msge:"fecthing the secrets"})

    } catch (error) {
        console.log( error,"error while fetching the data");
        res.status(500).json({success: "false" , msge:"error while fecthing the secrets" , error });
    }
})



//1ststep to change pw is to create nodemailer congi  
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: process.env.EMAIL_USER, //these details are coming from .env file
            pass: process.env.EMAIL_PASS,
        },
        secure: true, // Use secure connection (SSL)
        port: 465, // Port for SSL
        tls: {
          rejectUnauthorized: false, // Allow self-signed certificates
        },
        debug: true, // Log SMTP connection info
        logger: true,
      });
    

//HANDLE NEW SECRET TO ADD TO DB
app.post("/change-password" , async (req , res ) => {
    const { changeEmail } = req.body;
    if( !changeEmail ) return res.status(400).json({msge: "PLEASE PROVIDE EMAIL"});
    try {
          //2nd step to change pw is to find the correct user  
        const foundUser = await Usersignupdata.findOne( { email:changeEmail });
        if( !foundUser ) return res.status(404).json({ msge: " User not found Maybe not registered or email is incorrct "});
        
          //3rd step to change pw is to create jwt token for validation   
          const token = jwt.sign( { email:changeEmail } , process.env.JWT_SECRET , { expiresIn:"20min" })

          // 4th Step to Send Email with Reset Link
            const resetLink = `https://secret-share-web.onrender.com/reset-password/${token}`;
            const mailOptions = {
            from: process.env.EMAIL_USER,
            to: changeEmail,
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${resetLink}`,
        };
            await transporter.sendMail(mailOptions);
            res.status(200).json({success: "true" , msge:"Password reset email sent" , token })

    } catch (error) {
        console.log( error,"error while sending reset password link");
        res.status(500).json({success: "false" , msge:"error while sending reset password link" , error });
    }
})


//CHANGE THE PREV PASS AND STORE NEW PASSWORD IN DB
app.post("/reset-password" , async (req , res ) => {
    const { token , password , confirmpassword } = req.body;
     
    if( !token ) return res.status(400).json({msge: "token is expired"});
    if( !password || !confirmpassword ) return res.status(400).json({msge: "Please provide same PW"});

    try {
         //step 1 to verify the user using jwt token
        const decoded = jwt.verify( token , process.env.JWT_SECRET );

        const Founduser = await Usersignupdata.findOne( { email:decoded.email } )// finding the user with email 

        if (!Founduser) return res.status(404).json({ message: "Invalid token" });
        
        //if user is found then change the new password with old one
        const HashedPW = await Bcrypt.hash( password , 10 );
        Founduser.password = HashedPW;
        Founduser.confirmpassword = confirmpassword;
        await Founduser.save();
        console.log( "new pass word updated" )
        res.status(200).json({success: "true" , msge:"Password reset Success" })

    } catch (error) {
        console.log( error,"error while reseting the pw");
        res.status(500).json({success: "false" , msge:"error while reset password" , error });
    }
})





const PORT = process.env.PORT || 4000;
app.listen( PORT , () => {
    console.log( `BE in running on ${PORT}`)
});