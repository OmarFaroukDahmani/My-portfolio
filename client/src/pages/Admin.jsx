import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/admin.css"; 

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    github: "",
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch projects
  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch(`http://localhost:8080/projects`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch projects");

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    getProjects();
  }, []);

  // Protect route
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [navigate, user]);

  // Add project
  const handleAddingProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/add_project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      const data = await response.json();
      alert(data.message);

      // Refresh list
      setProjects([...projects, project]);
      setProject({ title: "", description: "", image: "", link: "", github: "" });
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      alert(data.message);

      // Remove project from state immediately
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="welcome">Welcome {user?.username}</h1>

      {/* Add project form */}
      <div className="add-project">
        <h2>Add Project</h2>
        <form onSubmit={handleAddingProject} className="project-form">
          <input
            type="text"
            placeholder="Title"
            required
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            required
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            required
            value={project.image}
            onChange={(e) => setProject({ ...project, image: e.target.value })}
          />
          <input
            type="text"
            placeholder="Preview Link"
            required
            value={project.link}
            onChange={(e) => setProject({ ...project, link: e.target.value })}
          />
          <input
            type="text"
            placeholder="GitHub Link"
            required
            value={project.github}
            onChange={(e) => setProject({ ...project, github: e.target.value })}
          />
          <button type="submit" className="submit-btn">Add Project</button>
        </form>
      </div>

      {/* List projects */}
      <div className="projects-list">
        <h2>My Projects</h2>
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project Id</th>
              <th>Title</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>
                  <Link to={`/admin/edit/${p.id}`}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                </td>
                <td>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
