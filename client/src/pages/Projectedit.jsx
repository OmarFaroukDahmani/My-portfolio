import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/projectedit.css';

export default function Projectedit() {
  const [values, setValues] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    github: "",
    message: ""
  });

  const { id } = useParams(); 
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:8080/projects/${id}`);
        if (!response.ok) throw new Error("Failed to fetch project");
        const data = await response.json();
        setValues({
          title: data.title,
          description: data.description,
          image: data.image,
          link: data.link,
          github: data.github,
          message: ""
        });
      } catch (error) {
        console.error("Error fetching project:", error);
        setValues((prev) => ({ ...prev, message: "Failed to load project." }));
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/edit/${id}`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      const data = await response.json();
      setValues({ ...values, message: data.message });

      if (response.ok) {
        navigate("/admin"); 
      }
    } catch (error) {
      console.error("Error updating project:", error);
      setValues({ ...values, message: "Something went wrong!" });
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <input
          type="text"
          placeholder="Title"
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={values.image}
          onChange={(e) => setValues({ ...values, image: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Preview Link"
          value={values.link}
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="GitHub Link"
          value={values.github}
          onChange={(e) => setValues({ ...values, github: e.target.value })}
          required
        />

        <button type="submit" className="update-btn">Update Project</button>
        <p className="message">{values.message}</p>
      </form>
    </div>
  );
}
