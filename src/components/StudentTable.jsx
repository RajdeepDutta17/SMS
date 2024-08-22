import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import apiCallFunction from "../utils/apiCallFun";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assignId } from "../redux/slices/idSlice";

const StudentTable = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getStudentData = async () => {
    const res = await apiCallFunction("GET", "students", null, null);

    if (res?.status) {
      setData(res.data);
    } else {
      toast.warn(res.msg);
    }
  };
  const editStudent = async (value) => {
    dispatch(assignId(value._id));
    navigate("/student/edit");
  };
  const deleteStudent = async (value) => {
    const res = await apiCallFunction(
      "DELETE",
      "students/" + value._id,
      null,
      null
    );
    if (res?.status) {
      toast.success(res.msg);
    } else {
      toast.warn(res.msg);
    }

    getStudentData();
  };
  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <table className="table table-warning table-striped-columns table-hover text-center">
      <thead>
        <tr>
          <th scope="col">Student Id</th>
          <th scope="col">Name</th>
          <th scope="col">Standard</th>
          <th scope="col">Age</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, i) => (
          <Fragment key={i}>
            <tr>
              <th data-cell="Student Id" scope="row">
                {item?.studentId}
              </th>
              <td data-cell="Name">{item?.name}</td>
              <td data-cell="Standard">{item?.standard}</td>
              <td data-cell="Age">{item?.age}</td>

              <td data-cell="Action">
                <div>
                  <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={() => editStudent(item)}
                  >
                    <i className="ri-pencil-line"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => deleteStudent(item)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
