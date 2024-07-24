import { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import Register from "../pages/Register";
import Login from "../pages/Login";
import "../styles/Form.css"
import LoadingIndicator from "../components/Loader";


function Form(routemethod){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState("")
    const navigate = useNavigate();

    const name = routemethod.method === "login" ? "Login" : "Register";
    //console.log(routemethod.route)
    //console.log(routemethod.method)

    const handleSubmit = async (e) =>{
        setLoading(true)
        e.preventDefault()
        try{
            const res = await api.post(routemethod.route, {username, password})
            console.log(res)
            if(routemethod.method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            }
            else{
                navigate("/login")
            }
        }
        catch(error){
            alert(error)
        }
        finally{
            setLoading(false)
        }
    };

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input 
        className="form-input" 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e)=> setUsername(e.target.value)}/>
        <input 
        className="form-input" 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e)=> setPassword(e.target.value)}/>
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">{name}</button>
    </form>
}

export default Form
