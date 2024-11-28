import React, { useEffect, useState } from 'react'
import './Homepage.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
     const { username } = useParams();
     const [ title , setTitle ] = useState("");
     const [ newsecret , setNewsecret ] = useState("");
     const [ allsecrets , setAllsecrets ] = useState([]);
     const navigate = useNavigate();
    
     //FUNCTION FOR SEDNING NEW DATA TO BE
     async function SendSecretToDB( e ){
           e.preventDefault();
           const SecretData = {
            username,
            title,
            newsecret
           }

           try {
             const Response  = await axios.post("https://secret-share-web.onrender.com/newsecret", SecretData , {
              headers:{
                "Content-Type": "application/json",
              }
             })
             const data =  Response.data
             console.log("New Secret is sent and the Data is this" , data );
             alert("Your secret is Live")
             setTitle("");
             setNewsecret(""); 
             window.location.reload();
             return Response.status;
             
           } catch (error) {
             console.log(error, "error while sending new data to BE");
             return error.msge;
           }
     }

     //FUNCTION FOR GETTING ALL THE SECRET DATA
  useEffect( ( )=> {
              async function GetAllTheSecrets(){

                try {
                   const response = await axios.get("/get-secret");                                                  
                   console.log("API Response:", response.data.data); // Log response
                    setAllsecrets(response.data.data); // setting the data.data because for getting all the secret we need to map data array
                    return response.status
                } catch (error) {
                  console.log(error.msge,"error while fetching all the data");
                  return error.msge;
                }
              }
     GetAllTheSecrets();
     },[])

//FUNCT FOR EDITING THE SECRETS
function EditSecret( e , userID , username , oldtitle , oldsecret ){
     e.preventDefault();
      navigate(`/EditSecret/${username}/${userID}/${oldtitle}/${oldsecret}`)
      console.log("this is userid-->", userID) 
}

async function deleteSecret( e , postid ) {
     e.preventDefault();
     
     const confirmation = window.confirm("Are you sure to delete this Secret?");
     if( confirmation ) 
  {
      try {
        const response = await axios.delete(`https://secret-share-web.onrender.com/delete-secret/${postid}`,{

        } )
        const data = response.data;
        console.log( "deleted secret is" ,data);
        window.location.reload(); // Refresh the page
        return response.status;

    } catch (error) {
     console.log(error);
     return error.msge
    }
  }
  else{
    console.log(" delete req can by user ");
  }
}


  return (
    <div id='HomepageBG'>
  <div style={{ padding:"0px 20px 0px 20px"}}>
    <div id='homepagenamecard'>
        <div id='namecard'>
             
             <div id='name'>
                  <h1> Hi,{username} </h1>
             </div>
             <div id='share'>
                  <h1> Share your Secret </h1>
             </div>
             <div id='namepara'>
                  <p>Share your secret with us. Your identity will remain anonymous</p>
             </div>
             <div id='form'>
                   <form onSubmit={ (e) => SendSecretToDB(e) }>
                    <input onChange={ (e) => setTitle( e.target.value )} value={ title } type="text" placeholder='Title of Your secret...' id='secretTitle' />
                    <textarea onChange={ (e)=> setNewsecret( e.target.value ) }value={ newsecret } name="secrettextarea" id="textarea" placeholder='Type Your Secret here...'></textarea>
                    <button type='submit' id='sharebtn'>Share Secret</button>
                    <div style={ {width:"100%" , marginTop:"15px" , textAlign:"center" , padding: "0px 10px 0px 10px"}}>
                      <a href="#sharedsecretsection"><i class="fa-solid fa-circle-down fa-2x" id='scrolldownIcon'></i>
                       </a>
                    </div>
                   </form>
             </div>
        </div>
    </div>
  </div>
  
    <div id='sharedsecretsection'>
            <div id='sharedsecretbox'>
               <div id='secretbox'>
                     <div id='secretsharehead'>
                            <h1> Secrets Shared </h1>
                     </div>
                     <div id='secretsharepara'>
                           <p> Read the secret shared by others.Remember respect everyone's privacy. </p>
                     </div>

                     {/* START //other users shared single card */}
                     {console.log("allsecrets array",allsecrets)}
                     {allsecrets.map( (secrets) => (
              <div id='othersSecretbox' key={secrets._id}>
                        <div id='Secretsinglebox'>
                          <div id='usernamesection'>
                              <h4 style={{ color:"grey"}}> @{ secrets.username.charAt(0).toUpperCase() +secrets.username.slice(1) } </h4>
                              <div style={{ display: secrets.username === username ? "block" : "none" }}>
                              <button id='editbtn' onClick={ (e) => EditSecret( e , secrets._id , secrets.username , secrets.title , secrets.newsecret ) }>Edit</button>
                              <button id='dltbtn' onClick={ (e) => deleteSecret( e, secrets._id )}>Delete</button>
                              </div>
                          </div>                          
                        <div id='Titlesection'>
                              <h3> {secrets.title} </h3>
                        </div>
                        <div id='sharedsecretpara'>
                           <h5> { secrets.newsecret} </h5> 
                        </div>
                     </div>
              </div>
                     ))}
              {/* END //other users shared single card */}
              <div style={{ width: "100%", marginTop:"10px" , paddingLeft:"90px", paddingRight:"90px"}}>
                       <button type='submit' onClick={ () => navigate('/')} id='LogoutBtn'>Log out</button>
              </div>

               </div>
            </div>
     </div>
    </div>

  )
}

export default Homepage
