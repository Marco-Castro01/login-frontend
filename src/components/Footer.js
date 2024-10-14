import React from "react";
import "./Footer.css";

const Footer = () => {
  const socialProfiles = {
    github: "https://github.com/Marco-Castro01",
    facebook:
      "https://www.facebook.com/profile.php?id=61560481000769",
    linkedin: "https://www.linkedin.com/in/marco-castro01/",
    twitter: "https://twitter.com",
    instagram: "https://www.instagram.com/marco_castro.o/"
  };

  return (
    <footer>
      <div className="social-icons">
        {Object.entries(socialProfiles).map(([platform, link]) => (
          <a
            key={platform}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {platform === "github" && (
              <img src="/github.png" alt="GitHub logo" />
            )}
            {platform === "facebook" && (
              <img src="/facebook.png" alt="Facebook logo" />
            )}
            {platform === "linkedin" && (
              <img src="/linkd.png" alt="LinkedIn logo" />
            )}
            {platform === "twitter" && (
              <img src="/twitter.png" alt="Twitter logo" />
            )}
            {platform === "instagram" && (
              <img src="/imsta.png" alt="Instagram logo" />
            )}

          </a>
        ))}
      </div>
      <p>&copy; 2024 Your Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
