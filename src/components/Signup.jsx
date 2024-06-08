import React, { useState } from "react";
import Authservice from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [error, setError] = useState(false);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm();
  const user_creation = async (data) => {
    try {
        const userData=await Authservice.createAccount(data);
        if(userData){
            const userData=await Authservice.getAccount();
            if(userData)dispatch(login({userData}));
            navigate("/");

        }
    } catch (error) {
      console.log(error.message);
    }
  };
  return <div></div>;
}

export default Signup;
