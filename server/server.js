const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));


// show a project

app.get('/projects', (req, res) => {
  const sql = `
    SELECT 
      p.id, 
      p.title, 
      p.description, 
      p.image, 
      p.link, 
      p.github,
      GROUP_CONCAT(s.name) AS skills
    FROM projects p
    LEFT JOIN project_skills ps ON p.id = ps.project_id
    LEFT JOIN skills s ON ps.skill_id = s.id
    GROUP BY p.id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching projects:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const projects = results.map(project => ({
      ...project,
      skills: project.skills ? project.skills.split(",") : []
    }));

    res.json(projects);
  });
});

// show skills

app.get('/skills', (req, res) => {
  const sql = 'SELECT * FROM skills';

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching skills:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// login

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admins WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (results.length === 0) return res.status(401).json({ error: "Invalid username or password" });

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid username or password" });

    res.status(200).json({ message: "Login successful", user });
  });
});

// add project 

app.post('/add_project', (req, res) => {
  const { title, description, image, link, github } = req.body;

  const sql = 'INSERT INTO projects (title, description, image, link, github) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [title, description, image, link, github], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Project created successfully" });
  });
});

// edit project

app.put('/edit/:id', (req, res) => {
  const Id = req.params.id;
  const { title, description, image, link, github } = req.body;
  const sql = "UPDATE projects SET title=?, description=?, image=?, link=?, github=? WHERE id=? ";
  db.query(sql, [title, description, image, link, github, Id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Project updated successfully!" });
  });
});

// show non detailted project

app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM projects WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "Project not found" });

    res.json(results[0]);
  });
});

// delete project

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM projects WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  });
});

// Add skill
app.post("/add_skill", (req, res) => {
  const { name } = req.body;

  const sql = "INSERT INTO skills (name) VALUES (?)";

  db.query(sql, [name], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Skill added successfully" });
  });
});


// Delete skill
app.delete('/delete_skill/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM skills WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.status(200).json({ message: "Skill deleted successfully" });
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
