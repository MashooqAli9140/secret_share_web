import React, { useEffect, useState } from "react";
import "./Homepage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  // Extracting the username from URL parameters
  const { username } = useParams();

  // State to hold the title and secret text for a new secret
  const [title, setTitle] = useState("");
  const [newsecret, setNewsecret] = useState("");

  // State to store all secrets fetched from the backend
  const [allsecrets, setAllsecrets] = useState([]);

  // Navigate hook for redirection
  const navigate = useNavigate();

  // Function to send a new secret to the backend
  async function SendSecretToDB(e) {
    e.preventDefault();

    // Data to be sent to the backend
    const SecretData = {
      username,
      title,
      newsecret,
    };

    try {
      // API call to save the new secret
      const Response = await axios.post(
        "https://secret-share-web.onrender.com/newsecret",
        SecretData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = Response.data;
      console.log("New Secret is sent and the Data is this", data);

      // Notify the user of successful submission
      alert("Your secret is Live");

      // Clear input fields
      setTitle("");
      setNewsecret("");

      // Refresh the page to fetch updated data
      window.location.reload();

      return Response.status;
    } catch (error) {
      console.log(error, "error while sending new data to BE");
      return error.msge;
    }
  }

  // Fetch all secrets when the component is mounted
  useEffect(() => {
    async function GetAllTheSecrets() {
      try {
        // API call to fetch secrets
        const response = await axios.get("/get-secret");
        console.log("API Response:", response.data.data);

        // Set the fetched secrets in the state
        setAllsecrets(response.data.data);
        return response.status;
      } catch (error) {
        console.log(error.msge, "error while fetching all the data");
        return error.msge;
      }
    }
    GetAllTheSecrets();
  }, []);

  // Navigate to the edit page with the secret details
  function EditSecret(e, userID, username, oldtitle, oldsecret) {
    e.preventDefault();
    navigate(`/EditSecret/${username}/${userID}/${oldtitle}/${oldsecret}`);
    console.log("this is userid-->", userID);
  }

  // Function to delete a specific secret
  async function deleteSecret(e, postid) {
    e.preventDefault();

    // Confirm deletion with the user
    const confirmation = window.confirm("Are you sure to delete this Secret?");
    if (confirmation) {
      try {
        // API call to delete the secret
        const response = await axios.delete(
          `https://secret-share-web.onrender.com/delete-secret/${postid}`,
          {}
        );
        const data = response.data;
        console.log("Deleted secret is", data);

        // Refresh the page after deletion
        window.location.reload();
        return response.status;
      } catch (error) {
        console.log(error);
        return error.msge;
      }
    } else {
      console.log("Delete request canceled by user");
    }
  }

  return (
    <div id="HomepageBG">
      <div style={{ padding: "0px 20px 0px 20px" }}>
        <div id="homepagenamecard">
          <div id="namecard">
            <div id="name">
              <h1> Hi, {username} </h1>
            </div>
            <div id="share">
              <h1> Share your Secret </h1>
            </div>
            <div id="namepara">
              <p>
                Share your secret with us. Your identity will remain anonymous
              </p>
            </div>
            <div id="form">
              {/* Form for submitting a new secret */}
              <form onSubmit={(e) => SendSecretToDB(e)}>
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
                  placeholder="Type Your Secret here..."
                ></textarea>
                <button type="submit" id="sharebtn">
                  Share Secret
                </button>
                <div
                  style={{
                    width: "100%",
                    marginTop: "15px",
                    textAlign: "center",
                    padding: "0px 10px 0px 10px",
                  }}
                >
                  <a href="#sharedsecretsection">
                    <i
                      class="fa-solid fa-circle-down fa-2x"
                      id="scrolldownIcon"
                    ></i>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div id="sharedsecretsection">
        <div id="sharedsecretbox">
          <div id="secretbox">
            <div id="secretsharehead">
              <h1> Secrets Shared </h1>
            </div>
            <div id="secretsharepara">
              <p>
                Read the secrets shared by others. Remember to respect
                everyone's privacy.
              </p>
            </div>

            {/* Displaying all secrets */}
            {console.log("allsecrets array", allsecrets)}
            {allsecrets.map((secrets) => (
              <div id="othersSecretbox" key={secrets._id}>
                <div id="Secretsinglebox">
                  <div id="usernamesection">
                    <h4 style={{ color: "grey" }}>
                      @
                      {secrets.username.charAt(0).toUpperCase() +
                        secrets.username.slice(1)}
                    </h4>
                    <div
                      style={{
                        display:
                          secrets.username === username ? "block" : "none",
                      }}
                    >
                      <button
                        id="editbtn"
                        onClick={(e) =>
                          EditSecret(
                            e,
                            secrets._id,
                            secrets.username,
                            secrets.title,
                            secrets.newsecret
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        id="dltbtn"
                        onClick={(e) => deleteSecret(e, secrets._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div id="Titlesection">
                    <h3> {secrets.title} </h3>
                  </div>
                  <div id="sharedsecretpara">
                    <h5> {secrets.newsecret} </h5>
                  </div>
                </div>
              </div>
            ))}
            <div
              style={{
                width: "100%",
                marginTop: "10px",
                paddingLeft: "90px",
                paddingRight: "90px",
              }}
            >
              {/* Logout button */}
              <button
                type="submit"
                onClick={() => navigate("/")}
                id="LogoutBtn"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
