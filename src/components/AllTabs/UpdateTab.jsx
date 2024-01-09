/* eslint-disable react/prop-types */
import UpdateForm from "../Forms/UpdateForm";
import "./Tab.css";
function UpdateTab({ currentProject }) {
  return (
    <div className="updateTab tab">
      <UpdateForm currentProject={currentProject} />
    </div>
  );
}
export default UpdateTab;
