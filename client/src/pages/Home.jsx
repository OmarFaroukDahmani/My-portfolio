import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  FaUserAlt,
  FaLaptopCode,
  FaProjectDiagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaGithub,
  FaFileDownload,
  FaPaperPlane,
} from "react-icons/fa";

import "../styles/home.css";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([])

    useEffect(() => {
    const getSkills = async () => {
        try {
        const response = await fetch("http://localhost:8080/skills", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch skills");

        const data = await response.json();
        setSkills(data);
        } catch (error) {
        console.error("Error fetching skills:", error);
        }
    };

    getSkills();
    }, []);


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

  return (
    <>
      <Navbar />
      <header className="header">
        <div className="intro">
          <h1>Hi, I am <span>Omar Farouk</span> Dahmani</h1>
          <p>
            Dedicated Software Engineering student and a proficient Frontend
            Developer, consistently eager to learn and enhance my coding skills
          </p>
          <button className="btn">View My Work</button>
        </div>
        <div className="profile-photo">
          <img src="/myphoto.jpg" alt="my-photo" />
        </div>
      </header>

      <main>
        {/* About Section */}
        <section id="about" className="about">
          <h1>
            About <span>Me</span>
          </h1>
          <div className="skills-container">
            <div className="skill-card">
              <FaLaptopCode className="icon" />
              <h2>Web Development</h2>
              <p>
                Creating responsive websites and web applications with modern
                frameworks.
              </p>
            </div>
            <div className="skill-card">
              <FaUserAlt className="icon" />
              <h2>UI/UX Design</h2>
              <p>
                Designing intuitive user interfaces and seamless user
                experiences.
              </p>
            </div>
            <div className="skill-card">
              <FaProjectDiagram className="icon" />
              <h2>Project Management</h2>
              <p>
                Leading projects from conception to completion with agile
                methodologies.
              </p>
            </div>
          </div>

          <div className="about-text">
            <h2>Passionate Web Developer & Tech Creator</h2>
            <p>
              I specialize in creating responsive, accessible, and performant
              web applications using modern technologies. <br /> I'm passionate
              about creating elegant solutions to complex problems, and I'm
              constantly learning new technologies and techniques to stay at the
              forefront of the ever-evolving web landscape.
            </p>
            <div className="about-buttons">
              <button className="btn">Get In Touch</button>
              <button className="btn">
                <FaFileDownload /> Download Cv
              </button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects">
          <div className="section-intro">
            <h1>
              <span>Featured</span> Projects
            </h1>
            <p>
              Here are some of my recent projects. Each project was carefully
              crafted with attention to detail, performance, and user
              experience.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <img src={project.image} alt="project_image" />
                <ul className="skills-list">
                  {project.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="project-links">
                  <Link to={project.link} target="_blank" rel="noopener noreferrer">
                    <button className="btn">
                      <FaExternalLinkAlt />
                    </button>
                  </Link>
                  <Link to={project.github} target="_blank" rel="noopener noreferrer">
                    <button className="btn">
                      <FaGithub />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills">
        <h1>My <span>Skills</span></h1>
        <div className="skills-list">
            {skills.map((skill) => (
            <div key={skill.id} className="skill-card">
                <h2>{skill.name}</h2>
            </div>
            ))}
        </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <h1>
            <span>Get</span> In Touch
          </h1>
          <p>
            Have a project in mind or want to collaborate? Feel free to reach
            out. I'm always open to discussing new opportunities.
          </p>
          <div className="contact-container">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div>
                <div className="contact-item">
                  <FaEnvelope className="icon" />
                  <h3>omar.farouk.dahmani.contact@gmail.com</h3>
                </div>
                <div className="contact-item">
                  <FaPhone className="icon" />
                  <h3>+216 93 992 373</h3>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt className="icon" />
                  <h3>Gafsa, Tunisia</h3>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <h2>Send a Message</h2>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  placeholder="Your Name.."
                  name="name"
                  required
                />
                <label htmlFor="email">Your Email</label>
                <input type="email" placeholder="Your Email.." required />
                <label htmlFor="message">Your Message</label>
                <textarea
                  placeholder="Hello, I'd like to talk about.."
                  name="message"
                  required
                />
                <button type="submit" className="btn">
                  <FaPaperPlane /> Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
