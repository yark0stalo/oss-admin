import { useState } from "react";

function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    if (e.target.type === "number") {
      e.target.value = parseInt(e.target.value);
    }
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  return { values, updateValue };
}

export default useForm;
