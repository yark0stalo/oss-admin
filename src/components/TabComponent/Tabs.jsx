import { useState, useEffect } from "react";
import CreateTab from "../AllTabs/CreateTab";
import DeleteTab from "../AllTabs/DeleteTab";
import UpdateTab from "../AllTabs/UpdateTab";
import TabNavItem from "../AllTabs/TabNavItem";
import TabContent from "../AllTabs/TabContent";
import "./Tabs.css";
import ProjectTab from "../AllTabs/ProjectTab";
function Tabs() {
  const [activeTab, setActiveTab] = useState("project");
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const handleProjectChange = (event) => {
    const h = projects.find((project) => project.name == event.target.value);
    setCurrentProject(h);
    console.log(h);
  };

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setCurrentProject(data[0]);
          setProjects(data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="tabs">
      {currentProject ? (
        <select value={currentProject.name} onChange={handleProjectChange}>
          {projects.map((project) => (
            <option key={project.id} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
      ) : null}
      {/* Tab nav */}
      <ul className="nav">
        <TabNavItem
          title="Project"
          id="project"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Create"
          id="create"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Update"
          id="update"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          title="Delete"
          id="delete"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>
      <div className="outlet">
        <TabContent id="project" activeTab={activeTab}>
          {currentProject ? <ProjectTab currentProject={currentProject} /> : ""}
        </TabContent>
        <TabContent id="create" activeTab={activeTab}>
          <CreateTab />
        </TabContent>
        <TabContent id="update" activeTab={activeTab}>
          <UpdateTab currentProject={currentProject} />
        </TabContent>
        <TabContent id="delete" activeTab={activeTab}>
          {currentProject ? <DeleteTab id={currentProject.id} /> : ""}
        </TabContent>
      </div>
    </div>
  );
}
export default Tabs;
