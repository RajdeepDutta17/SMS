import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCallFunction from "../utils/apiCallFun";
import { toast } from "react-toastify";
import { handleInputChange } from "../utils/helperFun";

const AddStudentForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    standard: "",
    age: "",
  });
  const addInfo = async () => {
    const { name, age, standard } = form;
    if (!name || !age || !standard) {
      return toast.warn("Input fields are empty!!!");
    }
    const payload = {
      name,
      age,
      standard,
    };

    const response = await apiCallFunction("POST", `students`, payload, null);

    if (response?.status) {
      toast.success(response?.msg);
      setForm({
        name: "",
        standard: "",
        age: "",
      });
    } else {
      toast.warn(response?.msg);
    }
    return navigate("/student");
  };
  return (
    <div className="container myForm">
      <div className="mb-3  m-auto">
        <label htmlFor="studentName" className="form-label">
          Student&apos;s Name
        </label>
        <input
          type="text"
          className="form-control"
          id="studentName"
          placeholder="Student's Name"
          name="name"
          value={form?.name}
          onChange={(e) => handleInputChange(e, form, setForm)}
        />
      </div>
      <div className="mb-3  m-auto">
        <label htmlFor="standard" className="form-label">
          Standard
        </label>
        <input
          type="text"
          className="form-control"
          id="standard"
          placeholder="Standard"
          name="standard"
          value={form?.standard}
          onChange={(e) => handleInputChange(e, form, setForm)}
        />
      </div>
      <div className="mb-3  m-auto">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          type="text"
          className="form-control"
          id="age"
          placeholder="Age"
          name="age"
          value={form?.age}
          onChange={(e) => handleInputChange(e, form, setForm)}
        />
      </div>
      <div className="mb-3  m-auto text-center mt-5">
        <button className="btn btn-primary fs-6" onClick={addInfo}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddStudentForm;
