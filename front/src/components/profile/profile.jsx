import { AuthContext } from "../../pages/context/authcontext";
import React, {useContext} from "react"
const Profile = () => {
  
    const { currentUser } = useContext(AuthContext);console.log(currentUser); return (<>
    
    
    </>) }
    export default Profile;// ✅ Correctly calling useContext
