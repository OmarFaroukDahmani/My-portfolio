import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/admin.css"; 

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [showSkills, setShowSkills] = useState([]);
  const [skill, setSkill] = useState({ name: "" });
  const [project, setProject] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    github: "",
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch skills
  useEffect(() => {
    const getSkills = async () => {
      try {
        const response = await fetch("http://localhost:8080/skills", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch skills");

        const data = await response.json();
        setShowSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    getSkills();
  }, []);

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

  // Add skill
  const handleAddingSkill = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/add_skill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skill),
      });

      const data = await response.json();
      alert(data.message);

      // Refresh UI
      setShowSkills([...showSkills, skill]);
      setSkill({ name: "" });
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  // Delete Skill 
  const handleDeleteSkill = async (id, name) => {
  const confirmDelete = window.confirm(`Delete skill "${name}"?`);
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:8080/delete_skill/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    alert(data.message);

    // Remove skill from UI
    setShowSkills(showSkills.filter(skill => skill.id !== id));
  } catch (err) {
    console.error("Error deleting skill:", err);
  }
};


  return (
    <div className="admin-container">
      <h1 className="welcome">Welcome {user?.username}</h1>

      {/* Add project form */}
      <div className="card">
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

          <div className="checkbox-group">
            <p>Select Skills:</p>
            {showSkills.map((s, index) => (
              <div key={index} className="checkbox-item">
                <input type="checkbox" value={s.name} id={`skill-${index}`} />
                <label htmlFor={`skill-${index}`}>{s.name}</label>
              </div>
            ))}
          </div>

          <button type="submit" className="submit-btn">Add Project</button>
        </form>
      </div>

      {/* Add skill */}
      <div className="card">
        <h2>Add Skill</h2>
        <form onSubmit={handleAddingSkill} className="skill-form">
          <input
            type="text"
            placeholder="Enter your skill"
            required
            value={skill.name}
            onChange={(e) => setSkill({ ...skill, name: e.target.value })}
          />
          <button type="submit" className="submit-btn">Add Skill</button>
        </form>
      </div>

      {/* Projects list */}
      <div className="card">
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

      {/* Skills list */}
      <div className="card">
        <h2>My Skills</h2>
        <ul className="skills-list">
          {showSkills.map((s) => (
            <li key={s.id} className="skill-item">
              {s.name}
              <button
                className="delete-skill-btn"
                onClick={() => handleDeleteSkill(s.id, s.name)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
