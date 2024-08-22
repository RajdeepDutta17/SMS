import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Marks from "./pages/Marks";
import EditStudent from "./pages/EditStudent";
import EditTeacher from "./pages/EditTeacher";
import AddStudent from "./pages/AddStudent";
import AddTeacher from "./pages/AddTeacher";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student/edit" element={<EditStudent />} />
        <Route path="/student/add" element={<AddStudent />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teacher/edit" element={<EditTeacher />} />
        <Route path="/teacher/add" element={<AddTeacher />} />
        <Route path="/marks" element={<Marks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
