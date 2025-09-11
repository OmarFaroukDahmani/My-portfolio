import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/signin.css'

export default function Signin() {
  const [input, setInput] = useState({
    username: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/admin");
      } else {
        setMessage(data.error || data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("Server error: " + error.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="signin-form">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) =>
              setInput({ ...input, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setInput({ ...input, password: e.target.value })
            }
          />
          <button type="submit">Login</button>
        </form>
        {message && <p className="error-msg">{message}</p>}
      </div>
    </div>
  );
}
