import React from "react";
import { useState } from "react";
import "../signupPage/Auth.css";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ResetPwPage = () => {
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate()
  async function ChnagePW(e) {
    //Handle Password Change req
      e.preventDefault();
      const data = {
        token,
        password,
        confirmpassword
      };
     
      if( password !== confirmpassword ) Window.alert("both passwords are not same");

      try {
        const response = await axios.post(
          "https://secret-share-web.onrender.com/reset-password",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("new password is updated")
        console.log("passoword updated")
        navigate("/")
        return response.status;
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="signupcard">
      <div id="signupinputs">
        <form onSubmit={(e) => ChnagePW(e)}>
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
            {" "}
            Chnage Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPwPage;
