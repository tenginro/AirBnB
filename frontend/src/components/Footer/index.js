import "./Footer.css";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footerContainer">
        <div className="copyrightLine">
          Copyright © 2023 HereBnB Inc. HereBnB, HereBnB logo and related marks
          are registered trademarks of HereBnB.
        </div>
        <div className="footerLinks">
          <div style={{ cursor: "pointer" }}>
            <a
              href="https://github.com/tenginro"
              target="_blank"
              rel="noreferrer noopener"
            >
              <i className="fa-brands fa-github"></i> GitHub
            </a>
          </div>
          <div style={{ cursor: "pointer" }}>
            <a
              href="https://www.linkedin.com/in/luotengzhong/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <i className="fa-brands fa-linkedin"></i> LinkedIn
            </a>
          </div>
          <div style={{ cursor: "pointer" }}>
            <a
              href="http://tenginro.me/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <i className="fa-regular fa-user"></i> Portfolio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
