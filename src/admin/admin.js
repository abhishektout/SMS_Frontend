import { useState } from "react";
import "./admin.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import App from "../App";
import api from "../WebApi/api";
import { Navigate, useNavigate } from "react-router-dom";
export function Admin(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const submitForm =async (event) =>{
            event.preventDefault();
            try{
                let response = await axios.post(api.URL_S+api.ADMIN_SIGNIN,{email,password})
                if(response.data.status){
                    toast.success("Sign In successfully.....");
                    navigate("/home")
                }
            }
            catch(err){
                toast.error("Something went wrong....");
            }
    }
       return<>
            <ToastContainer/>
            <div className="main-div">
                <div className="container container1">
                    <div className="row row1">
                        <div className="col-6">
                            <form onSubmit={submitForm}>
                                <h2 id="heading">Admin Form</h2>
                                <input className="input1" onChange={(event)=>setEmail(event.target.value)} placeholder="Enter Email"/>
                                <input className="input1" onChange={(event)=>setPassword(event.target.value)} type="password" placeholder="Enter Password" /><br/>      
                                <button className="btn btn-success btn-success1 mt-4" type="submit">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </>
}