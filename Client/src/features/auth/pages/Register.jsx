import React from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
const Register = () => {



  const navigate = useNavigate();
  // Two-Way Binding (Step 1): Component state acts as the source of truth
  const [username, setusername] = React.useState("")
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };
  
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
        
          <div className="input-group">
            <label htmlFor="username">Username</label>
            {/* 
              Two-Way Binding (UI -> State):
              When the user types, onChange fires and setusername updates the state with e.target.value.
              (To complete the 2-way loop from State -> UI, add: value={username})
            */}
            <input onChange={(e) => setusername(e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
            ></input>
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            {/* 
              Two-Way Binding (UI -> State):
              When the user types, onChange fires and setEmail updates the state with e.target.value.
              (To complete the 2-way loop from State -> UI, add: value={email})
            */}
            <input onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
            ></input>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            {/* 
              Two-Way Binding (UI -> State):
              When the user types, onChange fires and setPassword updates the state with e.target.value.
              (To complete the 2-way loop from State -> UI, add: value={password})
            */}
            <input onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
            ></input>
          </div>
          <button className="button primary-button" type="submit">
            Register
          </button>
        </form>

        <p>
            Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
