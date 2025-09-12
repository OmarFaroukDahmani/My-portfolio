import React from "react";
import { SiUpwork, SiGithub, SiLinkedin } from "react-icons/si";
import { MdEmail, MdPhone } from "react-icons/md";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-icons">
        <a
          href="https://www.linkedin.com/in/omar-farouk-dahmani/"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin"
        >
          <SiLinkedin />
        </a>
        <a
          href="https://www.upwork.com/freelancers/~omarfaroukdahmani"
          target="_blank"
          rel="noopener noreferrer"
          className="upwork"
        >
          <SiUpwork />
        </a>
        <a
          href="https://github.com/OmarFaroukDahmani"
          target="_blank"
          rel="noopener noreferrer"
          className="github"
        >
          <SiGithub />
        </a>
        <a href="mailto:omar.farouk.dahmani.contact@gmail.com" className="email">
          <MdEmail />
        </a>
        <a href="tel:+21693992373" className="phone">
          <MdPhone />
        </a>
      </div>
      <p className="footer-text">© {new Date().getFullYear()} Omar Farouk Dahmani</p>
    </footer>
  );
}
