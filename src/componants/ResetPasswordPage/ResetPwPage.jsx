import React from "react";
import { useState } from "react";
import "../signupPage/Auth.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPwPage = () => {
  // State variables to hold the new password and confirmation password
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  // Extract the token from the URL parameters
  const { token } = useParams();

  // Navigate hook to redirect the user after successful password reset
  const navigate = useNavigate();

  // Function to handle the password reset request
  async function ChnagePW(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Data object to send to the backend, including token and passwords
    const data = {
      token,
      password,
      confirmpassword,
    };

    // Check if the password and confirmation password match
    if (password !== confirmpassword) {
      window.alert("Both passwords must match");
      return; // Exit the function if passwords do not match
    }

    try {
      // Send the password reset request to the backend
      const response = await axios.post(
        "https://secret-share-web.onrender.com/reset-password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Alert the user of a successful password update
      alert("New password has been updated");
      console.log("Password updated successfully");

      // Redirect the user to the home page
      navigate("/");
      return response.status; // Return the response status for further handling if needed
    } catch (error) {
      // Log any errors during the API call
      console.log("Error updating password:", error);
    }
  }

  return (
    <div className="signupcard">
      {/* Form to accept new password and confirmation password */}
      <div id="signupinputs">
        <form onSubmit={(e) => ChnagePW(e)}>
          <label> Password </label>
          <input
            onChange={(e) => setpassword(e.target.value)} // Update the password state
            minLength={8} // Ensure a minimum length of 8 characters
            type="password"
            placeholder="Password"
            id="inputbox"
          />

          <label> Confirm Password </label>
          <input
            onChange={(e) => setconfirmpassword(e.target.value)} // Update the confirmation password state
            minLength={8} // Ensure a minimum length of 8 characters
            type="text"
            placeholder="Confirm password"
            id="inputbox"
          />

          {/* Submit button to trigger the password reset process */}
          <button type="submit" id="signupbtn">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPwPage;
