import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";



export const Auth = ({type} : {type: "Signup" | "Signin"})=>{
    const [postInputs,setPostInputs] = useState({
        name : "",
        email : "",
        password : ""
    });
    const navigate = useNavigate();
    async function sendRequest(){
    try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=== "Signup"?"signup":"signin"}`,postInputs);
        const jwt = response.data;
        localStorage.setItem("token",jwt);
        navigate("/blogs");
    } catch(e){
        alert("ERROR WHILE PERFORMING REQUEST")
    }
}
     return <div className="flex-col flex justify-center h-screen">
         <div className="flex justify-center">
           <div > 
            <div className="px-10">
         <div className="text-4xl font-extrabold">
            Create an Account
            </div>
            <div className="text-slate-700 pt-2">
                {type === "Signin" ?"Don't have an account":"Already have an account?"}
                <Link className="pl-2 underline" to={type ==="Signin" ? "/signup" : "/signin"}>
                {type==="Signin"? "Sign up" :"Sign in"}</Link>
            </div>
            </div>
            <div className="pt-4">
                {type==="Signup"?<LabelledInput label ="Name" placeholder="Enter your name.." onChange={(e)=>{
                  setPostInputs({
                    ...postInputs,
                    name:e.target.value
                  })
            }}></LabelledInput>:null}
            <LabelledInput label ="Email" placeholder="random123@gmail.com" onChange={(e)=>{
                  setPostInputs({
                    ...postInputs,
                    email:e.target.value
                  })
            }}></LabelledInput>
            <LabelledInput label ="Password" type = {"password"} placeholder="********" onChange={(e)=>{
                  setPostInputs({
                    ...postInputs,
                    password:e.target.value
                  })
            }}></LabelledInput>
            <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "Signup" ? "Sign up" : "Sign in"}</button>
            </div>
            </div>
            </div>
     </div>
}


interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({label,placeholder,onChange,type}: LabelledInputType){
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}