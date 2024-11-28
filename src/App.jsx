import Auth from "./componants/signupPage/Auth"
import Homepage from "./componants/Homepage/Homepage";
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import Editpage from "./componants/EditPage/Editpage";
import ResetPwPage from "./componants/ResetPasswordPage/ResetPwPage";
import Navbar from "./componants/Navbar/Navbar";


function App() {

  return (
  <BrowserRouter>
     <ToastContainer />
       <Navbar />
     <Routes>
        <Route path="/" element={ <Auth />} />
        <Route path="/homepage/:username" element = { <Homepage />} />
        <Route path="/EditSecret/:username/:userID/:oldtitle/:oldsecret" element = { <Editpage />} />
        <Route path="/reset-password/:token" element = { <ResetPwPage />} />
      </Routes>     

  </BrowserRouter>


  )
}

export default App
