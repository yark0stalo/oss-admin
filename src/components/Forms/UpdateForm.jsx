/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import serverAddress from "../../server";
import "./Form.css";
function UpdateForm({ currentProject }) {
  const [name, setName] = useState(currentProject.name);
  const [description, setDescription] = useState(currentProject.description);
  const [logo, setLogo] = useState(currentProject.logo_path);
  const [projectImages, setImages] = useState(currentProject.images_paths);
  const [projectLink, setProjectLink] = useState(currentProject.project_link);
  const [githubLink, setGithubLink] = useState(currentProject.project_gh_link);
  const [downloadLink, setDownloadLink] = useState(
    currentProject.project_load_link
  );

  const createFormData = () => {
    const formData = new FormData();
    let hasChanges = false;
    formData.append("prevName", currentProject.name);
    if (name !== currentProject.name) {
      formData.append("name", name);
      hasChanges = true;
    }
    if (description !== currentProject.description) {
      formData.append("description", description);
      hasChanges = true;
    }
    if (typeof logo != "string") {
      formData.append("logo_path", logo);
      hasChanges = true;
    }
    if (typeof projectImages[0] != "string") {
      for (let i = 0; i < projectImages.length; i++) {
        formData.append("images_paths", projectImages[i]);
      }
      hasChanges = true;
    }
    if (projectLink != currentProject.project_link) {
      formData.append("project_link", projectLink);
      hasChanges = true;
    }
    if (githubLink != currentProject.project_gh_link) {
      formData.append("project_gh_link", githubLink);
      hasChanges = true;
    }
    if (downloadLink != currentProject.project_load_link) {
      formData.append("project_load_link", downloadLink);
      hasChanges = true;
    }
    if (hasChanges) {
      formData.forEach((value) => console.log(value));
      return formData;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    const formData = createFormData();
    if (formData) {
      fetch(serverAddress + "projects/" + currentProject.id, {
        method: "PUT",
        body: formData,
      })
        .then((response) => {
          return response.text();
        })
        .then((result) => {
          console.log(result);
          alert(result);
        });
    }
  };

  useEffect(() => {
    setName(currentProject.name);
    setDescription(currentProject.description);
    setLogo(currentProject.logo_path);
    setImages(currentProject.images_paths);
    setProjectLink(currentProject.project_link);
    setGithubLink(currentProject.project_gh_link);
    setDownloadLink(currentProject.project_load_link);
  }, [currentProject]);
  return (
    <form
      className="project-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      encType="multipart/form-data"
    >
      <label>
        Project name:
        <input
          type="text"
          id="project-name"
          value={name}
          onChange={(e) => {
            console.log(e.target.value);
            setName(e.target.value);
          }}
          required
        />
      </label>
      <br />
      <label>Project description:</label>
      <br />
      <textarea
        cols="30"
        rows="10"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        required
      ></textarea>
      <br />
      <label htmlFor="project-logo">
        Current logo:
        <img
          src={serverAddress + currentProject.logo_path}
          alt="project logo"
          className="logo"
        />
        {" => "}
      </label>
      <input
        type="file"
        name="logo"
        id="project-logo"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setLogo(e.target.files[0]);
        }}
        accept="image/*"
      />
      <br />
      <label htmlFor="project-images">
        Current images:
        <ul className="previews">
          {currentProject.images_paths
            ? currentProject.images_paths.map((image) => (
                <li key={`${image}_preview`} className="preview">
                  <img src={serverAddress + image} alt="" />
                </li>
              ))
            : ""}
        </ul>
        {"new images:"}
      </label>
      <input
        type="file"
        name="project-images"
        id="project-images"
        multiple="multiple"
        onChange={(e) => {
          console.log(e.target.files);
          setImages(e.target.files);
        }}
        accept="image/*"
      />
      <br />
      <br />
      <label htmlFor="project-link">Project link: </label>
      <input
        type="url"
        name="project-link"
        id="project-link"
        value={projectLink}
        onChange={(e) => {
          setProjectLink(e.target.value);
        }}
      />
      <br />
      <label htmlFor="github-link">Github link: </label>
      <input
        type="url"
        name="github-link"
        id="github-link"
        value={githubLink}
        onChange={(e) => {
          setGithubLink(e.target.value);
        }}
      />
      <br />
      <label htmlFor="download-link">Download link: </label>
      <input
        type="url"
        name="download-link"
        id="download-link"
        value={downloadLink}
        onChange={(e) => {
          setDownloadLink(e.target.value);
        }}
      />
      <br />
      <br />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
}

export default UpdateForm;
