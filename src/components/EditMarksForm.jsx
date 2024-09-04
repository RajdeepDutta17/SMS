import { useEffect, useState } from "react";
import apiCallFunction from "../utils/apiCallFun";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { handleInputChange } from "../utils/helperFun";
import { useNavigate } from "react-router-dom";

const EditMarksForm = () => {
  const id = useSelector((state) => state.id.value);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    teacherName: "",
    studentName: "",
    subject: "",
    marks: "",
  });

  const findMarksById = async () => {
    const res = await apiCallFunction("GET", "marks/" + id, null, null);

    if (res?.status) {
      setForm(res?.data);
    } else {
      toast.warn(res?.msg);
    }
  };
  console.log(form);

  const updateMarks = async () => {
    const { marks } = form;
    if (!marks) {
      return toast.warn("Input fields are empty!!!");
    }
    const payload = {
      marks,
    };

    const response = await apiCallFunction(
      "PATCH",
      `marks/${id}`,
      payload,
      null
    );

    if (response?.status) {
      toast.success(response?.msg);
      setForm({
        teacherName: "",
        studentName: "",
        subject: "",
        marks: "",
      });
      return navigate("/marks");
    } else {
      toast.warn(response?.msg);
    }
  };

  useEffect(() => {
    findMarksById();
  }, []);

  return (
    form && (
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
            name="studentName"
            value={form?.studentName}
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
            name="teacherName"
            value={form?.teacherName}
            onChange={(e) => handleInputChange(e, form, setForm)}
            disabled
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
            disabled
          />
        </div>
        <div className="mb-3 m-auto">
          <label htmlFor="marks" className="form-label">
            Marks
          </label>
          <input
            type="text"
            className="form-control"
            id="marks"
            placeholder="marks"
            name="marks"
            value={form?.marks}
            onChange={(e) => handleInputChange(e, form, setForm)}
          />
        </div>
        <div className="mb-3  m-auto text-center mt-5">
          <button className="btn btn-primary fs-6" onClick={updateMarks}>
            Update Marks
          </button>
        </div>
      </div>
    )
  );
};

export default EditMarksForm;
