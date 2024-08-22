import AddStudentForm from "../components/AddStudentForm";

const AddStudent = () => {
  return (
    <div className="container">
      <h1 className="my-5 text-center myLetterSpacing">
        Student Information Form
      </h1>
      <AddStudentForm />
    </div>
  );
};

export default AddStudent;
