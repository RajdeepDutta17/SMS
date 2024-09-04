import { useEffect, useState } from "react";
import apiCallFunction from "../utils/apiCallFun";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { handleInputChange } from "../utils/helperFun";
import { useNavigate } from "react-router-dom";

const EditStudentForm = () => {
  const id = useSelector((state) => state.id.value);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    standard: "",
    age: "",
  });

  const findStudentById = async () => {
    const res = await apiCallFunction("GET", "students/" + id, null, null);

    if (res?.status) {
      setForm(res.data);
    } else {
      toast.warn(res?.msg);
    }
  };

  const updateInfo = async () => {
    const { name, age, standard } = form;
    if (!name || !age || !standard) {
      return toast.warn("Input fields are empty!!!");
    }
    const payload = {
      name,
      age,
      standard,
    };

    const response = await apiCallFunction(
      "PATCH",
      `students/${id}`,
      payload,
      null
    );

    if (response?.status) {
      toast.success(response?.msg);
      setForm({
        studentId: "",
        name: "",
        standard: "",
        age: "",
      });
      return navigate("/student");
    } else {
      toast.warn(response?.msg);
    }
  };

  useEffect(() => {
    findStudentById();
  }, []);

  return (
    form && (
      <div className="container myForm">
        <div className="mb-3  m-auto">
          <label htmlFor="studentId" className="form-label">
            Student Id
          </label>
          <input
            type="text"
            className="form-control"
            id="studentId"
            placeholder="Student Id"
            name="studentId"
            value={form?.studentId}
            onChange={(e) => handleInputChange(e, form, setForm)}
            disabled
          />
        </div>
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
          <button className="btn btn-primary fs-6" onClick={updateInfo}>
            Update Info
          </button>
        </div>
      </div>
    )
  );
};

export default EditStudentForm;
