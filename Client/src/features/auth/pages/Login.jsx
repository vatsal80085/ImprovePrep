import React from 'react'
import "../auth.form.scss"
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router' 


const Login = () => {

    const {loading, handleLogin}=useAuth()
    const navigate=useNavigate() 

    // Two-Way Binding (Step 1): Component state acts as the source of truth
    const [email, setEmail]=React.useState("")
    const [password, setPassword]=React.useState("")
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await handleLogin({email, password})
        navigate("/")
    }
    if(loading){
        return (<main>
            <div className="form-container">
                <h1>Loading...</h1>
            </div>
        </main>)
    }


  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    {/* 
                      Two-Way Binding (UI -> State):
                      When the user types, onChange fires and setEmail updates the state with e.target.value.
                      (To complete the 2-way loop from State -> UI, add: value={email})
                    */}
                    <input onChange={(e)=>{setEmail(e.target.value)}}
                    type="email" id="email" name='email' placeholder='Enter email address'></input>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    {/* 
                      Two-Way Binding (UI -> State):
                      When the user types, onChange fires and setPassword updates the state with e.target.value.
                      (To complete the 2-way loop from State -> UI, add: value={password})
                    */}
                    <input onChange={(e)=>{setPassword(e.target.value)}}
                    type="password" id="password" name='password' placeholder='Enter password'></input>
                </div>
                <button className="button primary-button" type='submit'>Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    </main>
  )
}

export default Login