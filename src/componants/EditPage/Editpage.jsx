import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Editpage.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';



const Editpage = () => {
    const { userID , username , oldtitle , oldsecret } = useParams();

    const [ title , setTitle ] = useState(`${oldtitle}`);
    const [ newsecret , setNewsecret ] = useState(`${oldsecret}`);
    const navigate = useNavigate();


    //function for sending edit req
    async function EditedSecret(e){
          e.preventDefault();

          const EditedData = {
                title,
                newsecret,
          }
          try {
               const response = await axios.put(`https://secret-share-web.onrender.com/Edit-Secret/${userID}` , EditedData , {
                headers:{
                    "Content-Type": "application/json",
                  }
               })
               const data = response.data;
               console.log("edited data is here -->" , data );
               alert("YOUR SECRET IS NOW UPDATED")
               navigate(`/homepage/${username}`);
               return response.status
          } catch (error) {
            console.log( error.msge )
                return error.msge   
          }
    }

  return (
    <div id='EditForm'>
    <h1 style={{ marginBottom:"20px"}}> Edit Your Secret </h1>
    <form onSubmit={ (e) => EditedSecret(e) }>
     <input onChange={ (e) => setTitle( e.target.value )} value={ title } type="text" placeholder='Title of Your secret...' id='secretTitle' />
     <textarea onChange={ (e)=> setNewsecret( e.target.value ) }value={ newsecret } name="secrettextarea" id="textarea" placeholder='Type Your Secret here'></textarea>
     <button type='submit' id='sharebtn'>Edit Secret</button>
    </form>
   </div>
)
}

export default Editpage
