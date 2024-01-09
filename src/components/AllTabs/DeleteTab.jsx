/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Tab.css";
import "./DeleteTab.css";

function DeleteTab({ id }) {
  const [isShowDialog, setIsShowDialog] = useState("hidden");

  const onQuestionButtonClick = () => {
    setIsShowDialog("active");
  };

  const onAproveButtonClick = () => {
    fetch(`http://localhost:3001/projects/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => console.log(data));
  };
  const onRestrictButtonClick = () => {
    setIsShowDialog("hidden");
  };

  return (
    <div className="deleteTab tab">
      <button className="question-delete" onClick={onQuestionButtonClick}>
        Delete current project
      </button>
      <br />
      <br />
      <div className={isShowDialog}>
        <button className="aprove-delete" onClick={onAproveButtonClick}>
          YES!
        </button>
        <button className="restrict-delete" onClick={onRestrictButtonClick}>
          NO
        </button>
      </div>
    </div>
  );
}
export default DeleteTab;
