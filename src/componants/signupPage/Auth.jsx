import React, { useState } from 'react'
import './Auth.css';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth = () => {
      const [ openloginform , setopenloginform] = useState("none");
      const [ opensignupform , setopensignupform] = useState("block");
      const [ username , setusername ] = useState("")
      const [ email , setemail ] = useState("")
      const [ changeEmail , setchangeEmail ] = useState("");
      const [ password , setpassword ] = useState("")
      const [ confirmpassword , setconfirmpassword ] = useState("")
      const [ openchangepwform , setopenchangepwform ] = useState("none")
      const Navigate = useNavigate();



  //SIGNUP FORMM OPEN
  function handleopenforms (e){
        if(e.preventDefault) e.preventDefault();
        setopensignupform("none");
        setopenloginform("block");
        setopenchangepwform("none");
      }
  //LOGIN FORMM OPEN

      function handleopensignup (e){
        if(e.preventDefault) e.preventDefault();
        setopensignupform("block");
        setopenloginform("none");
        setopenchangepwform("none");
      }
  //CHANGE PASSWORD FORMM OPEN
   function ChnagePassword(e){
    if(e.preventDefault) e.preventDefault();
    setopenloginform("none");
    setopensignupform("none");
    setopenchangepwform("block");
} 
   



    // functon for SENDING USER SIGNUP DATA TO BE
    async function Senduserdata(e){
          e.preventDefault();

      //creating userdata model for user details
      const userdata ={
        username,
        email,
        password,
        confirmpassword,
      }
          try {
                 const response = await axios.post("https://secret-share-web.onrender.com/signup" , userdata , {
                  headers: {
                    "Content-Type": "application/json",
                  },
                 })
                 const data = response.data;

                //  toast.success("Signup success please login", {
                //   autoClose: 3000, // Duration in milliseconds (3 seconds)
                // });

                setopensignupform("none");
                setopenloginform("block");
                console.log("this is data from BE-->", data )
                alert("signup success")
                return response.status
               
          } catch (error) {
            alert("both passwords are not same")
            console.log( error ,"failed to send user signup data");        
          }
    }
    
    // functon for LOGIN
    async function HandleLogin(e){
          e.preventDefault();
          const logindata ={
            username,
            password,
          }

          try {
                 const response = await axios.post("https://secret-share-web.onrender.com/login" , logindata , {
                  headers: {
                    "Content-Type": "application/json",
                  },
                 })

                 // Handle successful response
                if (response.status === 200) {
                const data = response.data;
                console.log("Login successful! Data from backend -->", data);

                // Redirect to homepage with username
                 Navigate(`/homepage/${username}`);
                 } else {
                 console.error("Login failed. Response status:", response.status);
                 }
                return response.status
          } catch (error) {
            console.log("failed to send user signup data");    
          }
    }


//Handle Password Change req
async function  HandlePasswordChange(e){
                e.preventDefault();
          const data = {
            changeEmail
          }
     
      try {
            const response = await axios.post("https://secret-share-web.onrender.com/change-password", data ,{
              headers: {
                "Content-Type": "application/json",
              },
            } )
            return response.status
      } catch (error) {
          console.log( error )
      }

}
 
  return (
    <div className='signupcard'>
 {/* ///////////// SIGN UP FORM SECTION//////////// */}
           <div id='signupinputs' style={{ display: `${opensignupform}`}}>
                <form onSubmit={ (e) => Senduserdata(e) } >
                    <label> Username </label>
                    <input onChange={ (e) => setusername(e.target.value) } type="text" placeholder='Username' id='inputbox' />

                    <label> Email </label>
                    <input onChange={ (e) => setemail(e.target.value) } type="email" placeholder='Email'   id='inputbox'/>

                    <label> Password </label>
                    <input onChange={ (e) => setpassword(e.target.value) } minLength={8} type="password" placeholder='Password' id='inputbox' />

                    <label> Confirm Password </label>
                    <input onChange={ (e) => setconfirmpassword(e.target.value) } minLength={8} type="text" placeholder='Confirm password' id='inputbox'/>

                    <button type='submit' id='signupbtn'> Sign Up</button>
                    <div id='donthaveaccount'>
                       <p> Already have an account? </p>
                       <button id='logintbn' onClick={ (e) => handleopenforms(e) }  > Login </button>
                    </div>
                </form>
          </div>


           {/* ///////////// login FORM SECTION//////////// */}
          <div id='loginnputs' style={{ display: `${openloginform}`}}> 
                <form onSubmit={ (e) => HandleLogin(e) } >
                    <label> Username </label>
                    <input onChange={ (e) => setusername(e.target.value) } type="text" placeholder='Username' id='inputbox' />

                    <label> Password </label>
                    <input onChange={ (e) => setpassword(e.target.value) } type="password" placeholder='Password' id='inputbox'/>

                    <button type='submit' id='signupbtn'> Login </button>
                    <div id='donthaveaccount'>
                       <p> Don't have an account? </p>
                       <button id='logintbn' onClick={ (e) => handleopensignup(e) } > Signup </button>
                    </div>
                    <div id='donthaveaccount'>
                       <p> Forgot password? </p>
                       <button id='logintbn' onClick={ (e) => ChnagePassword(e) } > Click here </button>
                    </div>
                </form>
          </div>

          <div id='loginnputs' style={{ display: `${openchangepwform}`}}> 
                <form onSubmit={ (e) => HandlePasswordChange(e) } >
                    <label> Registered Email </label>
                    <input onChange={ (e) => setchangeEmail(e.target.value) } type="text" placeholder='Registered Email...' id='inputbox' />

                    <button type='submit' id='signupbtn'> Reset password </button>
                    <div id='donthaveaccount'>
                    <p> Go</p>
                       <button id='logintbn' onClick={ (e) => handleopenforms(e) } > Login </button>
                    </div>
                </form>
          </div>

    </div>
  )
}

export default Auth
