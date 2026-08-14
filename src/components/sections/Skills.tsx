function Skills() {
  const technologies = [
    "React",
    "TypeScript",
    "JavaScript",
    "Angular",
    "Node.js",
    "Express",
    "MongoDB",
    "MySQL",
    "SwiftUI",
    "Swift",
    "Git",
    "Three.js",
  ];

  return (
    <section id="skills" className="portfolio-section skills-section">
      <div className="section-inner">
        <p className="section-label">03 / TECHNOLOGIES</p>

        <h2 className="section-title">
          Tools I use
          <br />
          to build.
        </h2>

        <div className="skills-grid">
          {technologies.map((technology) => (
            <span key={technology} className="skill-item">
              {technology}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;