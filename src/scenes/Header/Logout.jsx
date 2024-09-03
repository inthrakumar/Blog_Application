import React from 'react'
import { useDispatch } from 'react-redux'
import Data_service from "../../appwrite/data_config";
import { logout } from '../../redux/slice/authSlice';

function Logout() {
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        Data_service.logout().then(()=>{
            dispatch(logout());
        })
        
    }
  return (
    <button onClick={logoutHandler}>

    </button>
  )
}

export default Logout
