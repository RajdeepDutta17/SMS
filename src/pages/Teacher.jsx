import { useNavigate } from "react-router-dom";
import TeacherTable from "../components/TeacherTable";

const Teacher = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/teacher/add");
  };
  return (
    <div className="container">
      <h1 className="my-4 text-center myLetterSpacing">Teacher Table</h1>
      <div className="my-3">
        <button className="btn btn-primary" onClick={handleClick}>
          Add New Teacher
        </button>
      </div>
      <TeacherTable />
    </div>
  );
};

export default Teacher;
