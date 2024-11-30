import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Editpage.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Editpage = () => {
  // Extract parameters from the URL (userID, username, oldtitle, and oldsecret)
  const { userID, username, oldtitle, oldsecret } = useParams();

  // State to hold the updated title and secret
  const [title, setTitle] = useState(`${oldtitle}`);
  const [newsecret, setNewsecret] = useState(`${oldsecret}`);

  // Navigate hook to redirect users
  const navigate = useNavigate();

  // Function to send edited secret data to the backend
  async function EditedSecret(e) {
    e.preventDefault();

    // Data to be sent to the backend
    const EditedData = {
      title,
      newsecret,
    };

    try {
      // API call to update the secret
      const response = await axios.put(
        `https://secret-share-web.onrender.com/Edit-Secret/${userID}`,
        EditedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log("Edited data is here -->", data);

      // Notify the user that the update was successful
      alert("YOUR SECRET IS NOW UPDATED");

      // Redirect to the homepage
      navigate(`/homepage/${username}`);

      return response.status;
    } catch (error) {
      console.log(error.msge); // Log any error messages
      return error.msge;
    }
  }

  return (
    <div id="EditForm">
      <h1 style={{ marginBottom: "20px" }}> Edit Your Secret </h1>
      {/* Form to edit the secret */}
      <form onSubmit={(e) => EditedSecret(e)}>
        <input
          onChange={(e) => setTitle(e.target.value)} // Update title state
          value={title}
          type="text"
          placeholder="Title of Your secret..."
          id="secretTitle"
        />
        <textarea
          onChange={(e) => setNewsecret(e.target.value)} // Update secret state
          value={newsecret}
          name="secrettextarea"
          id="textarea"
          placeholder="Type Your Secret here"
        ></textarea>
        <button type="submit" id="sharebtn">
          Edit Secret
        </button>
      </form>
    </div>
  );
};

export default Editpage;
