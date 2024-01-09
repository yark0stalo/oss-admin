/* eslint-disable react/prop-types */
import { useState } from "react";
import serverAddress from "../../server";
import "./Form.css";
function CreateForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [projectImages, setImages] = useState([]);
  const [projectLink, setProjectLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const onSubmitClick = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("logo", logo);

    for (let i = 0; i < projectImages.length; i++) {
      formData.append("images", projectImages[i]);
    }
    formData.append("projectLink", projectLink);
    formData.append("githubLink", githubLink);
    formData.append("downloadLink", downloadLink);

    fetch(serverAddress + "projects", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        console.log(result);
        alert(result);
      });
  };

  return (
    <form
      className="project-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitClick();
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
      <label htmlFor="project-logo">Project logo:</label>
      <input
        type="file"
        name="logo"
        id="project-logo"
        onChange={(e) => {
          if (e.target.files[0]) {
            setLogo(e.target.files[0]);
          }
        }}
        accept="image/*"
        required
      />
      <br />
      <label htmlFor="project-images">Project images:</label>
      <input
        type="file"
        name="images"
        id="project-images"
        multiple="multiple"
        onChange={(e) => {
          setImages(e.target.files);
        }}
        accept="image/*"
        required
      />
      <br />
      <label htmlFor="project-link">Project link: </label>
      <input
        type="url"
        name="project-link"
        id="project-link"
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

export default CreateForm;
