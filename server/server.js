const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));


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

    // Convert skills from comma-separated string → array
    const projects = results.map(project => ({
      ...project,
      skills: project.skills ? project.skills.split(",") : []
    }));

    res.json(projects);
  });
});


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


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
