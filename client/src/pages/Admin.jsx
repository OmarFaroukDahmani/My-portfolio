import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/signin"); // redirect if not logged in
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to Admin</h1>
    </div>
  );
}
