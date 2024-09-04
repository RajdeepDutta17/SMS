import { useEffect, useState } from "react";
import apiCallFunction from "../utils/apiCallFun";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { handleInputChange } from "../utils/helperFun";
import { useNavigate } from "react-router-dom";

const EditTeacherForm = () => {
  const id = useSelector((state) => state.id.value);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    teacherId: "",
    name: "",
    subject: "",
    department: "",
  });

  const findTeacherById = async () => {
    const res = await apiCallFunction("GET", "teachers/" + id, null, null);

    if (res?.status) {
      setForm(res.data);
    } else {
      toast.warn(res?.msg);
    }
  };

  const updateInfo = async () => {
    const { name, subject, department } = form;
    if (!name || !subject || !department) {
      return toast.warn("Input fields are empty!!!");
    }
    const payload = {
      name,
      subject,
      department,
    };

    const response = await apiCallFunction(
      "PATCH",
      `teachers/${id}`,
      payload,
      null
    );

    if (response?.status) {
      toast.success(response?.msg);
      setForm({
        teacherId: "",
        name: "",
        subject: "",
        department: "",
      });
      return navigate("/teacher");
    } else {
      toast.warn(response?.msg);
    }
  };

  useEffect(() => {
    findTeacherById();
  }, []);

  return (
    form && (
      <div className="container myForm">
        <div className="mb-3  m-auto">
          <label htmlFor="teacherId" className="form-label">
            Teacher Id
          </label>
          <input
            type="text"
            className="form-control"
            id="teacherId"
            placeholder="Teacher Id"
            name="teacherId"
            value={form?.teacherId}
            onChange={(e) => handleInputChange(e, form, setForm)}
            disabled
          />
        </div>
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
        <div className="mb-3  m-auto">
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
        <div className="mb-3  m-auto">
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
          <button className="btn btn-primary fs-6" onClick={updateInfo}>
            Update Info
          </button>
        </div>
      </div>
    )
  );
};

export default EditTeacherForm;
