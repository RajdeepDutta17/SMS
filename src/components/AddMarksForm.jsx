import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiCallFunction from "../utils/apiCallFun";
import { toast } from "react-toastify";
import { handleInputChange } from "../utils/helperFun";

const AddMarksForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    studentId: "",
    teacherId: "",
    subject: "",
    marks: "",
  });
  const addMarks = async () => {
    const { studentId, teacherId, subject, marks } = form;
    if (!studentId || !teacherId || !subject || !marks) {
      return toast.warn("Input fields are empty!!!");
    }
    const payload = {
      studentId,
      teacherId,
      subject,
      marks,
    };

    const response = await apiCallFunction("POST", `marks`, payload, null);

    if (response?.status) {
      toast.success(response?.msg);
      setForm({
        studentId: "",
        teacherId: "",
        subject: "",
        marks: "",
      });
      return navigate("/marks");
    } else {
      toast.warn(response?.msg);
    }
  };
  return (
    <div className="container myForm">
      <div className="mb-3  m-auto">
        <label htmlFor="studentId" className="form-label">
          Student&apos;s Id
        </label>
        <input
          type="text"
          className="form-control"
          id="studentId"
          placeholder="Student's Id"
          name="studentId"
          value={form?.studentId}
          onChange={(e) => handleInputChange(e, form, setForm)}
        />
      </div>
      <div className="mb-3  m-auto">
        <label htmlFor="teacherId" className="form-label">
          Teacher&apos;s Id
        </label>
        <input
          type="text"
          className="form-control"
          id="teacherId"
          placeholder="Teacher's Id"
          name="teacherId"
          value={form?.teacherId}
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
        <label htmlFor="marks" className="form-label">
          Marks
        </label>
        <input
          type="text"
          className="form-control"
          id="marks"
          placeholder="Marks"
          name="marks"
          value={form?.marks}
          onChange={(e) => handleInputChange(e, form, setForm)}
        />
      </div>
      <div className="mb-3  m-auto text-center mt-5">
        <button className="btn btn-primary fs-6" onClick={addMarks}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddMarksForm;
