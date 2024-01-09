/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import serverAddress from "../../server";
import "./Tab.css";
import "./ProjectTab.css";
function ProjectTab({ currentProject }) {
  const [project, setProject] = useState(currentProject);

  useEffect(() => {
    setProject(currentProject);
  }, [currentProject]);
  return (
    <div className="projectTab tab">
      <img
        className="project-logo"
        src={serverAddress + project.logo_path}
        alt="project logo"
      />
      <p className="project-name">{project.name || "Project name"}</p>
      <p className="project-description">
        {project.description || "Project description"}
      </p>
      <ul className="previews">
        {project.images_paths
          ? project.images_paths.map((image) => (
              <li key={`${image}_preview`} className="preview">
                <img src={serverAddress + image} alt="" />
              </li>
            ))
          : ""}
      </ul>
      <ul className="project-links">
        <li>
          Project: <a href={project.project_link}>{project.project_link}</a>
        </li>
        <li>
          Github:{" "}
          <a href={project.project_gh_link}>{project.project_gh_link}</a>
        </li>
        <li>
          Download:{" "}
          <a href={project.project_load_link}>{project.project_load_link}</a>
        </li>
      </ul>
    </div>
  );
}
export default ProjectTab;
