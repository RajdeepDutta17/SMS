import { useNavigate } from "react-router-dom";
import StudentTable from "../components/StudentTable";

const Student = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/student/add");
  };
  return (
    <div className="container">
      <h1 className="my-4 text-center myLetterSpacing">Student Table</h1>
      <div className="my-3">
        <button className="btn btn-primary" onClick={handleClick}>
          Add New Student
        </button>
      </div>
      <StudentTable />
    </div>
  );
};

export default Student;
