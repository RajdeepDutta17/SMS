import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCallFunction from "../utils/apiCallFun";
import { toast } from "react-toastify";
import { handleInputChange } from "../utils/helperFun";

const AddTeacherForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    subject: "",
    department: "",
  });
  const addInfo = async () => {
    const { name, subject, department } = form;
    if (!name || !department || !subject) {
      return toast.warn("Input fields are empty!!!");
    }
    const payload = {
      name,
      subject,
      department,
    };

    const response = await apiCallFunction("POST", `teachers`, payload, null);

    if (response?.status) {
      toast.success(response?.msg);
      setForm({
        name: "",
        subject: "",
        department: "",
      });
    } else {
      toast.warn(response?.msg);
    }
    return navigate("/teacher");
  };
  return (
    <div className="container myForm">
      <div className="mb-3  m-auto">
        <label htmlFor="teacherName" className="form-label">
          Teacher&apos;s Name
        </label>
        <input
          type="text"
          className="form-control"
          id="teacherName"
          placeholder="Teacher's Name"
          name="name"
          value={form?.name}
          onChange={(e) => handleInputChange(e, form, setForm)}
        />
      </div>
      <div className="mb-3 m-auto">
        <label htmlFor="subject" className="form-label">
          Subject
        </label>
        <input
          type="text"
          className="form-control"
          id="subject"
          placeholder="Subject"
          name="subject"
          value={form?.subject}
          onChange={(e) => handleInputChange(e, form, setForm)}
        />
      </div>
      <div className="mb-3 m-auto">
        <label htmlFor="department" className="form-label">
          Department
        </label>
        <input
          type="text"
          className="form-control"
          id="department"
          placeholder="Department"
          name="department"
          value={form?.department}
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

export default AddTeacherForm;
