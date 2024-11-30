import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  // State variables to manage form visibility
  const [openloginform, setopenloginform] = useState("none");
  const [opensignupform, setopensignupform] = useState("block");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [changeEmail, setchangeEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [openchangepwform, setopenchangepwform] = useState("none");
  const Navigate = useNavigate();

  // Opens the login form and hides others
  function handleopenforms(e) {
    if (e.preventDefault) e.preventDefault(); // Prevents default behavior
    setopensignupform("none");
    setopenloginform("block");
    setopenchangepwform("none");
  }

  // Opens the signup form and hides others
  function handleopensignup(e) {
    if (e.preventDefault) e.preventDefault();
    setopensignupform("block");
    setopenloginform("none");
    setopenchangepwform("none");
  }

  // Opens the password change form and hides others
  function ChnagePassword(e) {
    if (e.preventDefault) e.preventDefault();
    setopenloginform("none");
    setopensignupform("none");
    setopenchangepwform("block");
  }

  // Function to send signup data to the backend
  async function Senduserdata(e) {
    e.preventDefault(); // Prevents the default form submission behavior

    const userdata = {
      username,
      email,
      password,
      confirmpassword,
    };

    try {
      // Sending data to the backend signup endpoint
      const response = await axios.post(
        "https://secret-share-web.onrender.com/signup",
        userdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data; // Extracting response data
      setopensignupform("none"); // Switch to login form upon successful signup
      setopenloginform("block");
      alert("Signup successful");
      console.log("Signup response:", data);
      return response.status;
    } catch (error) {
      // Handle error cases, such as mismatched passwords
      alert("Both passwords must match");
      console.log("Signup error:", error);
    }
  }

  // Function to handle user login
  async function HandleLogin(e) {
    e.preventDefault();

    const logindata = {
      username,
      password,
    };

    try {
      // Sending login data to the backend login endpoint
      const response = await axios.post(
        "https://secret-share-web.onrender.com/login",
        logindata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // If login is successful, redirect to the homepage
        const data = response.data;
        console.log("Login successful:", data);
        Navigate(`/homepage/${username}`);
      } else {
        console.error("Login failed. Status:", response.status);
      }
      return response.status;
    } catch (error) {
      console.log("Login error:", error);
    }
  }

  // Function to handle password reset requests
  async function HandlePasswordChange(e) {
    e.preventDefault();

    const data = {
      changeEmail,
    };

    try {
      // Sending password reset request to the backend
      const response = await axios.post(
        "https://secret-share-web.onrender.com/change-password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("reset link is sent on your Email")
      return response.status;
    } catch (error) {
      console.log("Password change error:", error);
    }
  }

  return (
    <div className="signupcard">
      {/* /////////////// SIGNUP FORM SECTION /////////////// */}
      <div id="signupinputs" style={{ display: `${opensignupform}` }}>
        <form onSubmit={(e) => Senduserdata(e)}>
          <label> Username </label>
          <input
            onChange={(e) => setusername(e.target.value)}
            type="text"
            placeholder="Username"
            id="inputbox"
          />

          <label> Email </label>
          <input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            placeholder="Email"
            id="inputbox"
          />

          <label> Password </label>
          <input
            onChange={(e) => setpassword(e.target.value)}
            minLength={8}
            type="password"
            placeholder="Password"
            id="inputbox"
          />

          <label> Confirm Password </label>
          <input
            onChange={(e) => setconfirmpassword(e.target.value)}
            minLength={8}
            type="text"
            placeholder="Confirm password"
            id="inputbox"
          />

          <button type="submit" id="signupbtn">
            Sign Up
          </button>
          <div id="donthaveaccount">
            <p> Already have an account? </p>
            <button id="logintbn" onClick={(e) => handleopenforms(e)}>
              Login
            </button>
          </div>
        </form>
      </div>

      {/* /////////////// LOGIN FORM SECTION /////////////// */}
      <div id="loginnputs" style={{ display: `${openloginform}` }}>
        <form onSubmit={(e) => HandleLogin(e)}>
          <label> Username </label>
          <input
            onChange={(e) => setusername(e.target.value)}
            type="text"
            placeholder="Username"
            id="inputbox"
          />

          <label> Password </label>
          <input
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            placeholder="Password"
            id="inputbox"
          />

          <button type="submit" id="signupbtn">
            Login
          </button>
          <div id="donthaveaccount">
            <p> Don't have an account? </p>
            <button id="logintbn" onClick={(e) => handleopensignup(e)}>
              Signup
            </button>
          </div>
          <div id="donthaveaccount">
            <p> Forgot password? </p>
            <button id="logintbn" onClick={(e) => ChnagePassword(e)}>
              Click here
            </button>
          </div>
        </form>
      </div>

      {/* /////////////// PASSWORD CHANGE FORM SECTION /////////////// */}
      <div id="loginnputs" style={{ display: `${openchangepwform}` }}>
        <form onSubmit={(e) => HandlePasswordChange(e)}>
          <label> Registered Email </label>
          <input
            onChange={(e) => setchangeEmail(e.target.value)}
            type="text"
            placeholder="Registered Email..."
            id="inputbox"
          />

          <button type="submit" id="signupbtn">
            Reset password
          </button>
          <div id="donthaveaccount">
            <p> Go</p>
            <button id="logintbn" onClick={(e) => handleopenforms(e)}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
